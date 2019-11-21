const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  place: {
    type: String,
    required: true,
  },
});

SessionSchema.methods.populateReferences = async function() {
  const User = mongoose.model('user');
  this.tutor = await User.findById(this.tutor);
  this.student = await User.findById(this.student);

  return this;
};

const Session = mongoose.model('session', SessionSchema);

module.exports = {Session, SessionSchema};
