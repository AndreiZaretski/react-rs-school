import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import CardPage from './pages/CardPage/CardPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import React from 'react';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="beer" />}
              errorElement={<NotFoundPage />}
            />
            <Route
              path="/beer"
              element={<MainPage />}
              errorElement={<NotFoundPage />}
            >
              <Route
                path=":id"
                element={<CardPage />}
                errorElement={<NotFoundPage />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
