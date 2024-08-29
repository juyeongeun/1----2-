import styles from './RecentDataFetch.module.css';
import { useNavigate } from 'react-router-dom';
import pointICon from '../../img/point_icon.png';
import RecentBackground from './backgrounds/RecentBackground.js';

function ProductListItem({ item, setClick }) {
  const navigate = useNavigate();
  const today = new Date();
  const targetId = new Date(item.createdAt);

  const diffTime = today - targetId;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const { nameColor, studyNameColor, pointColor, contentColor, createdColor } =
    RecentBackground[item.background] || RecentBackground.default;

  const hiddenEmojiCount = item.reaction.length - 3;

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
        {item.reaction.length > 0 && (
          <div className={styles.emojis}>
            {item.reaction.slice(0, 3).map((item, id) => (
              <div key={id} className={styles.emojiItem}>
                <div className={styles.emoji}>{item.emoji}</div>
                <span className={styles.emojiCount}>{item.count}</span>
              </div>
            ))}
            {item.reaction.length > 3 && (
              <div className={styles.emojiItemAdd}>+ {hiddenEmojiCount}</div>
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
