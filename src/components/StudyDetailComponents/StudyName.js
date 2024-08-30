import "./StudyName.css";
import { useNavigate } from "react-router-dom";
import React from "react";

function StudyName({ studyName, name, content, password, studyId }) {
  const nav = useNavigate();

  const handleButtonClick = (url, buttonText) => {
    if (buttonText === "오늘의 습관으로 가기") {
      nav(`${url}/${studyId}`);
    } else if (buttonText === "오늘의 집중으로 가기") {
      nav(`${url}/${studyId}`);
    }
  };

  return (
    <>
      <div className="studyName">
        <span>
          {name}의 {studyName}
        </span>
        <div className="todayBtnContainer">
          <button
            className="todayBtn"
            onClick={() => handleButtonClick("/habit", "오늘의 습관으로 가기")}
          >
            오늘의 습관 &nbsp;&gt;
          </button>
          <button
            className="todayBtn"
            onClick={() => handleButtonClick("/focus", "오늘의 집중으로 가기")}
          >
            오늘의 집중 &nbsp;&gt;
          </button>
        </div>
      </div>
      <div className="intro">소개</div>
      <div className="studyContent">{content}</div>
    </>
  );
}

export default StudyName;
