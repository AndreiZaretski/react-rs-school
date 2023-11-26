import { useRouter } from 'next/router';
import React from 'react';
import styles from './404.module.scss';

const NotFoundPage = () => {
  const router = useRouter();

  const goBack = () => {
    router.push('/beer');
  };
  return (
    <div className={styles.not_found}>
      Page not found
      <button onClick={goBack} role="back">
        Back
      </button>
    </div>
  );
};

export default NotFoundPage;
