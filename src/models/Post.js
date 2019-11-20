const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postedTime: {
    type: Date,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
});

PostSchema.methods.populateReferences = async function() {
  const User = mongoose.model('user');
  this.author = await User.findById(this.author);

  return this;
};

const Post = mongoose.model('post', PostSchema);

module.exports = {Post, PostSchema};
