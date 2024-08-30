import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './ExploreStudiesHeader.module.css';
import { useRef } from 'react';
import Dropdown from './Dropdown.js';

function ExploreStudiesHeader({ onOrderChange, setKeyword, orderBy }) {
  const inputRef = useRef(null);

  const handleSearch = () => {
    const value = inputRef.current.value;
    setKeyword(value);
    setTimeout(() => {
      inputRef.current.value = '';
    }, 0);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <p className={styles.text}>스터디 둘러보기</p>
      <div className={styles.head}>
        <div className={styles.search}>
          <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
          <input
            name='search'
            ref={inputRef}
            onKeyDown={onKeyPress}
            placeholder='검색'
            className={styles.input}
          />
        </div>
        <div>
          <Dropdown
            onOrderChange={onOrderChange}
            className={styles.dropDown}
            orderBy={orderBy}
          />
        </div>
      </div>
    </>
  );
}

export default ExploreStudiesHeader;
