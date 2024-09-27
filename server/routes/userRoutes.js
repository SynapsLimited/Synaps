// routes/userRoutes.js

const { Router } = require('express');
const { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors } = require("../controllers/userControllers");
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig'); // Ensure correct path

const router = Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser); // Public route to get user by ID
router.get('/', getAuthors);  // Public route to get all authors

// Protected Routes
router.post('/change-avatar', authMiddleware, upload.single('avatar'), changeAvatar);
router.patch('/edit-user', authMiddleware, editUser);

module.exports = router;
