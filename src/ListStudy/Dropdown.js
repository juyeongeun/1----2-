import axios from 'axios';
import styles from './Dropdown.module.css';
import { useState, useEffect } from 'react';
import Study from './Study.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function Dropdown({ onOrderChange }) {
  const [click, SetClick] = useState(false);

  const Click = () => {
    SetClick((prev) => !prev);
  };

  const handleSortChange = (orderBy) => {
    onOrderChange(orderBy);
    console.log(orderBy);
  };

  return (
    <>
      <div className={styles.background} onClick={Click}>
        <p className={styles.dropDown}>최근 순</p>
        <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
      </div>
      {click && (
        <div className={styles.dropdownBackground} onClick={Click}>
          <p onClick={() => handleSortChange('recent')} className={styles.text}>
            최근 순
          </p>
          <p onClick={() => handleSortChange('old')} className={styles.text}>
            오래된 순
          </p>
          <p
            onClick={() => handleSortChange('highestPoints')}
            className={styles.text}
          >
            많은 포인트 순
          </p>
          <p
            onClick={() => handleSortChange('lowestPoints')}
            className={styles.text}
          >
            적은 포인트 순
          </p>
        </div>
      )}
    </>
  );
}

export default Dropdown;
