import styles from './ErrorValidation.module.scss';

interface ErrorProps {
  error: string | undefined;
}

const ErrorValidation = ({ error }: ErrorProps) => {
  return <div className={styles.errorValidate}>{error && <p>{error}</p>}</div>;
};

export default ErrorValidation;
