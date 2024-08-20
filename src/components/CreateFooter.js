import styles from './CreateFooter.module.css';
import { createStudy } from '../api/Studyhome.js';
import makeBtn from '../img/make_btn.png';

import { useNavigate } from 'react-router-dom';

function CreateFooter({ values, isValid, setShowErrors }) {
  const navigate = useNavigate();

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
        navigate(`/studies/${id}`);
      } catch (error) {
        console.error('Failed to create study:', error);
      }
    } else {
      setShowErrors({
        name: true,
        studyName: true,
        content: true,
        password: true,
        passwordConfirm: true,
      });
    }
  };

  return (
    <>
      <div className={styles.footer}>
        <img className={styles.buttonImg} src={makeBtn} alt='만들기 버튼' />
        <button onClick={handleSubmit} className={styles.button} />
      </div>
    </>
  );
}

export default CreateFooter;
