import { useEffect, useCallback } from 'react';
import Results from '../../components/result-component/result-component';
import SearchInfo from '../../components/search-input/search-input';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './MainPage.scss';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store/store';
import { setHasError } from '../../redux/features/errorSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const hasError = useSelector((state: AppState) => state.error.hasError);

  const { id } = useParams();
  const navigate = useNavigate();

  const createError = () => {
    dispatch(setHasError());
  };

  const goHome = () => {
    if (id) {
      navigate('/beer');
    }
    return;
  };

  const getError = useCallback(() => {
    if (hasError) {
      throw new Error("It's error from click button");
    }
  }, [hasError]);

  useEffect(() => {
    getError();
  }, [getError]);

  return (
    <>
      <div className="main-page" role="mainPage">
        <div className={id ? 'result-with-details' : 'result'} onClick={goHome}>
          <SearchInfo />
          <PaginationComponent />
          <div>
            <Results />
          </div>
          <div className="error-block">
            <button className="error-block__button" onClick={createError}>
              Error
            </button>
          </div>
        </div>
        <div className={id ? 'result-details' : 'result-details-none'}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainPage;
