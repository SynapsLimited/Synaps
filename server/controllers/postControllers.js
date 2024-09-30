const Post = require('../models/postModel')
const User = require("../models/userModel")
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')
const fetch = require('node-fetch');
const FormData = require('form-data');

// Function to upload the file to Vercel Blob Storage
const uploadToVercelBlob = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://blob.vercel-storage.com/api/v1/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_BLOB_TOKEN}`,  // Set your token in env
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload to Vercel Blob Storage');
  }

  const result = await response.json();
  return result.url;  // Returns the URL of the uploaded image
};


const deleteFromVercelBlob = async (fileUrl) => {
    const fileName = path.basename(fileUrl);  // Extract the filename from the URL

    const response = await fetch(`https://blob.vercel-storage.com/api/v1/files/${fileName}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_BLOB_TOKEN}`,  // Use your Vercel Blob token
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete from Vercel Blob Storage');
    }

    return true;
};


// ======================== Create a post
// POST : api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;

        if (!title || !category || !description || !req.files || !req.files.thumbnail) {
            return next(new HttpError("Fill in all fields and choose thumbnail.", 422));
        }

        const { thumbnail } = req.files;

        // Check the file size
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2MB", 422));
        }

        // Upload the thumbnail to Vercel Blob Storage
        const thumbnailUrl = await uploadToVercelBlob(thumbnail);

        // Create the post with the uploaded thumbnail URL
        const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: thumbnailUrl,  // Save the Vercel Blob URL in the DB
            creator: req.user.id,
        });

        // Update user post count
        const currentUser = await User.findById(req.user.id);
        currentUser.posts += 1;
        await currentUser.save();

        res.status(201).json(newPost);
    } catch (error) {
        return next(new HttpError(error.message || 'Something went wrong', 500));
    }
};




// ======================== Get all posts
// GET : api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// ======================== Get single post
// GET : api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) {
            return next(new HttpError("Post not found.", 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError("Post does not exist", 404))
    }
}



// ======================== Get posts by Category
// GET : api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const {category} = req.params;
        const catPosts = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// ======================== Get author post
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError("User does not exist", 404))
    }
}


// ======================== Edit post
// PATCH : api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { title, category, description } = req.body;

        if (!title || !category || description.length < 12) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        // Get old post from database
        const oldPost = await Post.findById(postId);
        if (!oldPost) {
            return next(new HttpError("Post not found.", 404));
        }

        let updatedPost;
        if (!req.files || !req.files.thumbnail) {
            // Update post without changing the thumbnail
            updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
        } else {
            // Check file size of the new thumbnail
            const { thumbnail } = req.files;
            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big. Should be less than 2MB"));
            }

            // Upload new thumbnail to Vercel Blob
            const newThumbnailUrl = await uploadToVercelBlob(thumbnail);

            // Update the post with the new thumbnail
            updatedPost = await Post.findByIdAndUpdate(postId, {
                title,
                category,
                description,
                thumbnail: newThumbnailUrl
            }, { new: true });
        }

        if (!updatedPost) {
            return next(new HttpError("Couldn't update post", 400));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HttpError(error));
    }
};


// ======================== Delete post
// DELETE : api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError("Post unavailable.", 400));
        }

        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("Post not found.", 404));
        }

        // Delete the thumbnail from Vercel Blob storage
        const thumbnailUrl = post.thumbnail;
        await deleteFromVercelBlob(thumbnailUrl);

        // Delete the post from the database
        await Post.findByIdAndDelete(postId);

        // Update user post count
        const currentUser = await User.findById(req.user.id);
        currentUser.posts -= 1;
        await currentUser.save();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return next(new HttpError("Couldn't delete post.", 400));
    }
};


module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost }