// models/fee.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const feeSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Fee = mongoose.model("Fee", feeSchema);
export default Fee;
