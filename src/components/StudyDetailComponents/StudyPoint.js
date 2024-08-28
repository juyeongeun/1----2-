import React from "react";
import "./StudyPoint.css";

function StudyPoint({ point, studyId }) {
  return (
    <div className="pointContainer">
      <div className="pointText">현재까지 획득한 포인트</div>
      <button className="point">{point}P 획득</button>
    </div>
  );
}

export default StudyPoint;
