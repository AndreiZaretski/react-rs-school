import reactLogo from '../../assets/react.svg';
import '../loadingComponent/LoadingComponent.scss';
const LoadingComponent = () => {
  return (
    <div className="loading">
      <p>...Loading</p>
      <img src={reactLogo} className="logo" alt="React logo" />
    </div>
  );
};

export default LoadingComponent;
