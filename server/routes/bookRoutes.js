// routes/bookRoutes.js
import { Router } from 'express';
import { getAllBooks, addBook, deleteBook, updateBook } from '../controllers/bookController.js';

const router = Router();

router.get('/', getAllBooks);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
