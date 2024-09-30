const Post = require('../models/postModel')
const User = require("../models/userModel")
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')
const fetch = require('node-fetch');
const FormData = require('form-data');

const uploadToVercelBlob = async (fileBuffer, fileName) => {
    try {
        const { url } = await put(fileName, fileBuffer, {
            access: 'public', // Make sure the file is publicly accessible
            token: process.env.BLOB_READ_WRITE_TOKEN, // Blob storage token (must be set in your env)
            headers: {
                Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}` // Vercel API token for authorization
            }
        });
        console.log("Uploaded successfully to Vercel Blob: ", url); // Log URL
        return url; // Return the uploaded file URL
    } catch (error) {
        console.error("Error uploading file to Vercel Blob:", error);
        throw new Error("Failed to upload file to Vercel Blob");
    }
};


const deleteFromVercelBlob = async (fileUrl) => {
    if (!fileUrl || !fileUrl.includes('vercel-storage.com')) {
        console.log("No valid Vercel Blob URL found, skipping deletion.");
        return false;
    }

    const fileName = path.basename(fileUrl);  // Extract the filename from the URL

    try {
        const response = await fetch(`https://api.vercel.com/v6/blob/files/${fileName}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,  // Use your Vercel Blob API token
            },
        });

        if (response.status === 404) {
            console.log("File not found on Vercel Blob, skipping deletion.");
            return false;
        }

        if (!response.ok) {
            throw new Error('Failed to delete from Vercel Blob Storage');
        }

        console.log("Deleted successfully from Vercel Blob:", fileName);
        return true;
    } catch (error) {
        console.error("Error deleting file from Vercel Blob:", error);
        return false;
    }
};



// ======================== Create a post
// POST : api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;

        if (!title || !category || !description || !req.file) {
            return next(new HttpError("Fill in all fields and choose thumbnail.", 422));
        }

        const { file: thumbnail } = req;

        // Check file size and upload to Vercel Blob
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2MB", 422));
        }

        // Upload the thumbnail to Vercel Blob Storage
        const thumbnailUrl = await uploadToVercelBlob(thumbnail.buffer, `thumbnails/${Date.now()}_${thumbnail.originalname}`);

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
        if (!req.file) {
            // Update post without changing the thumbnail
            updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
        } else {
            const { file: newThumbnail } = req;

            // Check file size and upload to Vercel Blob
            if (newThumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big. Should be less than 2MB"));
            }

            // Delete the old thumbnail from Vercel Blob if it exists and is valid
            if (oldPost.thumbnail) {
                const deleted = await deleteFromVercelBlob(oldPost.thumbnail); // Delete old thumbnail
                if (!deleted) {
                    console.log("No valid thumbnail to delete, or deletion was skipped.");
                }
            }

            // Upload the new thumbnail to Vercel Blob
            const newThumbnailUrl = await uploadToVercelBlob(newThumbnail.buffer, `thumbnails/${Date.now()}_${newThumbnail.originalname}`);

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

        // Attempt to delete the thumbnail from Vercel Blob storage
        if (post.thumbnail) {
            const deleted = await deleteFromVercelBlob(post.thumbnail); // Use the thumbnail URL from DB
            if (!deleted) {
                console.log("No valid thumbnail to delete, or deletion was skipped.");
            }
        }

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