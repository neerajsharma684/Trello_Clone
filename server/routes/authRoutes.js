const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/authController');

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);