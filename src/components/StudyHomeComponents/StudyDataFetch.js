import styles from './StudyDataFetch.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import pointICon from '../../img/point_icon.png';

import backgroundGreen from '../../img/background_1.png';
import backgroundYe from '../../img/background_2.png';
import backgroundBlu from '../../img/background_3.png';
import backgroundPink from '../../img/background_4.png';
// import backgroundTable from '../../img/background_5.png';
// import backgroundSun from '../../img/background_6.png';
// import backgroundRain from '../../img/background_7.png';
// import backgroundPlan from '../../img/background_8.png';

function ProductListItem({ item, setClick }) {
  const [clickedId, setClickedId] = useState();
  const navigate = useNavigate();
  const today = new Date();
  const targetId = new Date(item.createdAt);

  const diffTime = today - targetId;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let studyNameColor;
  let pointColor;
  let createdColor;
  let conntentColor;
  let nameColor;

  if (item.background === backgroundGreen) {
    nameColor = styles.nameGrreen;
    studyNameColor = styles.studyNameBlack;
    pointColor = styles.pointBlack;
    conntentColor = styles.contentBlack;
    createdColor = styles.dataBlack;
  } else if (item.background === backgroundYe) {
    nameColor = styles.nameYellow;
    studyNameColor = styles.studyNameBlack;
    pointColor = styles.pointBlack;
    conntentColor = styles.contentBlack;
    createdColor = styles.dataBlack;
  } else if (item.background === backgroundBlu) {
    nameColor = styles.nameBlue;
    studyNameColor = styles.studyNameBlack;
    pointColor = styles.pointBlack;
    conntentColor = styles.contentBlack;
    createdColor = styles.dataBlack;
  } else if (item.background === backgroundPink) {
    nameColor = styles.namePink;
    studyNameColor = styles.studyNameBlack;
    pointColor = styles.pointBlack;
    conntentColor = styles.contentBlack;
    createdColor = styles.dataBlack;
  } else {
    nameColor = styles.nameWhite;
    studyNameColor = styles.studyNametext;
    pointColor = styles.pointWhite;
    createdColor = styles.dataWhite;
    conntentColor = styles.contentWhite;
  }

  const handleClick = (id) => {
    setClickedId(id);
    setClick(id);

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
        <p className={nameColor}>{item.name} </p>
        <p className={studyNameColor}> 의 {item.studyName}</p>
        <div className={styles.pointCon}>
          <img src={pointICon} alt='포인트 아이콘' className={styles.icon} />
          <p className={pointColor}>{item.point}P 획득 </p>
        </div>

        <p className={createdColor}>{diffDays}일째 진행 중</p>
        <div className={styles.test}>
          <p className={conntentColor}>{item.content}</p>
        </div>
        <p className={styles.reaction}>{item.reaction}</p>

        {/* <div className={styles.productListFavorite}></div> */}
      </div>
    </div>
  );
}

// const newStudy = {
//   name: 'New Study Name',
//   studyName: 'Unique Study Name',
//   content: 'Study content here',
//   background: 'GREEN',
//   password: 'securepassword',
// };

function Study({ data, setClick }) {
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

export default Study;
