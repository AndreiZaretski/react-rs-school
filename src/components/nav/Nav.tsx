import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';

export const Nav = () => {
  return (
    <>
      <nav className={styles.nav}>
        <Link to={`/content`}>Main</Link>
        <Link to={`/uncontrolled`}>Uncontrolled form</Link>
        <Link to={`/controlled`}>Controlled form</Link>
      </nav>
    </>
  );
};

export default Nav;
