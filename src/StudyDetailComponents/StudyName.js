import "./StudyName.css";
import React, { useState } from "react";
import useFetchStudy from "../hooks/useFetchStudy.js";
import PasswordModal from "./PasswordModal.js"; // 모달 컴포넌트 import

function StudyName() {
  const { studyName, name, content, password, loading, error } =
    useFetchStudy();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = (url, buttonText) => {
    setRedirectUrl(url);
    setModalButtonText(buttonText);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    window.location.href = redirectUrl;
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

      {/* 비밀번호 모달 */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        correctPassword={password}
        studyName={studyName}
        name={name}
        buttonText={modalButtonText}
      />
    </>
  );
}

export default StudyName;
