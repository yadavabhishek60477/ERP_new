import mongoose from 'mongoose';
const { Schema } = mongoose;
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'subject',
    },
  ],
  username: {
    type: String,
  },
  gender: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  fatherContactNumber: {
    type: Number,
  },
  dob: {
    type: String,
    required: true,
  },
  passwordUpdated: {
    type: Boolean,
    default: false,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  // here add fee submission code
  
feeDues: [{ // Array of references to outstanding fee obligations for this student
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentFeeDue',
  }],
  paymentHistory: [{ // Array of references to all payment transactions made by this student
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  }],

}, { timestamps: true });
const Student = mongoose.model('Student', studentSchema);
export default Student;
