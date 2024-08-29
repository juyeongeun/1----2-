import React from "react";
import CancelButton from "../../img/cancel-button=pc.png";
import ModifiedComplete from "../../img/modified complete=pc.png";
import "./ModalButtons.css";

export default function ModalButtons({ onClose, handleSave }) {
  return (
    <div>
      <button className="cancel-button" onClick={onClose}>
        <img
          src={CancelButton}
          alt="취소 버튼"
          style={{ width: "288px", height: "58px", marginRight: "5px" }}
        />
      </button>
      <button className="modified-complete-button" onClick={handleSave}>
        {" "}
        <img
          src={ModifiedComplete}
          alt="수정완료 버튼"
          style={{ width: "288px", height: "58px", marginRight: "5px" }}
        />
      </button>
    </div>
  );
}
