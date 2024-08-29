import React from "react";
import "./ModalButtons.css";

export default function ModalButtons({ onClose, handleSave }) {
  return (
    <div>
      <button className="cancel-button" onClick={onClose}>
        취소
      </button>
      <button className="modified-complete-button" onClick={handleSave}>
        수정 완료
      </button>
    </div>
  );
}
