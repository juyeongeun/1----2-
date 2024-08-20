import "../css/reset.css";
import Container from "../components/Container.js";
import StudyInfo from "../StudyDetailComponents/StudyInfo.js";
import StudyName from "../StudyDetailComponents/StudyName.js";
import StudyPoint from "../StudyDetailComponents/StudyPoint.js";
import StudyHabits from "../StudyDetailComponents/StudyHabits.js";
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
