import styles from './RegistrationForm.module.css';
import React, { useState } from 'react';
import Input from './Input.js';
import Background from './Background.js';
import Password from './Password.js';
import makeBtn from '../img/make_btn.png';
import useInputValid from '../hooks/SignupValidation.js';

function RegistrationForm() {
  const [values, setValues] = useState({
    background: 'backgroundGreen',
  });
  const [showErrors, setShowErrors] = useState({
    name: false,
    studyName: false,
    content: false,
    password: false,
    passwordConfirm: false,
  });

  const { errors, isValid, validate } = useInputValid(values);

  const handleChange = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setShowErrors({ ...showErrors, [name]: true });
  };

  const hasError = (name) => {
    return showErrors[name] && errors[name];
  };

  return (
    <>
      <div className={styles.background}>
        <p className={styles.header}>스터디 만들기</p>
        <Input
          handleChange={handleChange}
          handleBlur={handleBlur}
          showErrors={showErrors}
          errors={errors}
          hasError={hasError}
        />
        <Background handleChange={handleChange} />
        <Password
          handleChange={handleChange}
          handleBlur={handleBlur}
          showErrors={showErrors}
          errors={errors}
          hasError={hasError}
        />
        <div className={styles.footer}>
          <img className={styles.buttonImg} src={makeBtn} alt='만들기 버튼' />
          <button className={styles.button} />
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
