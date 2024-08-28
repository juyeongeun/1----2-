import StudyInfo from "./StudyInfo.js";
import StudyName from "./StudyName.js";
import StudyPoint from "./StudyPoint.js";
import StudyHabits from "./StudyHabits.js";
import useFetchStudy from "../../hooks/useFetchStudy.js";
import useFetchHabit from "../../hooks/useFetchHabit.js";
import useFetchCompleteHabit from "../../hooks/useFetchCompleteHabit.js";
import { useParams } from "react-router-dom";

function StudyDetailPage() {
  const { studyId } = useParams();

  // Study 데이터 가져오기
  const {
    studyName,
    name,
    content,
    point,
    password,
    deleteStudy,
    loading: studyLoading,
    error: studyError,
  } = useFetchStudy(studyId);

  // Habit 데이터 가져오기
  const {
    habits,
    loading: habitLoading,
    error: habitError,
  } = useFetchHabit(studyId);

  // CompleteHabit 데이터 가져오기
  const {
    completeHabits,
    loading: completeLoading,
    error: completeError,
  } = useFetchCompleteHabit(studyId);

  // 로딩 및 에러 상태 처리
  if (studyLoading || habitLoading || completeLoading) {
    return <div>Loading...</div>;
  }

  if (studyError || habitError || completeError) {
    return (
      <div className="error">{studyError || habitError || completeError}</div>
    );
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
      <StudyHabits
        habits={habits}
        completeHabits={completeHabits}
        studyId={studyId}
      />
    </>
  );
}

export default StudyDetailPage;
