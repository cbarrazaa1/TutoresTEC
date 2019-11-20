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
  bachelor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bachelor',
  },
  semester: {
    type: Number,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: false,
  },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'notification',
    },
  ],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course',
    },
  ],
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'session',
    },
  ],
});

UserSchema.methods.populateReferences = async function() {
  const Notification = mongoose.model('notification');

  this.notifications = await Promise.all(
    this.notifications.map(async id => {
      const notification = await Notification.findById(id);
      return await notification.populateReferences();
    }),
  );

  return this;
};

const User = mongoose.model('user', UserSchema);

module.exports = {User, UserSchema};
