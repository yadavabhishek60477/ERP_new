// server/models/Payment.js (Rename from Fee.js and update content)
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // References your Student model
    required: true,
  },
  studentFeeDue: { // Links this payment to a specific outstanding fee obligation
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentFeeDue',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentDate: {
    type: Date,
    default: Date.now, // Date when the payment record is created/confirmed
  },
  paymentMethod: {
    type: String,
    enum: ['Online', 'Cash', 'Cheque', 'Bank Transfer'], // Possible payment methods
    required: true,
  },
  transactionId: { // Unique ID from payment gateway (for online) or bank (for transfer)
    type: String,
    unique: true, // Ensures no duplicate transaction IDs
    sparse: true, // Allows null values, as manual payments might not have this initially
  },
  gatewayOrderId: { // Your internal order ID sent to the payment gateway
    type: String,
    unique: true,
    sparse: true, // Allows null values
  },
  status: { // Status of this *individual payment transaction*
    type: String,
    enum: ['Initiated', 'Pending', 'Success', 'Failed', 'Refunded'],
    default: 'Initiated', // Initial state for online payments
  },
  gatewayResponse: { // Stores the raw response object from the payment gateway for debugging
    type: Object,
  },
  receiptUrl: { // Optional: URL to a generated payment receipt
    type: String,
  },
  recordedBy: { // For manual payments (Cash, Cheque, Bank Transfer), which admin/user recorded it
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' model for admin/staff accounts
    required: function() { return this.paymentMethod !== 'Online'; } // Required if not an online payment
  }
}, { timestamps: true }); // Adds createdAt and updatedAt for the payment record itself

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;