const express = require('express');
const {Session} = require('../models/Session');

const router = express.Router();

router.get('/all', async (req, res) => {
  const {userID} = req.query;

  // user id is required
  if (userID == null) {
    return res.status(401).json({
      success: false,
      message: 'Missing userID from query parameters',
    });
  }

  return await Session.find({$or: [{tutor: userID}, {student: userID}]});
});

router.post('/create', async (req, res) => {
  const {start, end, tutor} = req.body;

  // all are required
  if (start == null || end == null || tutor == null) {
    return res.status(401).json({
      success: false,
      message: 'Missing required fields from body.',
    });
  }

  const session = await Session.create({
    start,
    end,
    tutor,
    student: null,
    status: 'open',
  });
  return res.status(200).json({
    success: true,
    session,
  });
});

module.exports = router;
