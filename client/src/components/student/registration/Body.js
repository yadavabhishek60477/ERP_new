// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Avatar } from '@mui/material';
import axios from 'axios';

const Body = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/students/register', formData);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className='flex-[0.8] mt-3'>
      <div className='space-y-5'>
        <div className='flex items-center justify-between mr-8'>
          <div className='flex space-x-2 text-gray-400'>
            <AssignmentIndIcon />
            <h1>Student Registration</h1>
          </div>
        </div>
        <div className='w-[98%] bg-white relative rounded-xl shadow-md'>
          <div className='absolute left-[50%] top-[-10%] transform -translate-x-1/2'>
            <Avatar sx={{ width: 70, height: 70 }} />
          </div>
          <div className='overflow-y-scroll h-[27rem] pt-20 px-10'>
            {message && <p className='mb-4 text-center text-red-500 font-semibold'>{message}</p>}
            <form
              onSubmit={handleSubmit}
              className='flex flex-col space-y-6'
            >
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                required
                className='border px-4 py-2 rounded-md focus:outline-none focus:ring'
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
                className='border px-4 py-2 rounded-md focus:outline-none focus:ring'
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
                className='border px-4 py-2 rounded-md focus:outline-none focus:ring'
              />
              <input
                type='text'
                name='course'
                placeholder='Course'
                value={formData.course}
                onChange={handleChange}
                required
                className='border px-4 py-2 rounded-md focus:outline-none focus:ring'
              />
              <button
                type='submit'
                className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition'
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
