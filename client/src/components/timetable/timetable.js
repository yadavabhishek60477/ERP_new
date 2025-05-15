// components/TimeTableList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimeTableList = () => {
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    axios.get('/api/timetables')
      .then(res => setTimetables(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Time Table</h2>
      {timetables.map(tt => (
        <div key={tt._id}>
          <h3>{tt.course} - Semester {tt.semester} - {tt.day}</h3>
          <ul>
            {tt.periods.map((p, index) => (
              <li key={index}>{p.startTime}-{p.endTime}: {p.subject} ({p.faculty}, {p.room})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TimeTableList;
