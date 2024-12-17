import { Router } from "express";
import { getUserInfo, login, signup, updateProfile, addProfileImage, removeProfileImage, logout } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import  multer from "multer";

// Define Authroutes
const authRoutes = Router();

// Image Upload
const upload = multer({ dest: "uploads/profiles/"})

// Route to signup
authRoutes.post("/signup", signup); 

// Route to login
authRoutes.post("/login", login);

// Route for get the userinfo
authRoutes.get('/user-info', verifyToken, getUserInfo);

// Route for update destails on DB
authRoutes.post('/update-profile', verifyToken, updateProfile)

// Route for Profile image update
authRoutes.post("/add-profile-image", verifyToken, upload.single("profile-image") , addProfileImage);

// Route for remove profile image
authRoutes.delete("/remove-profile-image",verifyToken, removeProfileImage)

// Route for logout
authRoutes.post("/logout", logout)

// Export routes
export default authRoutes;
