import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import SubmitData from '../../components/SubmitData/SubmitData';

const Content = () => {
  const formData = useSelector((state: AppState) => state.formData);
  return (
    <div>
      <h2>Content from forms</h2>
      <ul>
        {formData.map((card) => {
          return (
            <li key={card.submitId}>
              <SubmitData {...card} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Content;
