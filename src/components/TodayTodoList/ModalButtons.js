import React from "react";

export default function ModalButtons({ onClose, handleSave }) {
  return (
    <div>
      <button onClick={onClose}>취소</button>
      <button onClick={handleSave}>수정 완료</button>
    </div>
  );
}
