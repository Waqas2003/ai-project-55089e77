const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('author');
  res.send(comments);
});

router.post('/:postId', async (req, res) => {
  const { content } = req.body;
  const comment = new Comment({ content, post: req.params.postId, author: req.user._id });
  await comment.save();
  res.send({ message: 'Comment created successfully' });
});

router.delete('/:id', async (req, res) => {
  await Comment.findByIdAndRemove(req.params.id);
  res.send({ message: 'Comment deleted successfully' });
});

module.exports = router;