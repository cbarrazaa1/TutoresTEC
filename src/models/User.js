const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: Number,
    required: true,
  },
  description: {
    semester: {
      type: Number,
      required: true,
    },
    bachelor: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: String,
      required: false,
    },
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
