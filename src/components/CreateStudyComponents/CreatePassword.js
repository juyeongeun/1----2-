import styles from './CreatePassword.module.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

function Password({ handleChange, showErrors, handleBlur, errors, hasError }) {
  const [type, setType] = useState('password');
  const [typeConfirm, setTypeConfirm] = useState('password');
  const [showPassword, setShowPassword] = useState(faEyeSlash);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(faEyeSlash);

  const handleTypeChange = () => {
    if (type === 'password') {
      setType('text');
      setShowPassword(faEye);
    } else {
      setType('password');
      setShowPassword(faEyeSlash);
    }
  };

  const handleTypeConfirmChange = () => {
    if (typeConfirm === 'password') {
      setTypeConfirm('text');
      setShowPasswordConfirm(faEye);
    } else {
      setTypeConfirm('password');
      setShowPasswordConfirm(faEyeSlash);
    }
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  return (
    <>
      <p className={styles.text}>비밀번호</p>
      <div className={styles.container}>
        <input
          name='password'
          type={type}
          onChange={handleInputValue}
          onBlur={handleBlur}
          className={hasError('password') ? styles.inputError : styles.input}
          placeholder='비밀번호를 입력해 주세요'
        />
        <FontAwesomeIcon
          onClick={handleTypeChange}
          className={styles.icon}
          icon={showPassword}
        />
      </div>
      {showErrors.password && (
        <p className={styles.errorMsg}>{errors.password}</p>
      )}
      <p className={styles.text}>비밀번호 확인</p>
      <div className={styles.container}>
        <input
          name='passwordConfirm'
          type={typeConfirm}
          onBlur={handleBlur}
          className={
            hasError('passwordConfirm') ? styles.inputError : styles.input
          }
          onChange={handleInputValue}
          placeholder='비밀번호를 확인해 주새요'
        />
        <FontAwesomeIcon
          onClick={handleTypeConfirmChange}
          className={styles.icon}
          icon={showPasswordConfirm}
        />
      </div>
      {showErrors.passwordConfirm && (
        <p className={styles.errorMsg}>{errors.passwordConfirm}</p>
      )}
    </>
  );
}

export default Password;
