import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [course, setCourse] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/quiz?course=${course}`);
  };

  return (
    <div>
      <h1>Select a Course</h1>
      <select onChange={e => setCourse(e.target.value)} value={course}>
        <option value="">Select course</option>
        <option value="01_a">Course 01_A</option>
        <option value="01_b">Course 01_B</option>
      </select>
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
}

export default Home;
