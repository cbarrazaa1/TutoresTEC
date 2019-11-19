const express = require('express');
const {Bachelor} = require('../models/Bachelor');
const {Course} = require('../models/Course');

const router = express.Router();

router.get('/all', async (req, res) => {
  const populated = req.query.populated;
  let bachelors = await Bachelor.find();

  if (populated) {
    bachelors = bachelors.map(async bachelor => {
      return bachelor.populateReferences();
    });
  }

  return res.status(200).json({
    success: true,
    bachelors,
  });
});

router.post('/create', async (req, res) => {
  const {name, shortName, relatedCourses} = req.body;

  // name and shortname are required
  if (name == null || shortName == null) {
    return res.status(401).json({
      success: false,
      message: 'Missing required fields from body.',
    });
  }

  const bachelor = await Bachelor.create({name, shortName, relatedCourses});
  return res.status(200).json({
    success: true,
    bachelor,
  });
});

router.put('/edit/:id', async (req, res) => {
  const {name, shortName, relatedCourses} = req.body;
  const id = req.params.id;

  // id is required
  if (id == null) {
    return res.status(401).json({
      success: false,
      message: 'Missing required id from parameters',
    });
  }

  const bachelor = await Bachelor.findByIdAndUpdate(id, {name, shortName, relatedCourses}, {new: true});

  // update courses with this bachelor
  relatedCourses.forEach(async id => {
    const course = await Course.findById(id);
    if (
      !course.relatedBachelors.find(courseID => {
        return courseID === id;
      })
    ) {
      course.relatedBachelors.push(id);
      await course.save();
    }
  });

  return res.status(200).json({
    success: true,
    bachelor,
  });
});
