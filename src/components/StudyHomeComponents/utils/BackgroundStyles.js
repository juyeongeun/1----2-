import styles from '../StudyDataFetch.module.css';
import backgroundGreen from '../../../img/background/background_1.png';
import backgroundYe from '../../../img/background/background_2.png';
import backgroundBlu from '../../../img/background/background_3.png';
import backgroundPink from '../../../img/background/background_4.png';
// import backgroundTable from '../../img/background/background_5.png';
// import backgroundSun from '../../img/background/background_6.png';
// import backgroundRain from '../../img/background/background_7.png';
// import backgroundPlan from '../../img/background/background_8.png';

const styleMapping = {
  [backgroundGreen]: {
    nameColor: styles.nameGreen,
    studyNameColor: styles.studyNameBlack,
    pointColor: styles.pointBlack,
    contentColor: styles.contentBlack,
    createdColor: styles.dataBlack,
  },
  [backgroundYe]: {
    nameColor: styles.nameYellow,
    studyNameColor: styles.studyNameBlack,
    pointColor: styles.pointBlack,
    contentColor: styles.contentBlack,
    createdColor: styles.dataBlack,
  },
  [backgroundBlu]: {
    nameColor: styles.nameBlue,
    studyNameColor: styles.studyNameBlack,
    pointColor: styles.pointBlack,
    contentColor: styles.contentBlack,
    createdColor: styles.dataBlack,
  },
  [backgroundPink]: {
    nameColor: styles.namePink,
    studyNameColor: styles.studyNameBlack,
    pointColor: styles.pointBlack,
    contentColor: styles.contentBlack,
    createdColor: styles.dataBlack,
  },
  default: {
    nameColor: styles.nameWhite,
    studyNameColor: styles.studyNametext,
    pointColor: styles.pointWhite,
    contentColor: styles.contentWhite,
    createdColor: styles.dataWhite,
  },
};

export default styleMapping;
