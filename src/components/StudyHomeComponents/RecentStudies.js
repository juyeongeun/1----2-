import styles from './RecentStudies.module.css';
import { useState, useEffect } from 'react';
import useRecentList from '../../hooks/useRecentList.js';
import RecentDataFetch from './RecentDataFetch.js';

function RecentStudies({ click }) {
  const [watched, setWatched] = useState([]);

  const { recent, deleteId } = useRecentList(watched);

  useEffect(() => {
    // 시작될 때 이미 삭제된 스터디가 있으면 에러가 발생해서 아이디가 있어야만 불러오기 가능
    const updateWatchedList = () => {
      let watchedList = JSON.parse(localStorage.getItem('watched')) || [];

      // 공백인지 숫자인지 체크하고 숫자면 watchedList에 추가
      watchedList = watchedList.filter((item) => typeof item === 'number');

      if (watchedList.length === 0) {
        localStorage.removeItem('watched');
      } else {
        localStorage.setItem('watched', JSON.stringify(watchedList));
      }

      setWatched(watchedList);
    };

    updateWatchedList();
  }, []);

  useEffect(() => {
    const updateWatchedList = () => {
      let watchedList = JSON.parse(localStorage.getItem('watched')) || [];

      // 삭제 아이디가 있을 경우 배열을 숫자로 변환한 후 삭제
      if (deleteId) {
        const numericId = parseInt(deleteId, 10);
        watchedList = watchedList.filter((id) => id !== numericId);
      }

      watchedList = watchedList.filter((item) => typeof item === 'number');

      //클릭 이벤트가 있을 경우 중복 배열 확인 후 중복된 데이터 삭제
      if (typeof click === 'number' && !watchedList.includes(click)) {
        watchedList.unshift(click);
        watchedList = Array.from(new Set(watchedList));

        if (watchedList.length > 3) {
          watchedList = watchedList.slice(0, 3);
        }
      }

      localStorage.setItem('watched', JSON.stringify(watchedList));
      setWatched(watchedList);
    };

    updateWatchedList();
  }, [click]);

  return (
    <>
      <div className={styles.background}>
        <p className={styles.text}>최근 조회한 스터디</p>
        <div className={styles.head}>
          {recent.length > 0 ? (
            <RecentDataFetch data={recent} />
          ) : (
            <p className={styles.nonStudy}>아직 조회한 스터디가 없어요</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RecentStudies;
