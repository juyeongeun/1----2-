import React from "react";
import { useParams } from "react-router-dom";
import useFetchStudy from "../../hooks/useFetchStudy.js";
import "./StudyPoint.css";

function StudyPoint() {
  const { studyId } = useParams();
  const { point, loading, error } = useFetchStudy(studyId);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pointContainer">
      <div className="pointText">현재까지 획득한 포인트</div>
      <button className="point">{point}P 획득</button>
    </div>
  );
}

export default StudyPoint;
