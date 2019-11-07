const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

require('dotenv').config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {username, name, password, description} = req.body;
  const user = await User.findOne({username: username});
  if (!user) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    User.create({
      username,
      name,
      password: encryptedPassword,
      description,
      userType: 0,
    });
    return res.status(200).json({success: true, message: 'User created'});
  } else {
    return res
      .status(403)
      .json({success: false, message: 'Oh oh! Username taken!'});
  }
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});

  if (user) {
    const realPassword = user.get('password');
    const isValid = await bcrypt.compare(password, realPassword);

    if (isValid) {
      return res.status(200).json({success: true, message: 'Login successful'});
    } else {
      return res
        .status(401)
        .json({success: false, message: 'Password is incorrect'});
    }
  } else {
    return res.status(404).json({success: false, message: 'User not found'});
  }
});

module.exports = router;
