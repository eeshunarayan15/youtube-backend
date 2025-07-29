const express = require('express')
const app = express();
const userModel=require('./model/users');
const jwt=require('jsonwebtoken');
const mongoose=require('./config/mongooseConnection')
// require('dotenv').config();
require("dotenv").config({ path: "" });
const verifyToken = require("./middlewares/isLoggedin");
const cors=require('cors');
app.use(cors());
app.use(express.json());
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const bodyParser = require("express");
app.use(express.json())
app.use(cookieParser())
// const JWT_SECRET = 'your_jwt_secret'; // use .env for safety
const ownerRouter=require('./routes/ownersRouter');
const productsRouter=require('./routes/productsRouter');
const usersRouter=require('./routes/usersRouter')
const categoryRouter = require("./routes/categoryRoutes");

app.use('/owners',ownerRouter);
app.use('/products',productsRouter);
app.use('/users', usersRouter);
app.use("/categories", categoryRouter);



app.get('/',async (req, res) => {
    res.send("Hello World");
})

// app.post('/register', async (req, res) => {
//     const { username, password, email, age } = req.body;

//     // Input validation
//     if (!username || !password || !email || !age) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     // Validate password strength (min 8 chars)
//     if (password.length < 8) {
//         return res.status(400).json({ error: "Password must be at least 8 characters" });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         return res.status(400).json({ error: "Invalid email format" });
//     }

//     try {
//         // Check if user already exists
//         const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
//         if (existingUser) {
//             const field = existingUser.email === email ? "Email" : "Username";
//             return res.status(400).json({ error: `${field} already exists` });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 12);

//         // Create new user
//         const newUser = await userModel.create({
//             username,
//             password: hashedPassword,
//             email,
//             age
//         });

//         // Generate JWT token
//         const token = jwt.sign(
//             { userId: newUser._id },
//             JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         // Return token & user data (excluding password)
//         res.status(201).json({
//             message: "Registration successful",
//             token, // Send token in response
//             user: {
//                 id: newUser._id,
//                 username: newUser.username,
//                 email: newUser.email,
//                 age: newUser.age
//             }
//         });

//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({ error: "Registration failed. Please try again." });
//     }
// });
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     // Input validation
//     if (!email || !password) {
//         return res.status(400).json({ error: "Email and password are required" });
//     }

//     try {
//         // Find user by email
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ error: "Invalid email or password" });
//         }

//         // Compare passwords
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ error: "Invalid email or password" });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { userId: user._id },
//             JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         // Return token & user data (excluding password)
//         res.status(200).json({
//             message: "Login successful",
//             token, // Send token in response
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 age: user.age
//             }
//         });

//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ error: "Login failed. Please try again." });
//     }
// });
// // Profile endpoint (protected)
// app.get('/profile', authenticateToken, async (req, res) => {
//     try {
//         const user = await userModel.findById(req.user.userId).select('-password');
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// // Authentication middleware
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Extract "Bearer <token>"

//     if (!token) return res.status(401).json({ error: "Authorization token required" });

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ error: "Invalid or expired token" });
//         req.user = user; // Attach user data to the request
//         next();
//     });
// }
app.get("/shop", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to the shop!",
    user: req.user, // You can access logged-in user's info here
  });
});
app.listen(3000)