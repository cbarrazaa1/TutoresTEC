const mongoose = require('mongoose');
const {Bachelor} = require('mongoose');

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
  this.relatedBachelors = await Promise.all(
    this.relatedBachelors.map(async id => {
      const bachelor = await Bachelor.findById(id);
      return await bachelor.populateReferences();
    }),
  );

  return this;
};

const Course = mongoose.model('course', CourseSchema);

module.exports = {Course, CourseSchema};
