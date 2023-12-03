import { Outlet } from 'react-router-dom';
import Nav from '../../components/nav/Nav';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <>
      <main className={styles.main}>
        <Nav />
        <div className={styles.outlet}>
          <Outlet></Outlet>
        </div>
      </main>
    </>
  );
};

export default Main;
