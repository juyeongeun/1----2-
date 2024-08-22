import styles from './ExploreStudies.module.css';
import { useState, useEffect } from 'react';
import Study from './Study.js';
import Dropdown from './Dropdown.js';
import useInputValid from '../hooks/studyList.js';

import ExplotrStudiesHeader from './ExplotrStudiesHeader.js';
// import testData from './mock.js';
const LIMIT = 6;

function ExploreStudies({ setClick }) {
  const [orderBy, setOrderBy] = useState('recent');
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState('');

  // const [params, setParams] = useState({
  //   orderBy: 'recent',
  //   offset: 0,
  //   keyword: '',
  //   limit: LIMIT
  // });

  // 커스텀 훅을 사용하여 데이터 가져오기

  // useEffect(() => {
  //   setItems(testData);
  // }, []);

  const { data, loading, error } = useInputValid({
    orderBy,
    offset,
    limit: LIMIT,
    keyword,
  });

  const handleOrderbyChange = (name) => {
    setOrderBy(name);
    setOffset(0);
  };

  const handleLoad = () => {
    if (offset === 0) {
      setItems(data);
    } else {
      setItems([...items, ...data]);
    }
    // setOffset(offset + LIMIT);
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
  };

  useEffect(() => {
    handleLoad({ orderBy, offset: 0, limit: LIMIT });
  }, [orderBy]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.background}>
      <ExplotrStudiesHeader
        onOrderChange={handleOrderbyChange}
        setKeyword={setKeyword}
      />

      <div className={styles.studyList}>
        <Study data={items} setClick={setClick} />
      </div>
      <button onClick={handleLoadMore} className={styles.button}>
        더보기
      </button>
      {/* <button className={styles.button}>더보기</button> */}
      {/* 
      <p className='noneHabit'>
        아직 습관이 없어요
        <br />
        오늘의 습관에서 습관을 생성해보세요
      </p> */}
    </div>
  );
}

export default ExploreStudies;
