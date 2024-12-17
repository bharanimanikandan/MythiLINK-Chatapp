import { compare } from 'bcrypt';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { renameSync, unlinkSync } from 'fs';

// Set the expiration for the JWT token
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Create the JWT token
const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge});
}

// Controller for signup
export const signup = async(request, response, next) => {
    // Set the email and password
    try {
        const {email, password} = request.body;
        if(!email || !password){
            return response.status(400).send("Email and Password is required")
        }

        // Create a user
        const user = await User.create({email, password});
        // get the resonse as token
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite:"None",
        });
        // return the response
        return response.status(201).json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
            }
        })
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error")
    }
};

// Controller for login
export const login = async (request, response, next) => {
    try {
        const {email, password} = request.body;
        if(!email || !password){
            return response.status(500).send("Email and Password is required");
        }
        // Find the user
        const user = await User.findOne({email});
        if(!user){
            return response.status(401).send("User not found in this Email");
        }
        const auth = await compare(password, user.password);
        if(!auth){
            return response.status(401).send("Password incorrect");
        }
        // get the resonse as token
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite:"None",
        });
        // return the response
        return response.status(200).json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                color:user.color,
            }
        })
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
};

// Controller for get the userinfo
export const getUserInfo = async (request, response, next) => {
    try {
        const userData = await User.findById(request.userId)
        if(!userData) {
            return response.status(404).send("User with the given id not found")
        }
        
        return response.status(200).json({
                id:userData.id,
                email:userData.email,
                profileSetup:userData.profileSetup,
                firstName:userData.firstName,
                lastName:userData.lastName,
                image:userData.image,
                color:userData.color,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
};

// Controller for update user info in DB
export const updateProfile = async (request, response, next) => {
    try {
        const { userId }=request;
        const { firstName, lastName, color } = request.body;
        if(!firstName || !lastName) {
            return response.status(400).send("First Name , Last Name , Color is required")
        }
        
        // Funtion for updation
        const userData = await User.findByIdAndUpdate(userId, {
            firstName,lastName,color,profileSetup:true
        },{new:true, runValidators:true}); //MongoDB query to get the updated new userdata

        return response.status(200).json({
                id:userData.id,
                email:userData.email,
                profileSetup:userData.profileSetup,
                firstName:userData.firstName,
                lastName:userData.lastName,
                image:userData.image,
                color:userData.color,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
};

// Controller for update Profile image in DB
export const addProfileImage = async (request, response, next) => {
    try {
        if(!request.file){
            return response.status(400).send("File is required")
        }
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + request.file.originalname
        renameSync(request.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(request.userId, {image: fileName},{runValidators: true});
        return response.status(200).json({
                image: updatedUser.image,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
};

// Controller for remove Profile image in DB
export const removeProfileImage = async (request, response, next) => {
    try {
        const { userId }=request;
        const user = await User.findById(userId);
        if(!user){
            return response.status(404).send("User with the given id not found");
        }
        if(user.image){
            unlinkSync(user.image);
        }
        user.image = null;
        await user.save();
        return response.status(200).send("Profile image removed successfully");
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
};

// Controller for remove Logout in DB
export const logout = async (request, response, next) => {
    try {
        response.cookie("jwt","",{maxAge:1, secure:true, sameSite:"none"})
        return response.status(200).send("Logout Successfull.");
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
};