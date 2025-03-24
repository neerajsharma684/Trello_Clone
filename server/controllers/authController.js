const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    const { Name, Email, Password } = req.body;
    const userExists = await User.findOne({ Email });
    
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    
    const user = await User.create({
        Name,
        Email,
        Password
    });

    if(user){
        res.status(200).json({
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            token: generateToken(user._id)
        });
    }

    else{
        res.status(400);
        throw new Error('Invalid user data');
    }
};

const loginUser = async (req, res) => {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });

    if(user && (await bcrypt.compare(Password, user.Password))){
        res.json({
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            token: generateToken(user._id)
        });
    }
    
        else{
            res.status(401);
            throw new Error('Invalid email or password');
        }
    };

module.exports = { registerUser, loginUser };
