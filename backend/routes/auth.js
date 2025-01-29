const User = require("../models/User");

const router=require("express").Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');



router.post("/register", async (req, res) => {
    try {
      // Ensure required fields are present
      if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json("Missing required fields");
      }
  
      // Hash the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      // Create new user object
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      console.error("Error occurred during registration:", err); // Log the error to the console
      res.status(400).json({ message: "Registration failed", error: err.message });
    }
  });
  


  router.post("/login", async (req, res) => {
    try {
      console.log("Login attempt with username:", req.body.username);
  
      // Find user by username using Mongoose syntax
      const user = await User.findOne({ username: req.body.username });
  
      if (!user) {
        console.log("User not found in the database.");
        return res.status(401).json("User not found!!!");
      }
  
      console.log("User found:", user);
  
      // Compare the password with bcrypt
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      console.log("Password comparison result:", isPasswordValid);
  
      // If the password is valid, generate the JWT token
      if (isPasswordValid) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          "niraj", // Your secret key
          { expiresIn: "3d" }
        );
  
        const { password, ...others } = user._doc;
  
        console.log("Login successful. Sending response...");
        return res.status(200).json({ ...others, accessToken });
      } else {
        console.log("Invalid password.");
        return res.status(401).json("Unauthorized");
      }
  
    } catch (err) {
      console.error("Error occurred during login:", err);
      return res.status(400).json("Can't login the user!!!");
    }
  });
  




module.exports=router;