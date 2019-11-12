const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

require('dotenv').config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {email, name, password, description} = req.body;
  const user = await User.findOne({email: email});
  if (!user) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      name,
      password: encryptedPassword,
      description,
      userType: 0,
    });
    const token = jwt.sign({id: newUser.get('_id')}, process.env.JWT_SECRET, {
      issuer: 'TutoresTEC',
      algorithm: 'HS256',
      expiresIn: '30d',
    });
    res.cookie('jwt', token);
    return res.status(200).json({success: true, message: 'User created'});
  } else {
    return res
      .status(401)
      .json({success: false, message: 'Oh oh! Email taken!'});
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  console.log(req.body);

  if (user) {
    const realPassword = user.get('password');
    const isValid = await bcrypt.compare(password, realPassword);
    if (isValid) {
      const token = jwt.sign({id: user.get('_id')}, process.env.JWT_SECRET, {
        issuer: 'TutoresTEC',
        algorithm: 'HS256',
        expiresIn: '30d',
      });
      res.cookie('jwt', token);
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

router.get('/validateToken', (req, res) => {
  const verifyOptions = {
    issuer: 'TutoresTEC',
    algorithms: ['HS256'],
    expiresIn: '30d',
  };

  try {
    const verified = jwt.verify(
      req.cookies.jwt,
      process.env.JWT_SECRET,
      verifyOptions,
    );
    return res.status(200).json({success: true, message: 'Valid token'});
  } catch {
    return res.status(401).json({success: false, message: 'Token not valid'});
  }
});

module.exports = router;
