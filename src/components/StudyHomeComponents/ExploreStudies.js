import styles from './ExploreStudies.module.css';
import { useState, useEffect } from 'react';
import Study from './StudyDataFetch.js';
import Dropdown from './Dropdown.js';
import useInputValid from '../../hooks/studyList.js';

import ExplotrStudiesHeader from './ExplotrStudiesHeader.js';
// import testData from './mock.js';

const LIMIT = 6;

function ExploreStudies({ setClick }) {
  const [orderBy, setOrderBy] = useState('recent');
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [totalCount, setTotalCOunt] = useState();

  const { data, total } = useInputValid({
    orderBy,
    offset,
    limit: LIMIT,
    keyword,
  });

  const handleOrderbyChange = (name) => {
    setOrderBy(name);
    setOffset(0);
    setKeyword('');
  };

  const handleLoad = () => {
    if (offset === 0) {
      setItems(data);
    } else {
      setItems([...items, ...data]);
    }
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
    setTotalCOunt(total - LIMIT - offset);
  };

  // 초기화 수정 예정
  // const handleHomeClick = () => {
  //   setOrderBy('recent');
  //   setOffset(0);
  //   setItems([]);
  //   setKeyword('');
  //   setLimit(6);
  //   setTotalCOunt(0);
  // };

  useEffect(() => {
    handleLoad({ orderBy, offset: 0, limit: LIMIT, keyword });
    setTotalCOunt(total - LIMIT - offset);
  }, [orderBy, offset, data, keyword]);

  useEffect(() => {
    if (keyword) {
      setOffset(0); // Reset offset when keyword changes
    }
  }, [keyword]);

  console.log(totalCount);
  return (
    <div className={styles.background}>
      <ExplotrStudiesHeader
        onOrderChange={handleOrderbyChange}
        setKeyword={setKeyword}
      />
      <div className={styles.studyList}>
        <Study data={items} setClick={setClick} />
        {!totalCount ||
          (totalCount === -6 && (
            <p className={styles.nonStudy}>둘러 볼 스터디가 없습니다</p>
          ))}
      </div>
      {totalCount > 0 ? (
        <button onClick={handleLoadMore} className={styles.button}>
          더보기
        </button>
      ) : (
        <div className={styles.nonButton} />
      )}
    </div>
  );
}

export default ExploreStudies;
