import React, { useState } from "react";
import "./PasswordModal.css";
import ic_open_pw from "../../img/ic_open_pw.svg";
import ic_close_pw from "../../img/ic_close_pw.svg";

function PasswordModal({
  isOpen,
  onClose,
  onSubmit,
  correctPassword,
  studyName,
  name,
  buttonText,
}) {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (password === correctPassword) {
      onSubmit();
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="pw-modalContent">
        <div className="pw-modalHeader">
          <span className="owner">
            {name}의 {studyName}
          </span>
          <span onClick={onClose} className="close1">
            나가기
          </span>
        </div>
        <span className="auth">권한이 필요해요!</span>
        <label className="pw">비밀번호</label>
        <div className="passwordContainer">
          <input
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요"
          />
          <img
            src={isPasswordVisible ? ic_open_pw : ic_close_pw}
            alt="toggle visibility"
            className="passwordToggleIcon"
            onClick={togglePasswordVisibility}
          />
        </div>
        <button onClick={handleSubmit}>{buttonText}</button>
        <span onClick={onClose} className="close2">
          나가기
        </span>
      </div>
      {showToast && (
        <div className="toastMessage">
          <span>🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.</span>
        </div>
      )}
    </div>
  );
}

export default PasswordModal;
