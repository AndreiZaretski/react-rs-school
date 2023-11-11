import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/beer');
  };
  return (
    <div>
      Page not found
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default NotFoundPage;
