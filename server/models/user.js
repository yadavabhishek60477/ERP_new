// backend/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  issuedBooks: [{ bookId: mongoose.Schema.Types.ObjectId, issueDate: Date }],
});

const User = mongoose.model('User', UserSchema);

export default User;
