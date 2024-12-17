// Import mongoose & Bcrypt
import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";


// Create a new mongoose schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:[true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required:[true, "Password is required"]
    },
    firstName:{
        type: String,
        required: false,
    },
    lastName:{
        type: String,
        required: false,
    },
    image:{
        type: String,
        required: false,
    },
    color:{
        type: Number,
        required: false,
    },
    profileSetup:{
        type: Boolean,
        default: false
    },
})

// Hashing the password using Brcrypt
userSchema.pre("save", async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})

// Creating a User model using mongoose
const User = mongoose.model("Users", userSchema);

export default User;