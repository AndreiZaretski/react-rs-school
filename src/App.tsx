import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import CardPage from './pages/CardPage/CardPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path=":id" element={<CardPage />} />
          </Route>
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="404" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
