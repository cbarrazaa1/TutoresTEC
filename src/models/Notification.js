const mongoose = require('mongoose');
const {UserSchema} = require('./User');

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

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = {Notification, NotificationSchema};
