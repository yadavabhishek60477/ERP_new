import { Router } from 'express';
import {
  facultyLogin,
  updatedPassword,
  updateFaculty,
  createTest,
  getTest,
  getStudent,
  uploadMarks,
  markAttendance,
} from '../controllers/facultyController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/login', facultyLogin);
router.post('/updatepassword', auth, updatedPassword);
router.post('/updateprofile', auth, updateFaculty);
router.post('/createtest', auth, createTest);
router.post('/gettest', auth, getTest);
router.post('/getstudent', auth, getStudent);
router.post('/uploadmarks', auth, uploadMarks);
router.post('/markattendance', auth, markAttendance);

export default router;
