import styles from './Password.module.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

function Password() {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

  const handleChange = () => {
    if (type === 'password') {
      setType('text');
      setIcon(faEye);
    } else {
      setType('password');
      setIcon(faEyeSlash);
    }
  };

  return (
    <>
      <p className={styles.text}>비밀번호</p>
      <input
        type={type}
        className={styles.input}
        placeholder='비밀번호를 입력해 주세요'
      />
      <FontAwesomeIcon
        onClick={handleChange}
        className={styles.icon}
        icon={icon}
      />
      <p className={styles.text}>비밀번호 확인</p>
      <input
        type={type}
        className={styles.input}
        placeholder='비밀번호를 확인해 주새요'
      />
      <FontAwesomeIcon
        onClick={handleChange}
        className={styles.icon}
        icon={icon}
      />
    </>
  );
}

export default Password;
