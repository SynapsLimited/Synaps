const { Router } = require('express');
const { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors } = require("../controllers/userControllers");
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authMiddleware, getUser);  // Ensure this uses authMiddleware
router.get('/', getAuthors);
router.post('/change-avatar', upload.single('avatar'), changeAvatar);
router.patch('/edit-user', authMiddleware, editUser);  // Ensure this uses authMiddleware

module.exports = router;
