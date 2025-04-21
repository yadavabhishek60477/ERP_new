import { Router } from 'express';
import {
  studentLogin,
  updatedPassword,
  updateStudent,
  testResult,
  attendance,
  registerStudent,
  submitFee,
} from '../controllers/studentController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/login', studentLogin);
router.post('/updatepassword', auth, updatedPassword);
router.post('/updateprofile', auth, updateStudent);
router.post('/testresult', auth, testResult);
router.post('/attendance', auth, attendance);
router.post('/register', registerStudent);
// POST /api/students/:id/fee
router.post('/:id/fee', submitFee);

export default router;
