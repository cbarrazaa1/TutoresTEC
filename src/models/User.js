const mongoose = require('mongoose');
const {Notification} = require('./Notification');

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
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'notification',
    },
  ],
});

UserSchema.methods.populateReferences = async function() {
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
