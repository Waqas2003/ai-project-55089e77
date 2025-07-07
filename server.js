const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

mongoose.connect('mongodb://localhost/blog-platform', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.send({ message: 'User created successfully' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send({ message: 'Invalid credentials' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
  res.send({ token });
});

app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});