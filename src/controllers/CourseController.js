const express = require('express');
const {Bachelor} = require('../models/Bachelor');
const {Course} = require('../models/Course');

const router = express.Router();

router.get('/all', async (req, res) => {
  const {populated, bachelor, bachelorShort} = req.query;

  // either bachelor or bachelorShort is required
  if (bachelor == null && bachelorShort == null) {
    return res.status(401).json({
      success: false,
      message: 'Bachelor name or bachelor short name required.',
    });
  }

  // make sure bachelor exists
  const bachelorObj = await Bachelor.findOne({
    $or: [{name: bachelor}, {shortName: bachelorShort}],
  });

  if (bachelorObj == null) {
    return res.status(404).json({
      success: false,
      message: 'Provided bachelor not found.',
    });
  }

  let courses = await Course.find({
    relatedBachelors: {$in: [bachelorObj._id]},
  });

  if (populated) {
    courses = await Promise.all(
      courses.map(async course => {
        return await course.populateReferences();
      }),
    );
  }

  return res.status(200).json({
    success: true,
    courses,
  });
});

router.post('/create', async (req, res) => {
  const courses = req.body.courses;

  let isValid = true;
  for (let course of courses) {
    // name and code are required
    if (course.name == null && course.code == null) {
      return res.status(401).json({
        success: false,
        message: 'Name and code are required',
      });
    }

    // check that it doesn't exist already
    const courseObj = await Course.findOne({
      code: course.code,
    });

    if (courseObj != null) {
      isValid = false;
    }
  }

  if (!isValid) {
    return res.status(404).json({
      success: false,
      message: 'Course with that code already exists.',
    });
  }

  const createdCourses = await Promise.all(
    courses.map(async course => {
      return await Course.create(course);
    }),
  );

  return res.status(200).json({
    success: true,
    courses: createdCourses,
  });
});

module.exports = router;
