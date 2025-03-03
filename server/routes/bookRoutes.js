// routes/bookRoutes.js
const express = require("express");
const { getAllBooks, addBook, deleteBook, updateBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
