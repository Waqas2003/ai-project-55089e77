const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author');
  res.send(posts);
});

router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, author: req.user._id });
  await post.save();
  res.send({ message: 'Post created successfully' });
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author');
  res.send(post);
});

router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { title, content });
  res.send({ message: 'Post updated successfully' });
});

router.delete('/:id', async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.send({ message: 'Post deleted successfully' });
});

module.exports = router;