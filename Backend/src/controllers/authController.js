
const {UserModel} = require('../models');
const {serverConfig} = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Generate JWT Token

const generateToken = (id) => {
  return jwt.sign({ id }, serverConfig.JWT_SECRET, {
    expiresIn: "7d"
  });
};

//Register User

const registerUser = async(req,res) => {
    console.log(req.body);
    try {
        const {
            name,
            email,
            password,
            dietaryPreferences,
            allergies,
            dislikedIngredients,
            skillLevel
        }  = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        // Create new user
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
            dietaryPreferences,
            allergies,
            dislikedIngredients,
            skillLevel
        });

        await user.save();

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } 
    catch (error) {
         console.error("REGISTER ERROR:", error);
        res.status(500).json({ message: "Error registering user!" });
    }
}

//Login
const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body;

        const user = await UserModel.findOne({email});

        if (user && await bcrypt.compare(password, user.password)) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } 
        else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }  
    catch(error){
        return res.status(500).json({ message: error.message });
    }

}

module.exports = {
    registerUser,
    loginUser
}