import styles from './ExploreStudies.module.css';
import { useState, useEffect, useCallback } from 'react';
import Study from './StudyDataFetch.js';
import useInputValid from '../../hooks/studyList.js';
import ExploreStudiesHeader from './ExploreStudiesHeader.js';

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

  const handleLoad = useCallback(() => {
    setItems((prevItems) => {
      if (offset === 0) {
        return data;
      } else {
        const mergedItems = [...prevItems, ...data];

        const uniqueItems = Array.from(
          new Map(mergedItems.map((item) => [item.id, item])).values()
        );

        return uniqueItems;
      }
    });
  }, [data, offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
    setTotalCOunt(total - offset - LIMIT);
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
    handleLoad();
    setTotalCOunt(total - offset - LIMIT);
  }, [handleLoad, total, offset]);

  useEffect(() => {
    if (keyword) {
      console.log(keyword);
      setOffset(0);
    }
  }, [keyword]);

  return (
    <div className={styles.background}>
      <ExploreStudiesHeader
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
