// routes/libraryRoutes.js
import { Router } from 'express';
import { issueBook, returnBook } from '../controllers/libraryController.js';

const router = Router();

router.post('/issue/:id', issueBook);
router.post('/return/:id', returnBook);

export default router;
