import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NotFoundPage = () => {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const goBack = () => {
    console.log('click');
    navigate(-1);
  };
  useEffect(() => {
    setSearchParams('');
  }, [setSearchParams]);
  return (
    <div>
      Page not found
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default NotFoundPage;
