const router = require('express').Router();
const Bug = require('../models/Bug');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const bug = await Bug.create({ ...req.body, createdBy: req.user.id });
  res.json(bug);
});

router.get('/', async (req, res) => {
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.severity) query.severity = req.query.severity;
  if (req.query.assignee) query.assignee = req.query.assignee;
  const bugs = await Bug.find(query);
  res.json(bugs);
});

router.put('/:id', async (req, res) => {
  const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(bug);
});

router.delete('/:id', async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;