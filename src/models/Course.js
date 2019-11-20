const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  relatedBachelors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bachelor',
    },
  ],
});

CourseSchema.methods.populateReferences = async function() {
  const Bachelor = mongoose.model('bachelor');

  this.relatedBachelors = await Promise.all(
    this.relatedBachelors.map(async id => {
      return await Bachelor.findById(id);
    }),
  );

  return this;
};

const Course = mongoose.model('course', CourseSchema);

module.exports = {Course, CourseSchema};
