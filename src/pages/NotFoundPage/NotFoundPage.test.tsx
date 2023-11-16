import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  // ,  Route, Routes
} from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import MainPage from '../MainPage/MainPage';

describe('<NotFoundPage />', () => {
  it('Should be defined', () => {
    expect(<NotFoundPage />).toBeDefined();
  });

  // it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
  //   render(
  //     <MemoryRouter initialEntries={['/foo']} initialIndex={0}>
  //       <Routes>
  //         <Route path="/beer" element={<MainPage />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByText('Page not found')).toBeInTheDocument();
  //   expect(screen.getByText('Back')).toBeInTheDocument();
  // });

  it('Should be navigate a the beer page after click', async () => {
    render(
      <MemoryRouter initialEntries={['/foo']}>
        <NotFoundPage />
      </MemoryRouter>
    );

    const buttonBack = screen.getByRole('back');
    fireEvent.click(buttonBack);

    const notFountPage = await screen.findByText('Page not found');

    waitFor(() => {
      expect(notFountPage).not.toBeInTheDocument();
    });
  });
});
