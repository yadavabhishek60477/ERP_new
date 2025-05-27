// server/models/StudentFeeDue.js
import mongoose from 'mongoose';

const studentFeeDueSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // References your existing Student model
    required: true,
  },
  feeStructure: { // Links to the predefined FeeStructure (e.g., "Semester 1 Tuition")
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeeStructure',
    required: true,
  },
  originalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  amountPaid: {
    type: Number,
    default: 0,
    min: 0
  },
  balance: {
    type: Number,
    required: true, // Will be calculated before save
    min: 0
  },
  status: {
    type: String,
    enum: ['Outstanding', 'Partially Paid', 'Paid', 'Waived'], // Possible states of the fee obligation
    default: 'Outstanding',
  },
  dueDate: {
    type: Date, // Specific due date for this student's fee, can override FeeStructure's
  },
  isLate: {
    type: Boolean,
    default: false, // Set to true if payment is after dueDate
  },
  lateFeeApplied: {
    type: Number,
    default: 0, // Amount of late fee applied, if any
    min: 0
  },
  payments: [{ // Array of successful payment transactions made towards this specific due item
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment', // References the Payment model (defined next)
  }],
}, { timestamps: true });

// Pre-save hook to automatically calculate balance and update status before saving
studentFeeDueSchema.pre('save', function(next) {
  this.balance = this.originalAmount - this.amountPaid;
  if (this.balance <= 0) {
    this.status = 'Paid';
    this.balance = 0; // Ensure balance doesn't go negative
  } else if (this.amountPaid > 0) {
    this.status = 'Partially Paid';
  } else {
    this.status = 'Outstanding';
  }
  // You might add logic here to check if isLate should be true based on current date vs dueDate
  next();
});

const StudentFeeDue = mongoose.model('StudentFeeDue', studentFeeDueSchema);
export default StudentFeeDue;