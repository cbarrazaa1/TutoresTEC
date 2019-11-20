const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  receivedTime: {
    type: Date,
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  triggeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  },
  extraInformation: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

NotificationSchema.methods.populateReferences = async function() {
  const User = mongoose.model('user');
  this.receiver = await User.findById(this.receiver);
  this.triggeredBy = await User.findById(this.triggeredBy);

  return this;
};

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = {Notification, NotificationSchema};
