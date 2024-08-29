import React, { useState, useEffect } from "react";
import "./HabitStudyComponents.css";
import TodoList from "./TodoList.js";
import useFetchStudy from "../../hooks/useFetchStudy.js";
import { useNavigate, useParams } from "react-router-dom";
import PasswordModal from "../StudyDetailComponents/PasswordModal.js";

function HabitStudyComponents() {
  const { studyId } = useParams();
  const { studyName, name, password, loading, error } = useFetchStudy(studyId);
  const [currentTime, setCurrentTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const navigate = useNavigate();

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
  useEffect(() => {
    if (isPasswordCorrect) {
      setIsModalOpen(false);
    }
  }, [isPasswordCorrect]);

  const handleModalSubmit = () => {
    setIsPasswordCorrect(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/study/${studyId}`);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="both-sides">
        <div className="left-side">
          <div className="main-title">
            {name}의 {studyName}
          </div>
        </div>
        <div className="right-side">
          <button
            className="menu-focus"
            onClick={() => navigate(`/focus/${studyId}`)}
            aria-label="오늘의 집중"
          >
            오늘의 집중 &nbsp; &gt;
          </button>
          <button
            className="menu-home"
            onClick={() => navigate(`/study/${studyId}`)}
            aria-label="홈"
          >
            홈 &nbsp; &gt;
          </button>
        </div>
      </div>

      <div>
        <div className="current-time">현재 시간</div>
        <div className="time-block">
          <p>{currentTime}</p>
        </div>
      </div>

      <div className="inner-container">
        <TodoList /> {/* 할 일 목록 컴포넌트 */}
      </div>

      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        correctPassword={password}
        studyName={studyName}
        name={name}
        buttonText={"오늘의 습관으로 가기"}
      />
    </>
  );
}

export default HabitStudyComponents;
