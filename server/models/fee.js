// server/models/FeeStructure.js
import mongoose from 'mongoose';

const feeStructureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate fee names (e.g., only one "Semester 1 Tuition")
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0 // Amount cannot be negative
  },
  currency: {
    type: String,
    default: 'INR' // Default currency, can be changed
  },
  dueDate: {
    type: Date // When this fee is typically due
  },
  description: {
    type: String,
    trim: true
  },
  applicableTo: [{ // An array of strings describing who this fee applies to (e.g., "B.Tech-CSE", "MBA-2024Batch")
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true // Whether this fee structure is currently in use
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);
export default FeeStructure;