// server/controllers/postController.js

const Post = require('../models/postModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');
const fetch = 'node-fetch'; // Use fetch to upload to Vercel Blob
const FormData = require('form-data');


// Upload to Vercel Blob function
const uploadToVercelBlob = async (fileBuffer, fileName) => {
  const formData = new FormData();
  formData.append('file', fileBuffer, fileName);

  const response = await fetch('https://blob.vercel-storage.com/api/v1/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_BLOB_TOKEN}`, // Vercel Blob API token
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload thumbnail to Vercel Blob');
  }
  const result = await response.json();
  return result.url; // Return the URL of the uploaded image
};

// ======================== Create a Post
// POST : /api/posts
// PROTECTED
const createPost = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description || !req.file) {
      return next(new HttpError('Fill in all fields and choose a thumbnail.', 422));
    }

    const thumbnailBuffer = req.file.buffer;
    const thumbnailName = req.file.originalname.split('.')[0].replace(/\s+/g, '%20'); // Replace spaces with underscores

    // Upload thumbnail to Vercel Blob
    const thumbnailUrl = await uploadToVercelBlob(thumbnailBuffer, thumbnailName);

    // Create the new post with the Vercel Blob URL
    const newPost = await Post.create({
      title,
      category,
      description,
      thumbnail: thumbnailUrl, // Save the Vercel Blob URL
      creator: req.user.id,
    });

    if (!newPost) {
      return next(new HttpError("Post couldn't be created.", 422));
    }

    // Update user post count
    const currentUser = await User.findById(req.user.id);
    currentUser.posts += 1;
    await currentUser.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Create Post Error:', error);
    return next(new HttpError(error.message || 'Something went wrong.', 500));
  }
};

// ======================== Get All Posts
// GET : /api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ updatedAt: -1 })
      .populate('creator', 'name email avatar'); // Populate creator details
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error.message || "Failed to fetch posts.", 500));
  }
};

// ======================== Get Single Post
// GET : /api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('creator', 'name email avatar');

    if (!post) {
      return next(new HttpError("Post not found.", 404));
    }

    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError("Post does not exist", 404));
  }
};

// ======================== Get Posts by Category
// GET : /api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate('creator', 'name email avatar');
    res.status(200).json(catPosts);
  } catch (error) {
    return next(new HttpError(error.message || "Failed to fetch posts by category.", 500));
  }
};

// ======================== Get User's Posts
// GET : /api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id })
      .sort({ createdAt: -1 })
      .populate('creator', 'name email avatar');
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError("User does not exist", 404));
  }
};

// ======================== Edit a Post
// PATCH : /api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, category, description } = req.body;

    if (!title || !category || description.length < 12) {
      return next(new HttpError('Fill in all fields.', 422));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError('Post not found.', 404));
    }

    // Log the user and post creator for debugging
    console.log('Post Creator:', post.creator.toString());
    console.log('Current User:', req.user.id);

    // Ensure the user is the creator of the post
    if (post.creator.toString() !== req.user.id) {
      return next(new HttpError('You are not authorized to edit this post.', 403));
    }

    // Continue with post update logic
    let updatedPost;
    if (!req.file) {
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description },
        { new: true }
      ).populate('creator', 'name email avatar');
    } else {
      const thumbnailBuffer = req.file.buffer;
      const thumbnailName = req.file.originalname.split('.')[0].replace(/\s+/g, '%20');

      const thumbnailUrl = await uploadToVercelBlob(thumbnailBuffer, thumbnailName);

      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description, thumbnail: thumbnailUrl },
        { new: true }
      ).populate('creator', 'name email avatar');
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Edit Post Error:', error);
    return next(new HttpError(error.message || 'Something went wrong.', 500));
  }
};





// ======================== Delete a Post
// DELETE : /api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    try {
      const postId = req.params.id;
  
      if (!postId) {
        return next(new HttpError("Post ID is missing.", 400));
      }
  
      const post = await Post.findById(postId);
      if (!post) {
        return next(new HttpError("Post not found.", 404));
      }
  
      // Ensure the requester is the creator of the post
      if (post.creator.toString() !== req.user.id) {
        return next(new HttpError("You are not authorized to delete this post.", 403));
      }
  
      // Get the public_id from the post model
      const publicId = post.thumbnailPublicId;
  
      if (!publicId) {
        return next(new HttpError("Invalid thumbnail public ID.", 400));
      }
  
      // Delete the thumbnail from Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);
  
      if (cloudinaryResponse.result !== "ok") {
        console.warn(`Cloudinary deletion response: ${cloudinaryResponse.result}`);
        // Proceed to delete the post even if Cloudinary deletion fails
      }
  
      // Delete the post from the database
      await Post.findByIdAndDelete(postId);
  
      // Find the user and decrease the post count by 1
      const currentUser = await User.findById(req.user.id);
      if (currentUser) {
        currentUser.posts = (currentUser.posts || 1) - 1;
        await currentUser.save();
      }
  
      res.status(200).json({ message: "Post and associated thumbnail deleted successfully." });
    } catch (error) {
      console.error("Delete Post Error:", error);
      return next(new HttpError("Couldn't delete the post.", 500));
    }
  };

module.exports = { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost };
