import styles from './StudyDataFetchId.module.css';
import { useNavigate } from 'react-router-dom';
import pointICon from '../../img/point_icon.png';

import useFetchEmoji from '../../hooks/useFetchEmoji.js';

import backgroundGreen from '../../img/background/background_1.png';
import backgroundYe from '../../img/background/background_2.png';
import backgroundBlu from '../../img/background/background_3.png';
import backgroundPink from '../../img/background/background_4.png';
// import backgroundTable from '../../img/background/background_5.png';
// import backgroundSun from '../../img/background/background_6.png';
// import backgroundRain from '../../img/background/background_7.png';
// import backgroundPlan from '../../img/background/background_8.png';

function ProductListItem({ item, setClick }) {
  const navigate = useNavigate();
  const today = new Date();
  const targetId = new Date(item.createdAt);

  const diffTime = today - targetId;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let studyNameColor;
  let pointColor;
  let createdColor;
  let contentColor;
  let nameColor;

  // 수정 예정
  if (item.background === backgroundGreen) {
    nameColor = styles.nameGrreen;
    studyNameColor = styles.studyNameBlack;
    pointColor = styles.pointBlack;
    contentColor = styles.contentBlack;
    createdColor = styles.dataBlack;
  } else if (item.background === backgroundYe) {
    nameColor = styles.nameYellow;
    studyNameColor = styles.studyNameBlack;
    pointColor = styles.pointBlack;
    contentColor = styles.contentBlack;
    createdColor = styles.dataBlack;
  } else if (item.background === backgroundBlu) {
    nameColor = styles.nameBlue;
    studyNameColor = styles.studyNameBlack;
    pointColor = styles.pointBlack;
    contentColor = styles.contentBlack;
    createdColor = styles.dataBlack;
  } else if (item.background === backgroundPink) {
    nameColor = styles.namePink;
    studyNameColor = styles.studyNameBlack;
    pointColor = styles.pointBlack;
    contentColor = styles.contentBlack;
    createdColor = styles.dataBlack;
  } else {
    nameColor = styles.nameWhite;
    studyNameColor = styles.studyNametext;
    pointColor = styles.pointWhite;
    createdColor = styles.dataWhite;
    contentColor = styles.contentWhite;
  }

  const { emojis } = useFetchEmoji(item.id);

  const handleClick = (id) => {
    if (typeof setClick === 'function') {
      setClick(id);
    }
    setTimeout(() => {
      navigate(`/study/${id}`);
    }, 0);
  };

  return (
    <div className={styles.ListItem}>
      <img
        className={styles.ItemImg}
        src={item.background}
        alt={item.background}
        onClick={() => handleClick(item.id)}
      />

      <div className={styles.realTest}>
        <span className={nameColor}>
          {item.name}
          <span className={studyNameColor}> 의 {item.studyName}</span>
        </span>
        <div className={styles.pointCon}>
          <img src={pointICon} alt='포인트 아이콘' className={styles.icon} />
          <p className={pointColor}>{item.point}P 획득 </p>
        </div>

        <p className={createdColor}>{diffDays}일째 진행 중</p>
        <div>
          <p className={contentColor}>{item.content}</p>
        </div>
        {emojis.length > 0 && (
          <div className={styles.emojis}>
            {emojis.slice(0, 3).map((item, id) => (
              <div key={id} className={styles.emojiItem}>
                {item.emoji}
                <span className={styles.emojiCount}>{item.count}</span>
              </div>
            ))}
            {emojis.length > 3 && (
              <div className={styles.emojiItem}>+ 1...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StudyDataFetchId({ data, setClick }) {
  return (
    <>
      <div className={styles.ListItems}>
        {data.map((item) => (
          <ProductListItem key={item.id} item={item} setClick={setClick} />
        ))}
      </div>
    </>
  );
}

export default StudyDataFetchId;
