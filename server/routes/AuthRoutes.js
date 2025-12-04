import { Router } from 'express';
import { register, login, getUserInfo, updateProfile, addProfileImage, removeProfileImage, logOut } from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';
import multer from 'multer';

const authRoutes = Router();
// Configure multer for file uploads
const upload = multer({ dest: 'uploads' });

authRoutes.post('/signup', register);
authRoutes.post('/login', login);
authRoutes.get('/user-info', verifyToken, getUserInfo);
authRoutes.post('/update-profile', verifyToken, updateProfile);
authRoutes.post('/add-profile-image', verifyToken, upload.single("profile-image") ,addProfileImage);
authRoutes.delete('/delete-profile-image', verifyToken, removeProfileImage);
authRoutes.post('/logout', verifyToken, logOut);

export default authRoutes;