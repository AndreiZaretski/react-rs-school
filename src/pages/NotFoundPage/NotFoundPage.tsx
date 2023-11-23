import { useNavigate } from 'react-router-dom';
import React from 'react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/beer');
  };
  return (
    <div>
      Page not found
      <button onClick={goBack} role="back">
        Back
      </button>
    </div>
  );
};

export default NotFoundPage;
