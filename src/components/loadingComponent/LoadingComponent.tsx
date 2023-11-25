import styles from '../loadingComponent/LoadingComponent.module.scss';

const LoadingComponent = () => {
  return (
    <div className={styles.loading}>
      <p>...Loading</p>
    </div>
  );
};

export default LoadingComponent;
