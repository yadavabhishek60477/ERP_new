// client/src/components/student/FeeSubmissionForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed (npm install axios)

const FeeSubmissionForm = ({ studentId, onSubmitSuccess }) => { // studentId is passed as a prop, e.g., from Admin Dashboard
  const [amount, setAmount] = useState('');
  const [selectedFeeDueId, setSelectedFeeDueId] = useState(''); // State for selecting an outstanding fee
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [outstandingFees, setOutstandingFees] = useState([]); // State to store outstanding fees for selection

  // Effect to fetch outstanding fees for the selected student when component mounts or studentId changes
  useEffect(() => {
    const fetchOutstandingFees = async () => {
      if (!studentId) {
        setOutstandingFees([]); // Clear if no student is selected
        setSelectedFeeDueId('');
        setAmount('');
        return;
      }

      setLoading(true);
      setError("");
      setMessage("");
      try {
        // API call to get outstanding fees for a specific student
        // Assuming your backend route is GET /api/students/:id/fees/outstanding
        const res = await axios.get(`/api/students/${studentId}/fees/outstanding`);
        setOutstandingFees(res.data.outstandingFees);
        if (res.data.outstandingFees.length > 0) {
          // Auto-select the first outstanding fee and pre-fill amount if available
          setSelectedFeeDueId(res.data.outstandingFees[0]._id);
          setAmount(res.data.outstandingFees[0].balance.toFixed(2)); // Pre-fill with current balance
        } else {
          setSelectedFeeDueId('');
          setAmount('');
        }
      } catch (err) {
        console.error("Error fetching outstanding fees for manual form:", err);
        setError(err.response?.data?.error || "Failed to load outstanding fees for student.");
      } finally {
        setLoading(false);
      }
    };
    fetchOutstandingFees();
  }, [studentId]); // Re-run this effect whenever the studentId prop changes

  // Handles form submission for manual fee entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      if (isNaN(amount) || parseFloat(amount) <= 0) {
        setError("Please enter a valid positive amount.");
        setLoading(false);
        return;
      }
      if (!selectedFeeDueId) {
          setError("Please select an outstanding fee to record payment for.");
          setLoading(false);
          return;
      }

      // API call to record manual payment
      // Assuming your backend route is POST /api/students/:id/manual-fee-payment
      const res = await axios.post(`/api/students/${studentId}/manual-fee-payment`, {
        amount: parseFloat(amount), // Send amount as a number
        paymentMethod: paymentMethod,
        studentFeeDueId: selectedFeeDueId, // Send the ID of the outstanding fee being paid
      });

      setMessage(res.data.message || "Fee submitted successfully!");
      // Reset form fields after successful submission
      setAmount('');
      setPaymentMethod('Cash');
      setSelectedFeeDueId(''); // Clear selected fee
      setOutstandingFees([]); // Clear outstanding fees to re-fetch on next render if needed

      // Re-fetch outstanding fees to update the list on the form
      // This ensures the dropdown correctly shows remaining outstanding fees
      const updatedRes = await axios.get(`/api/students/${studentId}/fees/outstanding`);
      setOutstandingFees(updatedRes.data.outstandingFees);
      if (updatedRes.data.outstandingFees.length > 0) {
        setSelectedFeeDueId(updatedRes.data.outstandingFees[0]._id);
        setAmount(updatedRes.data.outstandingFees[0].balance.toFixed(2));
      }

      // Call the parent component's success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess(res.data.student, res.data.payment, res.data.updatedFeeDue);
      }
    } catch (err) {
      console.error("Error submitting manual fee from frontend:", err);
      // Display specific error message from backend if available, otherwise a generic one
      setError(err.response?.data?.error || "Failed to submit fee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handler for when the user selects a different outstanding fee
  const handleFeeDueSelection = (e) => {
    const id = e.target.value;
    setSelectedFeeDueId(id);
    const selected = outstandingFees.find(fee => fee._id === id);
    if (selected) {
      setAmount(selected.balance.toFixed(2)); // Pre-fill amount with the selected fee's balance
    } else {
      setAmount('');
    }
  };

  return (
    <div className="fee-submission-form-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '500px', margin: '20px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Record Manual Fee Payment</h2>
      {message && <p className="success-message" style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading && outstandingFees.length === 0 && <p style={{ textAlign: 'center' }}>Loading outstanding fees...</p>}

      {!loading && outstandingFees.length === 0 && !error && (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No outstanding fees for this student.</p>
      )}

      {!loading && outstandingFees.length > 0 && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="form-group">
            <label htmlFor="selectFeeDue" style={{ display: 'block', marginBottom: '5px' }}>Select Outstanding Fee:</label>
            <select
              id="selectFeeDue"
              value={selectedFeeDueId}
              onChange={handleFeeDueSelection}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">-- Select a fee --</option>
              {outstandingFees.map(fee => (
                <option key={fee._id} value={fee._id}>
                  {fee.feeStructure ? `${fee.feeStructure.name} - Balance: ₹${fee.balance.toFixed(2)}` : `Fee ID: ${fee._id} - Balance: ₹${fee.balance.toFixed(2)}`}
                  {fee.status === 'Partially Paid' ? ' (Partially Paid)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount" style={{ display: 'block', marginBottom: '5px' }}>Amount (₹):</label>
            <input
              id="amount"
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0.01" // Minimum positive value
              step="0.01" // Allow decimal amounts
              // Max amount should be the balance of the currently selected outstanding fee
              max={selectedFeeDueId ? outstandingFees.find(f => f._id === selectedFeeDueId)?.balance : ''}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod" style={{ display: 'block', marginBottom: '5px' }}>Payment Method:</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
            {loading ? 'Recording...' : 'Record Payment'}
          </button>
        </form>
      )}
    </div>
  );
};

export default FeeSubmissionForm;