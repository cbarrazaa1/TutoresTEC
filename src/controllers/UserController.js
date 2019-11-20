const express = require('express');
const {User} = require('../models/User');
const {Session} = require('../models/Session');

const router = express.Router();

router.get('/toprated', async (req, res) => {
  const {populated} = req.query;
  let users = await User.find({userType: 1})
    .sort({rating: -1})
    .limit(5);

  if (populated) {
    users = await Promise.all(
      users.map(async user => await user.populateReferences()),
    );
  }

  return res.status(200).json({success: true, users});
});

router.get('/search', async (req, res) => {
  const {q, populated} = req.query;
  let users = await User.find({name: {$regex: q, $options: 'i'}, userType: 1});

  if (populated) {
    users = await Promise.all(
      users.map(async user => await user.populateReferences()),
    );
  }

  return res.status(200).json({success: true, users});
});

router.post('/becometutor', async (req, res) => {
  const {userID, courseIDs, sessions} = req.body;

  // all are required
  if (userID == null || courseIDs == null || sessions == null) {
    return res.status(401).json({
      success: false,
      message: 'Missing required parameters from body.',
    });
  }

  const user = await User.findById(userID);
  user.userType = 1; // tutor
  courseIDs.forEach(id => user.courses.push(id));

  // create sessions
  for (let session of sessions) {
    const createdSession = await Session.create(session);
    user.sessions.push(createdSession._id);
  }

  // save changes
  await user.save();
  return res
    .status(200)
    .json({success: true, message: 'User has been changed into a tutor.'});
});

module.exports = router;
