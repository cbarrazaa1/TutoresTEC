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

router.get('/myTutors', async (req, res) => {
  // find user by id
  let user = await User.findById(req.query.id);
  user = await user.populateReferences();

  // find study sessions
  let sessions = user.sessions.filter(session => {
    if (session.student == null) {
      return false;
    }
    return session.student.equals(user._id);
  });

  sessions = await Promise.all(
    sessions.map(async session => {
      return await session.populateReferences();
    }),
  );

  // find current sessions
  let current = sessions.filter(session => {
    return session.status === 'pending';
  });

  // find past sessions
  let past = sessions.filter(session => {
    return session.status === 'closed';
  });

  current = await Promise.all(
    current.map(async session => {
      session.tutor = await session.tutor.populateReferences();
      return session;
    }),
  );

  past = await Promise.all(
    past.map(async session => {
      session.tutor = await session.tutor.populateReferences();
      return session;
    }),
  );

  return res.status(200).json({success: true, current, past});
});

router.get('/myStudents', async (req, res) => {
  let user = await User.findById(req.query.id);
  user = await user.populateReferences();

  let sessions = user.sessions.filter(session => {
    return session.tutor.equals(user._id);
  });

  sessions = await Promise.all(
    sessions.map(async session => {
      return await session.populateReferences();
    }),
  );

  const current = sessions.filter(session => {
    return session.status === 'pending';
  });

  current.map(async curr => await user.populateReferences());

  return res.status(200).json({success: true, current});
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

  let tutor = await user.populateReferences();
  // save changes
  await user.save();
  return res.status(200).json({success: true, message: tutor});
});

router.post('/sawnotifications', async (req, res) => {
  const {id} = req.body;
  const user = await User.findById(id);
  user.hasNewNotifications = false;
  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Notifications seen',
  });
});

router.post('/createSession', async (req, res) => {
  const {id, session} = req.body;
  const user = await User.findById(id);
  delete session.title;
  const createdSession = await Session.create(session);
  user.sessions.push(createdSession._id);
  await user.save();

  return res.status(200).json({success: true, message: 'Session created'});
});

router.delete('/deleteSession', async (req, res) => {
  const {id, sessionID} = req.body;
  const user = await User.findById(id);
  user.sessions = user.sessions.filter(id => !id.equals(sessionID));
  await user.save();
  await Session.findByIdAndDelete(sessionID);

  return res.status(200).json({success: true, message: 'Session deleted'});
});

module.exports = router;
