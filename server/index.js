// Import all necessary dependencies
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/AuthRoutes.js'
import cors from "cors";
import contactsRoutes from './routes/ContactRoutes.js'
import setupSocket from './socket.js'
import messagesRoutes from './routes/MessagesRoutes.js'
import channelRoutes from './routes/ChannelRoutes.js'

// confiuration to environment variables
dotenv.config();

// confiuration to express
const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

// Cors middleware
app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))

// Multer middleware
app.use("/uploads/profiles", express.static("uploads/profiles"))
app.use("/uploads/files", express.static("uploads/files"));

// Initalization for the cookie-parser and json-parser middleware
app.use(cookieParser());
app.use(express.json());

// Define the authroute
app.use("/api/auth", authRoutes)

// Defining the Contacts routes
app.use("/api/contacts", contactsRoutes)

// Chat history route
app.use('/api/messages', messagesRoutes)

// Route for Channel creation
app.use('/api/channel', channelRoutes)

// Start the server
const server = app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

// Socket.io setup
setupSocket(server)

// Connect DB
mongoose.connect(databaseURL).then(()=>console.log(`DB connection established`));