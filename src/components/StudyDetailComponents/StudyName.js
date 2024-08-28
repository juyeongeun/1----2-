import "./StudyName.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PasswordModal from "./PasswordModal.js";

function StudyName({ studyName, name, content, password, studyId }) {
  const nav = useNavigate();
  // 첫 번째 인수로 이동 할 도메인 주소를 받고, 두 번째 인수로 리다이렉션 시 전송할 데이터를 첩부합니다.

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");

  const handleButtonClick = (url, buttonText) => {
    setRedirectUrl(url);
    setModalButtonText(buttonText);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    nav(`${redirectUrl}/${studyId}`);
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
