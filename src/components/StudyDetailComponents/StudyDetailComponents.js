import StudyInfo from "./StudyInfo.js";
import StudyName from "./StudyName.js";
import StudyPoint from "./StudyPoint.js";
import StudyHabits from "./StudyHabits.js";
import useFetchStudy from "../../hooks/useFetchStudy.js";
import { useParams } from "react-router-dom";

function StudyDetailPage() {
  const { studyId } = useParams();
  const {
    studyName,
    name,
    content,
    point,
    password,
    deleteStudy,
    loading,
    error,
  } = useFetchStudy(studyId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <StudyInfo
        studyName={studyName}
        name={name}
        password={password}
        deleteStudy={deleteStudy}
        studyId={studyId}
      />
      <StudyName
        studyName={studyName}
        name={name}
        password={password}
        content={content}
        studyId={studyId}
      />
      <StudyPoint point={point} studyId={studyId} />
      <StudyHabits />
    </>
  );
}

export default StudyDetailPage;
