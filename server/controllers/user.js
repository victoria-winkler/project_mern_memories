import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';   //(when importing in NODE.js always add .js -> React takes it without!!!)

export const signIn = async (req, res) => {
    const {email, password} = req.body;     //req contains all the data send from the frontend

    try {
        //try to find existing User
        const existingUser = await User.findOne({email});   //searches for existing user in DB

        //checks if User exists already!
        if(!existingUser) return res.status(404).json({message: "User does not exist!"});
        
        //check if passwords match
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        //create JWT (Secret should be stored in .env -> 'test')
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

        //send User and token to the front-end
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: 'something went wrong'});
    }
}

export const signUp = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        //check if user exists already! -> cannot allow 2 users with the same email
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});

        //check if password and confirmed password are equal!
        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match"});

        //hash Password (password, SALT)
        const hashedPassword = await bcrypt.hash(password, 12);

        //creates User
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

        //create JWT token
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});
        
        //returns User and token
        res.status(200).json({result: result, token});
    } catch (error) {
        res.status(500).json({message: 'something went wrong'});
    }
}