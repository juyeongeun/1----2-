import styles from './RecentStudies.module.css';
import { useState, useEffect } from 'react';
import useRecentList from '../../hooks/useRecentList.js';
import RecentDataFetch from './RecentDataFetch.js';

function RecentStudies({ click, paramsReset }) {
  const [watched, setWatched] = useState([]);

  const { recent, deleteId } = useRecentList(watched);

  useEffect(() => {
    const updateWatchedList = () => {
      let watchedList = JSON.parse(localStorage.getItem('watched')) || [];

      watchedList = watchedList.filter((item) => typeof item === 'number');

      if (watchedList.length === 0) {
        localStorage.removeItem('watched');
      } else {
        localStorage.setItem('watched', JSON.stringify(watchedList));
      }

      setWatched(watchedList);
    };

    updateWatchedList();
  }, [paramsReset]);

  useEffect(() => {
    const updateWatchedList = () => {
      let watchedList = JSON.parse(localStorage.getItem('watched')) || [];

      if (deleteId.length !== 0) {
        const numericId = parseInt(deleteId, 10);
        watchedList = watchedList.filter((id) => id !== numericId);

        watchedList = watchedList.filter((item) => typeof item === 'number');

        localStorage.setItem('watched', JSON.stringify(watchedList));
        setWatched(watchedList);
      }

      if (typeof click === 'number' && !watchedList.includes(click)) {
        watchedList.unshift(click);
        watchedList = Array.from(new Set(watchedList));

        if (watchedList.length > 3) {
          watchedList = watchedList.slice(0, 3);
        }

        localStorage.setItem('watched', JSON.stringify(watchedList));
        setWatched(watchedList);
      }
    };
    updateWatchedList();
  }, [click, deleteId]);

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
