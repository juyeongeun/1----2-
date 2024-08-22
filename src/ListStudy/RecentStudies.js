import styles from './RecentStudies.module.css';
import { useState, useEffect } from 'react';
import { getStudiesListId } from '../api/Studyhome.js';
import Study from './Study.js';

function RecentStudies({ click }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 상품 클릭 이벤트 핸들러
  function onProductClick(click) {
    const recentViews = JSON.parse(localStorage.getItem('recentViews')) || [];

    // 기존 목록에서 해당 상품 제거
    const filteredViews = recentViews.filter((id) => id !== click);

    // 새로운 상품 ID 추가
    filteredViews.unshift(click);

    // 최근 본 상품 목록을 로컬스토리지에 저장
    localStorage.setItem(
      'recentViews',
      JSON.stringify(filteredViews.slice(0, 3))
    ); // 최근 10개 상품만 저장
  }

  useEffect(() => {
    onProductClick(click);
    const { data } = getStudiesListId(click);
  }, [click]);

  useEffect(() => {
    // 비동기 데이터 가져오기
    async function fetchData() {
      try {
        const result = await getStudiesListId(click); // click을 매개변수로 전달
        setData(result); // 데이터가 result.data 안에 있다고 가정
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch studies:', error);
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [click]); // click이 변경될 때마다 데이터 새로 가져오기

  return (
    <>
      <div className={styles.background}>
        <p className={styles.text}>최근 조회한 스터디</p>
        <div className={styles.head}>
          <p>Product ID {click} has been clicked and added to recent views.</p>
          {click ? <Study data={data} /> : <p>??</p>}
        </div>
      </div>
    </>
  );
}

export default RecentStudies;
