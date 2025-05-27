// server/routes/paymentRoutes.js
import { Router } from 'express';
import { initiateOnlinePayment, handleRazorpayWebhook } from '../controllers/paymentController.js';
import auth from '../middleware/auth.js'; // Your authentication middleware (e.g., checks if user is logged in)

const router = Router();

/**
 * @route POST /api/payments/initiate
 * @desc Endpoint for students to initiate an online payment.
 * @access Private (requires student authentication).
 */
router.post('/initiate', auth, initiateOnlinePayment);

/**
 * @route POST /api/payments/webhook
 * @desc Webhook endpoint for Razorpay to send payment status updates.
 * @access Public (Razorpay's servers call this).
 * IMPORTANT: DO NOT add any authentication middleware here, as Razorpay sends requests from its servers.
 */
router.post('/webhook', handleRazorpayWebhook);

export default router;