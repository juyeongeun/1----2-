import styles from './CreateForm.module.css';
import React, { useState } from 'react';
import CreateInput from './CreateInput.js';
import CreateBackground from './CreateBackground.js';
import CreatePassword from './CreatePassword.js';
import CreateFooter from './CreateFooter.js';
import backgroundGreen from '../../img/background_1.png';

import useInputValid from '../../hooks/useInputValid.js';

function CreateForm() {
  const [values, setValues] = useState({
    background: backgroundGreen,
  });
  const [showErrors, setShowErrors] = useState({
    name: false,
    studyName: false,
    content: false,
    password: false,
    passwordConfirm: false,
  });

  const { errors, isValid } = useInputValid(values);

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
        <CreateInput
          handleChange={handleChange}
          handleBlur={handleBlur}
          showErrors={showErrors}
          errors={errors}
          hasError={hasError}
        />
        <CreateBackground handleChange={handleChange} />
        <CreatePassword
          handleChange={handleChange}
          handleBlur={handleBlur}
          showErrors={showErrors}
          errors={errors}
          hasError={hasError}
        />
        <CreateFooter
          values={values}
          isValid={isValid}
          setShowErrors={setShowErrors}
        />
      </div>
    </>
  );
}

export default CreateForm;
