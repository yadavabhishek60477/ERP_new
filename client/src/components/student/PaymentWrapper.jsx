import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const PaymentUI = ({ studentName = 'Abhi', amount = 50000, status = 'unpaid' }) => {
  const isPaid = status === 'paid';

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white shadow-xl rounded-2xl w-full max-w-md p-6'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Fee Payment</h1>
          <p className='text-sm text-gray-500'>Student: {studentName}</p>
        </div>

        <div className='text-center mb-6'>
          <p className='text-xl font-semibold text-gray-700'>Amount: ₹{amount}</p>
          <div className='mt-4 flex justify-center items-center gap-2'>
            {isPaid ? (
              <>
                <CheckCircleIcon className='h-6 w-6 text-green-600' />
                <span className='text-green-600 font-medium'>Payment Completed</span>
              </>
            ) : (
              <>
                <ExclamationCircleIcon className='h-6 w-6 text-red-500' />
                <span className='text-red-500 font-medium'>Payment Pending</span>
              </>
            )}
          </div>
        </div>

        {!isPaid && (
          <button
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200'
            onClick={() => alert('Redirecting to Razorpay...')}
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentUI;
