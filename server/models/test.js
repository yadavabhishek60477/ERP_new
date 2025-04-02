import mongoose from 'mongoose';

const testSchema = mongoose.Schema({
  test: {
    type: String,
    required: true,
    trim: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    default: 10,
  },
  year: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model('Test', testSchema);
export default Test;
