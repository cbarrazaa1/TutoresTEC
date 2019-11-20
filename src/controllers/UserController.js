const express = require('express');
const {User} = require('../models/User');
const {Session} = require('../models/Session');

const router = express.Router();

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
  user.courses.push(courseIDs);

  // create sessions
  for (let session of sessions) {
    const createdSession = await Session.create(session);
    user.sessions.push(createdSession._id);
  }

  // save changes
  await user.save();
  return res
    .status(200)
    .json({success: true, message: 'User has been changed into a tutor'});
});

module.exports = router;
