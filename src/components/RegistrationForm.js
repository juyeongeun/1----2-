import styles from './RegistrationForm.module.css';
import Input from './Input.js';
import Background from './Background.js';
import Password from './Password.js';
import makeBtn from '../img/make_btn.png';

function RegistrationForm() {
  return (
    <>
      <div className={styles.background}>
        <p className={styles.header}>스터디 만들기</p>
        <Input />
        <Background />
        <Password />
        <div className={styles.footer}>
          <img className={styles.buttonImg} src={makeBtn} alt='만들기 버튼' />
          <button className={styles.button} />
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
