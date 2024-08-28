import styles from './CreateFooter.module.css';
import useFetchStudy from '../../hooks/useFetchStudy.js';
import { useNavigate } from 'react-router-dom';

function CreateFooter({ values, isValid, submit }) {
  const navigate = useNavigate();
  const { createStudy, error } = useFetchStudy(); // 변경된 훅 사용

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudy = {
      name: values.name,
      studyName: values.studyName,
      content: values.content,
      background: values.background,
      password: values.password,
    };

    if (isValid) {
      try {
        const response = await createStudy(newStudy);
        const { id } = response;
        navigate(`/study/${id}`);
      } catch (error) {
        console.error('Failed to create study:', error);
      }
    }
  };

  return (
    <div className={styles.footer}>
      <button
        onClick={handleSubmit}
        className={!submit ? styles.errorButton : styles.button}
        disabled={!submit}
      >
        만들기
      </button>
      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
}

export default CreateFooter;
