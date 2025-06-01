// PaymentWrapper.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import OnlineFeePayment from './onlinefeePayment';

const PaymentWrapper = () => {
  const location = useLocation();
  const studentId = location.state?.studentId;

  return studentId ? (
    <OnlineFeePayment
      studentId={studentId}
      onPaymentSuccess={() => {
        // You can navigate to dashboard or show success here
        alert('Payment Successful! 🎉');
      }}
    />
  ) : (
    <p style={{ textAlign: 'center', color: 'red' }}>
      Student ID missing. Please go through registration again.
    </p>
  );
};

export default PaymentWrapper;
