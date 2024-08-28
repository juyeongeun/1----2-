import React, { useState, useEffect } from "react";
import "./HabitStudyComponents.css"; // CSS 파일을 import합니다.
import TodoList from "./TodoList.js"; // TodoList 컴포넌트를 import합니다.
import useFetchStudy from "../../hooks/useFetchStudy.js";
import { useNavigate, useParams } from "react-router-dom";
import TodayFocusButtonImage from "../../img/today-focus-btn.png";
import HomeButtonImage from "../../img/home-btn.png";

function HabitStudyComponents() {
  const { studyId } = useParams();
  const { studyName, name, loading, error } = useFetchStudy(studyId);
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "오후" : "오전";
      const formattedHours = hours % 12 || 12;

      return `${year}-${month}-${day} ${ampm} ${formattedHours}:${minutes}`;
    };

    setCurrentTime(formatTime());

    const timerId = setInterval(() => {
      setCurrentTime(formatTime());
    }, 60000);

    return () => clearInterval(timerId);
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="middle-container">
      <div className="both-sides">
        <div className="left-side">
          <div className="main-title">
            {name}의 {studyName}
          </div>
        </div>
        <div className="right-side">
          <button /*오늘의 집중 버튼*/
            className="menu"
            onClick={() => navigate(`/focus/${studyId}`)}
            aria-label="오늘의 집중"
          >
            <img
              src={TodayFocusButtonImage}
              alt="오늘의 집중"
              style={{ width: "100%", height: "100%" }}
            />
          </button>
          <button /*홈 버튼*/
            className="menu"
            onClick={() => navigate("/")}
            aria-label="홈"
          >
            <img
              src={HomeButtonImage}
              alt="홈"
              style={{ width: "100%", height: "100%" }}
            />
          </button>
        </div>
      </div>

      <div>
        <div className="current-time">현재 시간</div>
        <div className="time-block">{currentTime}</div>
      </div>

      <div className="inner-container">
        <TodoList /> {/* 할 일 목록 컴포넌트 */}
      </div>

      <footer></footer>
    </div>
  );
}

export default HabitStudyComponents;
