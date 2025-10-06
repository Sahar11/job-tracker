import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//Register

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create and save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Respond successfully
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Login
router.post("/login", async(req, res) => {
    try{
        const {  email, password } = req.body;

        // Look for email in the database
        const user = await User.findOne({ email });
                                                                                                                                                                                                                                                                                                                                                                                                                       
        //if not found send error
        if(!user || user=== null) return res.status(400).json({ error: "User not found" });
        
        //if password is doesn't match send error
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ error: "Invalid credentials" });
        
        //if everything matches generate token against userid valid for 7 days
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d"});
        // send it as a response 
        res.json({ token, user:{ id: user._id, name: user.name, email: user.email}});
    } catch (err) {
        res.status(500).json({ error: "Login failed"});
    }
})

export default router;