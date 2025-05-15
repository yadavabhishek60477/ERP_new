// models/TimeTable.js
const mongoose = require('mongoose');

const timeTableSchema = new mongoose.Schema({
  course: { type: String, required: true },
  semester: { type: Number, required: true },
  day: { type: String, required: true }, // e.g., 'Monday'
  periods: [
    {
      startTime: String, // e.g., '09:00 AM'
      endTime: String,   // e.g., '10:00 AM'
      subject: String,
      faculty: String,
      room: String,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('TimeTable', timeTableSchema);
