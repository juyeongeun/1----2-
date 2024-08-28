import '../css/reset.css';
import Container from '../components/Layout/Container.js';
import StudyInfo from '../components/StudyDetailComponents/StudyInfo.js';
import StudyName from '../components/StudyDetailComponents/StudyName.js';
import StudyPoint from '../components/StudyDetailComponents/StudyPoint.js';
import StudyHabits from '../components//StudyDetailComponents/StudyHabits.js';
function StudyDetailPage() {
  return (
    <Container>
      <StudyInfo />
      <StudyName />
      <StudyPoint />
      <StudyHabits />
    </Container>
  );
}

export default StudyDetailPage;
