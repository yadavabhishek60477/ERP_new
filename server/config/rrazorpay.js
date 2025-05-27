// server/config/razorpay.js
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config(); // This loads the environment variables from your .env file

// Initialize Razorpay instance with your API keys
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default instance;