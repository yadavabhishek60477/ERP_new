import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import { addDummyAdmin } from './controllers/adminController.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import libraryRoutes from './routes/libraryRoutes.js';
// here new payement code add
// import connectDB from './config/db.js'; // Assuming your DB connection is here, or adjust path
// Import new payment routes
import paymentRoutes from './routes/paymentRoutes.js';
// Import existing student routes (ensure it's already there)
// import studentRoutes from './routes/studentRoutes.js';

dotenv.config(); // Load environment variables
// connectDB(); // Connect to MongoDB

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/library', libraryRoutes);
// here add payment code
verify: (req, res, buf) => {
  // Only capture rawBody for the Razorpay webhook path
  if (req.originalUrl === '/api/payments/webhook') {
    req.rawBody = buf.toString(); // Store raw body as string
  }
};
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// --- Routes ---
app.use('/api/students', studentRoutes); // Your existing student routes
app.use('/api/payments', paymentRoutes); // NEW: Mount the payment routes

// Basic route for testing server status
app.get('/', (req, res) => {
  res.send('College ERP API is running...');
});

const PORT = process.env.PORT || 5001;
app.get('/', (req, res) => {
  res.send('Hello to college erp API');
});
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    addDummyAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log('Mongo Error', error.message));
