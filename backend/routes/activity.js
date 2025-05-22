const router = require('express').Router();
const Activity = require('../models/Activity'); // use Activity model, not Bug

router.get('/', async (req, res) => {
  try {
    // aggregate activity counts by user
    const heatmap = await Activity.aggregate([
      {
        $group: {
          _id: '$user',
          activityCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          username: '$user.username',
          activityCount: 1,
        },
      },
    ]);
    res.json(heatmap);
  } catch (err) {
    console.error('Error fetching activity heatmap:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
