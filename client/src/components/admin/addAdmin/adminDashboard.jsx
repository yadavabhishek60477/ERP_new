
// client/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import FeeSubmissionForm from '../components/student/FeeSubmissionForm'; // Import the manual fee form
import axios from 'axios'; // For fetching student list
// import { AuthContext } from '../contexts/AuthContext'; // If you have an AuthContext for admin

const AdminDashboard = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(''); // Admin selects which student to submit fee for
  const [students, setStudents] = useState([]); // List of all students for admin to choose from
  const [message, setMessage] = useState(''); // For admin messages
  const [error, setError] = useState(''); // For admin errors

  // Fetch all students when the Admin Dashboard loads
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Assuming you have an API route to get all students, e.g., /api/students
        // This route should be protected by admin authentication
        const res = await axios.get('/api/students');
        setStudents(res.data.students); // Assuming the response contains an array of students
      } catch (err) {
        console.error("Error fetching students for admin dashboard:", err);
        setError(err.response?.data?.error || "Failed to load students list.");
      }
    };
    fetchStudents();
  }, []); // Runs only once on mount

  // Callback function for when a manual fee submission is successful
  const handleManualSubmissionSuccess = (updatedStudent, payment, updatedFeeDue) => {
    setMessage(Successfully recorded payment for ${updatedStudent.name}.);
    setError(''); // Clear any previous error
    console.log("Manual payment recorded successfully:", { payment, updatedStudent, updatedFeeDue });
    // You could also refresh the entire student list if needed, or update specific student's data
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Admin Dashboard</h1>
      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Admin UI to select a student for manual fee entry */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3 style={{ marginBottom: '15px' }}>Select Student for Manual Fee Entry:</h3>
        <div className="form-group">
          <label htmlFor="selectStudent" style={{ display: 'block', marginBottom: '5px' }}>Student:</label>
          <select
            id="selectStudent"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">-- Select a Student --</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Render the FeeSubmissionForm only if a student is selected */}
      {selectedStudentId && (
        <FeeSubmissionForm
          studentId={selectedStudentId}
          onSubmitSuccess={handleManualSubmissionSuccess}
        />
      )}

      {/* Other admin dashboard elements can go here */}
      <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h3>Other Admin Tools:</h3>
        <p>Manage courses, faculty, view reports, etc.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;