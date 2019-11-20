const express = require('express');
const {Post} = require('../models/Post');

const router = express.Router();

router.get('/all', async (req, res) => {
  const populated = req.query.populated;
  let posts = await Post.find().sort({postedTime: -1});

  if (populated) {
    posts = await Promise.all(
      posts.map(async post => {
        return await post.populateReferences();
      }),
    );
  }
  console.log(populated);
  return res.status(200).json({
    success: true,
    posts,
  });
});

router.post('/create', async (req, res) => {
  const {author, title, content} = req.body;
  const postedTime = Date.now();
  // all are required
  if (!postedTime || !author || !title || !content) {
    return res.status(401).json({
      success: false,
      message: 'Missing required fields from body.',
    });
  }

  const post = await Post.create({postedTime, author, title, content});
  return res.status(200).json({
    success: true,
    post,
  });
});

router.put('/edit/:id', async (req, res) => {
  const {postedTime, author, title, content} = req.body;
  const postID = req.params.id;

  // id is required
  if (!postID) {
    return res.status(401).json({
      success: false,
      message: 'Missing required id from parameters',
    });
  }

  const post = await Post.findByIdAndUpdate(
    postID,
    {postedTime, author, title, content},
    {new: true},
  );

  return res.status(200).json({
    success: true,
    post,
  });
});

module.exports = router;
