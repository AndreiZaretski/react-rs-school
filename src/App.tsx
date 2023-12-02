import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import UncontrolledForm from './pages/UncontrolledForm/UncontrolledForm';
import ControlledForm from './pages/ControlledForm/ControlledForm';
import Content from './pages/Content/Content';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <>
      <>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route path="content" element={<Content />} />
                <Route path="uncontrolled" element={<UncontrolledForm />} />
                <Route path="controlled" element={<ControlledForm />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </>
    </>
  );
}

export default App;
