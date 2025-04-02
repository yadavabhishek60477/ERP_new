// src/components/IssueBook.js
import React, { useState } from "react";
import { issueBook } from "../api";

const IssueBook = () => {
  const [bookId, setBookId] = useState("");
  const userId = "USER_ID_HERE"; // Replace with actual user ID

  const handleIssue = async () => {
    try {
      await issueBook(bookId, userId);
      alert("Book issued successfully!");
    } catch (error) {
      alert("Error issuing book.");
    }
  };

  return (
    <div>
      <h2>Issue a Book</h2>
      <input type="text" placeholder="Enter Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} />
      <button onClick={handleIssue}>Issue</button>
    </div>
  );
};

export default IssueBook;
