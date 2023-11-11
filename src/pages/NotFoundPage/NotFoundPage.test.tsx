import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('Test Not Found Page', () => {
  it('Should be defined', () => {
    expect(<NotFoundPage />).toBeDefined();
  });

  it('it renders the not found page', () => {
    render(
      <MemoryRouter initialEntries={['/foo']}>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('Should be navigate a the beer page after click', () => {});
});
