import styles from './RecentStudies.module.css';
import { useState, useEffect } from 'react';
import useStudiesListId from '../../hooks/useStudiesListId.js';
import StudyDataFetch from './StudyDataFetch.js';

function RecentStudies({ click }) {
  const [watched, setWatched] = useState([]);

  const { recent } = useStudiesListId(watched);

  useEffect(() => {
    const watchedList = JSON.parse(localStorage.getItem('watched')) || [];
    setWatched(watchedList);
  }, []);

  useEffect(() => {
    if (typeof click === 'number') {
      let watchedList = JSON.parse(localStorage.getItem('watched')) || [];

      if (!watchedList.includes(click)) {
        watchedList.unshift(click);
        watchedList = Array.from(new Set(watchedList));

        if (watchedList.length > 3) {
          watchedList = watchedList.slice(0, 3);
        }

        localStorage.setItem('watched', JSON.stringify(watchedList));
        setWatched(watchedList);
      }
    }
  }, [click]);

  return (
    <>
      <div className={styles.background}>
        <p className={styles.text}>최근 조회한 스터디</p>
        <div className={styles.head}>
          {watched.length > 1 ? (
            <StudyDataFetch data={recent} />
          ) : (
            <p className={styles.nonStudy}>아직 조회한 스터디가 없어요</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RecentStudies;
