import styles from './DropDown.module.css';
import { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function DropDown({ onOrderChange, orderBy }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [text, setText] = useState('최신 순');

  const dropDownRef = useRef(null);

  const showDropDownClick = () => {
    setShowDropDown((prev) => !prev);
  };

  const handleSortChange = (orderBy) => {
    onOrderChange(orderBy);
    setShowDropDown(false);
  };

  useEffect(() => {
    switch (orderBy) {
      case 'recent':
        setText('최신 순');
        break;
      case 'old':
        setText('오래된 순');
        break;
      case 'highestPoints':
        setText('많은 포인트 순');
        break;
      case 'lowestPoints':
        setText('적은 포인트 순');
        break;
      default:
        setText('최신 순');
    }
    setShowDropDown(false);
  }, [orderBy]);

  const handleEvent = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropDown &&
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropDown]);

  return (
    <>
      <div className={styles.background} onClick={showDropDownClick}>
        <p className={styles.dropDown}>{text}</p>
        <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
      </div>
      {showDropDown && (
        <div
          className={styles.dropdownBackground}
          onClick={handleEvent}
          ref={dropDownRef}
        >
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
            className={styles.lowestPointsText}
          >
            적은 포인트 순
          </p>
        </div>
      )}
    </>
  );
}

export default DropDown;
