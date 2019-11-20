const mongoose = require('mongoose');

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
  const Course = mongoose.model('course');

  this.relatedCourses = await Promise.all(
    this.relatedCourses.map(async id => {
      return await Course.findById(id);
    }),
  );

  return this;
};

const Bachelor = mongoose.model('bachelor', BachelorSchema);

module.exports = {Bachelor, BachelorSchema};
