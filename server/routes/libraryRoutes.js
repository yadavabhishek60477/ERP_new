// routes/libraryRoutes.js
const express = require("express");
const { issueBook, returnBook } = require("../controllers/libraryController");

const router = express.Router();

router.post("/issue/:id", issueBook);
router.post("/return/:id", returnBook);

module.exports = router;
