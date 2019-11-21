const express = require('express');
const {Session} = require('../models/Session');
const {User} = require('../models/User');
const {Notification} = require('../models/Notification');

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
  let {sessions} = req.body;

  if (sessions == null) {
    return res.status(401).json({
      success: false,
      message: 'Missing required fields from body.',
    });
  }

  sessions = await Promise.all(
    sessions.map(async session => {
      const {start, end, tutor, place} = session;
      return await Session.create({
        start,
        end,
        tutor,
        place,
        student: null,
        status: 'open',
      });
    }),
  );

  return res.status(200).json({
    success: true,
    sessions,
  });
});

router.put('/edit/:id', async (req, res) => {
  const {id} = req.params;
  const {start, end, tutor, place, student, status} = req.body;

  const session = await Session.findById(id);
  console.log(session);
  if (start != null) {
    session.start = start;
  }

  if (end != null) {
    session.end = end;
  }

  if (tutor != null) {
    session.tutor = tutor;
  }

  if (student != null) {
    session.student = student;
  }

  if (place != null) {
    session.place = place;
  }

  if (status != null) {
    session.status = status;
  }
  await session.save();

  if (student != null) {
    const user = await User.findById(student);
    user.sessions.push(session._id);
    await user.save();

    const start = new Date(session.start).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const end = new Date(session.end).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const day = new Date(session.start).toLocaleString().split(',')[0];
    await Notification.create({
      type: 0,
      message: `Student ${user.name} has scheduled a tutoring session with you for ${day} ${start} - ${end}!`,
      receivedTime: Date.now(),
      receiver: session.tutor,
      triggeredBy: session.student,
    });

    const tutor = await User.findById(session.tutor);
    tutor.hasNewNotifications = true;
    await tutor.save();
  }
  return res.status(200).json({success: true, session});
});

module.exports = router;
