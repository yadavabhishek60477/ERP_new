// src/components/FeeSubmissionForm.jsx
import React, { useState } from "react";
import axios from "axios";

const FeeSubmissionForm = ({ studentId }) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/students/${studentId}/submit-fee`, { amount });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Submit Fee</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Submit Fee</button>
      </form>
    </div>
  );
};

export default FeeSubmissionForm;
