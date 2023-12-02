import { Outlet } from 'react-router-dom';
import Nav from '../../components/nav/Nav';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <>
      <main className={styles.main}>
        <Nav />
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Main;
