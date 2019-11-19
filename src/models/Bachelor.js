const mongoose = require('mongoose');
const {Course} = require('./Course');

const BachelorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  relatedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course',
    },
  ],
});

BachelorSchema.methods.populateReferences = async function() {
  this.relatedCourses = await Promise.all(
    this.relatedCourses.map(async id => {
      const course = await Course.findById(id);
      return await course.populateReferences();
    }),
  );

  return this;
};

const Bachelor = mongoose.model('bachelor', BachelorSchema);

module.exports = {Bachelor, BachelorSchema};
