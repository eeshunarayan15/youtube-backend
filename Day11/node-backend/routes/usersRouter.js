const express = require('express');
const router = express.Router();
const userModel=require('../model/users')
const { generateToken } = require("../utils/generateToken");
const {register,LoginUser}=require('../controllers/authControllers')
const isLoggedin = require("../middlewares/isLoggedin");


const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
router.get('/user', function (req, res) {
    res.send('Hello users');
})
// const express = require("express");
// const router = express.Router();

// router.get("/user", function (req, res) {
//   res.send("Hello users");
// });
router.post("/signup", register);

router.post('/login',LoginUser)
// GET /users/profile — Get current user's profile
router.get("/profile", isLoggedin, async (req, res) => {
    try {
        // ✅ SOLUTION: Fetch the complete user from database
        const user = await userModel.findById(req.user._id).select('-password');

        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ user });
    } catch (err) {
        console.error("Error in /users/profile:", err);
        res.status(500).json({ error: "Server error" });
    }
});



router.put("/profile/update", isLoggedin, async (req, res) => {
    try {
        const { fullName, address, phoneNumber } = req.body;

        // Find user using token
        const user = await userModel.findById(req.user._id);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Optional updates
        if (fullName) user.fullName = fullName;
        if (address) user.address = address;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error("Update profile error:", err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});
module.exports = router;
