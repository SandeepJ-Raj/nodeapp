const asyncHandler = require('express-async-handler');
const usersCollection = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const registerUser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(500);
        throw new Error("All fields are mandatory");
    }
    const isUserAvailable = await usersCollection.findOne({email});
    if(isUserAvailable) {
        res.status(401);
        throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`hashed password = ${hashedPassword}`);
    const user = await usersCollection.create({
        username, email, password: hashedPassword
    });
    if(user) {
        res.status(201).json({message: "User created successfully", id: user.id});
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
    //res.json({message: "Register User"});
});

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(500);
        throw new Error('All fields are mandatory');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDetails = await usersCollection.findOne({email, password: hashedPassword});
    if(!userDetails) {
        res.status(200).json({message: "No user found"});
    } else {
        res.status(200).json({message: "successfully logedin", data: userDetails});
    }
    // res.json({message: "Login User"});
});

const currentUser = asyncHandler( async (req, res) => {
    res.json({message: "Current User"});
});

module.exports = {registerUser, loginUser, currentUser};