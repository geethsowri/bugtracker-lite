const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ username: req.body.username, password: hashed });
    res.status(201).json({ message: 'User created', user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
});


router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;
