const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/User');

require('dotenv').config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {email, name, password, bachelor, semester} = req.body;
  const user = await User.findOne({email: email});

  if (!user) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      name,
      password: encryptedPassword,
      bachelor,
      semester,
      userType: 0,
    });

    // create auth token
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
      issuer: 'TutoresTEC',
      algorithm: 'HS256',
      expiresIn: '30d',
    });

    // set token to user's cookies
    res.cookie('jwt', token);

    return res
      .status(200)
      .json({success: true, message: 'User created', user: newUser});
  } else {
    return res
      .status(401)
      .json({success: false, message: 'Oh oh! Email taken!'});
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if (user) {
    const realPassword = user.password;
    const isValid = await bcrypt.compare(password, realPassword);

    if (isValid) {
      // create auth token
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        issuer: 'TutoresTEC',
        algorithm: 'HS256',
        expiresIn: '30d',
      });

      // set token to user's cookies
      res.cookie('jwt', token);

      // populate user object
      let populatedUser = await user.populateReferences();

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: populatedUser,
      });
    } else {
      return res
        .status(401)
        .json({success: false, message: 'Password is incorrect'});
    }
  } else {
    return res.status(404).json({success: false, message: 'User not found'});
  }
});

router.get('/validateToken', async (req, res) => {
  const verifyOptions = {
    issuer: 'TutoresTEC',
    algorithms: ['HS256'],
    expiresIn: '30d',
  };

  try {
    const {id} = jwt.verify(
      req.cookies.jwt,
      process.env.JWT_SECRET,
      verifyOptions,
    );
    const user = await User.findById(id);
    const populatedUser = await user.populateReferences();

    return res
      .status(200)
      .json({success: true, message: 'Valid token', user: populatedUser});
  } catch {
    return res.status(401).json({success: false, message: 'Token not valid'});
  }
});

module.exports = router;
