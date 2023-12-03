import { FormPrintModel } from '../../model/formModel';
import styles from './SubmitData.module.scss';

const SubmitData = (props: FormPrintModel) => {
  const { picture } = props;
  const entries = Object.entries(props);
  return (
    <>
      <div className={styles.card}>
        <h3>Card from form</h3>
        {entries.map(([key, value]) => {
          if (key !== 'picture' && key !== 'submitId') {
            return (
              <p key={key}>
                {key.toUpperCase()}: <b>{value.toString()}</b>
              </p>
            );
          }
        })}
        <div className={styles.picture}>
          {typeof picture === 'string' ? (
            <img src={picture} alt="Picture from form" />
          ) : (
            <span>Not picture</span>
          )}
        </div>
      </div>
    </>
  );
};

export default SubmitData;
