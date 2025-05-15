// routes/timeTableRoutes.js
const express = require('express');
const router = express.Router();
const TimeTable = require('TimeTable', timeTableSchema);

// Create timetable
router.post('/', async (req, res) => {
  try {
    const timetable = new TimeTable(req.body);
    await timetable.save();
    res.status(201).json(timetable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all timetables
router.get('/', async (req, res) => {
  try {
    const timetables = await TimeTable.find();
    res.json(timetables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update timetable
router.put('/:id', async (req, res) => {
  try {
    const timetable = await TimeTable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(timetable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete timetable
router.delete('/:id', async (req, res) => {
  try {
    await TimeTable.findByIdAndDelete(req.params.id);
    res.json({ message: 'Timetable deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
