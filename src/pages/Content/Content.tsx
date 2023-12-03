import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import SubmitData from '../../components/SubmitData/SubmitData';
import styles from './Content.module.scss';

const Content = () => {
  const formData = useSelector((state: AppState) => state.formData);
  return (
    <div>
      <h2>Content from forms</h2>
      <ul>
        {formData.map((card) => {
          return (
            <li key={card.submitId} className={styles.item}>
              <SubmitData {...card} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Content;
