import "./TimerSettingModal.css";
import { useState } from "react";

const TimerSettingModal = ({ setModalOpen, setTime, name, studyName }) => {
  const [tempTimer, setTempTimer] = useState(30 * 60);

  const handlePasswordChange = (e) => {
    setTempTimer(e.target.value * 60);
  };
  const modalClose = () => {
    setTime(30 * 60); // 아무것도 설정 안하면 30분으로 기본 설정
    setModalOpen(false);
  };
  const handleSubmit = () => {
    setTime(tempTimer);
    setModalOpen(false);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <span className="owner">
            {name}의 {studyName}
          </span>
          <span onClick={modalClose} className="close1">
            나가기
          </span>
        </div>
        <span className="auth">타이머를 설정해주세요! (기본 30분 입니다)</span>
        <label className="pw">타이머</label>
        <div className="passwordContainer">
          <input
            type="number"
            onChange={handlePasswordChange}
            placeholder="집중 시간(분)을 입력해주세요!"
          />
        </div>
        <button onClick={handleSubmit}>타이머 설정하기</button>
      </div>
    </div>
  );
};

export default TimerSettingModal;
