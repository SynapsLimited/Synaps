const { Router } = require('express');
const { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors } = require("../controllers/userControllers");
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authMiddleware, getUser);  // Ensure this uses authMiddleware
router.get('/', getAuthors);
router.post('/change-avatar', changeAvatar);  // Ensure this uses authMiddleware
router.patch('/edit-user', authMiddleware, editUser);  // Ensure this uses authMiddleware

module.exports = router;
