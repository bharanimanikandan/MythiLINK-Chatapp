
# Myth!LINK-Chat Application
Mythilink Chat is a modern real-time chat application designed to provide seamless communication for individuals and groups. Built with the MERN stack and enhanced using Socket.io for real-time messaging.





## Snaps of our Application
![image alt](https://github.com/bharanimanikandan/MythiLINK-Chatapp/blob/1735c7ef6af737732f5caa3e9ade5f00a7b9c457/MythiLINK.jpg?raw=true)

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [API Endpoints](#api-endpoints)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [Key Components](#key-components)
7. [Feedback](#feedback)
## Features

- **User Registration**:  
  Allows new users to create accounts by providing a username, email, and password. Passwords are securely hashed before being stored in the database.

- **User Login**:  
  Enables users to log in with their credentials (email and password) to receive a JSON Web Token (JWT) for authentication.

- **JWT-Based Authentication**:  
  Utilizes JSON Web Tokens for secure and stateless authentication, ensuring that users remain logged in without storing sensitive session data on the server.

- **Secure Token Storage**:  
  Tokens are stored in HTTP-only cookies to protect them from client-side attacks, such as XSS (Cross-Site Scripting).

- **Protected Routes**:  
  Implements middleware to restrict access to certain routes, allowing only authenticated users to access their profile or other sensitive endpoints.

- **Error Handling**:  
  Provides meaningful error messages and HTTP status codes for invalid requests, such as incorrect credentials, missing fields, or expired tokens.

## Technologies Used

- **Node.js**: A JavaScript runtime environment for building scalable and efficient server-side applications.
- **Express.js**: A fast and minimalist web framework for Node.js to create robust APIs.
- **MongoDB**: A NoSQL database for storing user data in a flexible, scalable format.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB, providing schema-based solutions.
- **JSON Web Tokens (JWT)**: For secure and stateless user authentication.
- **bcrypt.js**: A library for hashing passwords securely before storing them in the database.
- **dotenv**: For managing environment variables securely.
- **HTTP-only Cookies**: For securely storing tokens on the client-side, preventing XSS attacks.
- **Socket.IO**-Socket.IO is used for real-time communication between the server and clients in this chat application.

## **User Routes**

1. **Register a New User**  
   - **Endpoint**: `POST /api/auth/register`  
   - **Description**: Create a new user account.  
   - **Request Body**:  
     ```json
     {
       "email": "user@example.com",
       "password": "password123",
       "confirm password": "password123"
     }
     ```
   - **Response**:  
     ```json
     {
       "message": "User registered successfully"
     }
     ```

2. **Login User**  
   - **Endpoint**: `POST /api/auth/login`  
   - **Description**: Log in a user to receive a JWT.  
   - **Request Body**:  
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response**:  
     ```json
     {
       "message": "Login successful",
       "token": "jwt_token_here"
     }
     ```
   - **Cookies**:  
     The token will also be stored in an HTTP-only cookie named `authToken`.

3. **Get User Profile**  
   - **Endpoint**: `GET /api/auth/profile`  
   - **Description**: Retrieve the logged-in user's profile.  
   - **Headers**:  
     ```json
     {
       "Authorization": "Bearer jwt_token_here"
     }
     ```
   - **Response**:  
     ```json
     {
       "id": "user_id_here",
       "username": "user123",
       "email": "user@example.com"
     }
     ```

## Key Components
### **Socket.Io**
- Socket.IO allows you to establish a persistent connection between the client and the server, enabling real-time communication. It is used to handle events such as message sending, receiving, file sharing, etc., in real-time.
### 1. **Models**
- **Auth Model**:  
  The Auth Model handles user authentication and authorization, ensuring secure access to the application. It includes user registration, login, and token-based verification using JWT (JSON Web Token). The model securely stores user credentials with password hashing using bcrypt and provides endpoints for profile management and user authentication.
- **User Model**:  
  The User Model represents a user within the application, containing essential information required for user management and authentication. It is responsible for storing user details such as the name, email, password, profile picture. The model also manages user interactions like updating profile information
- **Message Model**:  
  The Message Model is used to store chat messages in the database. Each message is associated with a specific chat (either individual or group), contains content (text or files), and has metadata such as the sender, timestamp, and message type. The model supports both text and multimedia content, enabling a rich messaging experience.
---

### 2. **Controllers**
  
  Implements the business logic for user registration, login, profile retrieval, and logout. Handles validation, error handling, and token generation.

---

### 3. **Routes**
  Defines the API endpoints for user registration, login, profile access, and logout. Each route is associated with its respective controller function.

---

### 4. **Middleware** 
  Verifies the JWT provided in the Authorization header or cookies. Protects sensitive routes and attaches the user information to the request object.

---

### 5. **Configuration**
- **Environment Variables (`.env`)**:  
  Stores sensitive information like the MongoDB connection URI and JWT secret key. Managed using the `dotenv` library.

---

### 6. **Utilities**
- **bcrypt.js**:  
  For hashing and comparing passwords to ensure secure storage and validation.
- **jsonwebtoken**:  
  For generating and verifying JSON Web Tokens for user authentication.

---

### 7. **Database**
- **MongoDB (via Mongoose)**:  
  A NoSQL database used to store user data in a flexible, schema-based structure.

## Feedback
We welcome your feedback on this project! Whether you find bugs, have feature suggestions, or want to improve the existing code, feel free to contribute. You can provide feedback in the following ways:
- General Feedback: For general comments or suggestions, you can also reach out via email at [kskaranbharani2001@example.com] or drop a comment in the repository discussions.

We appreciate your input and contributions to help make this project better for everyone!
