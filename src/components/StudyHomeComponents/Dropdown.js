import styles from './Dropdown.module.css';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function Dropdown({ onOrderChange }) {
  const [click, SetClick] = useState(false);
  const [text, setText] = useState('최신 순');

  const Click = () => {
    SetClick((prev) => !prev);
  };

  const handleSortChange = (orderBy) => {
    onOrderChange(orderBy);
    if (orderBy === 'recent') {
      setText('최신 순');
    } else if (orderBy === 'old') {
      setText('오래된 순');
    } else if (orderBy === 'highestPoints') {
      setText('많은 포인트 순');
    } else if (orderBy === 'lowestPoints') {
      setText('적은 포인트 순');
    }
  };

  return (
    <>
      <div className={styles.background} onClick={Click}>
        <p className={styles.dropDown}>{text}</p>
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
