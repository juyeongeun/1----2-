import React from "react";
import DeleteButton from "../../img/btn_determinate.png";
import "./NewHabitList.css";
import PlusButton from "../../img/btn_plus.png";

export default function NewHabitList({
  newHabitList,
  handleNewHabitChange,
  handleAddInput,
  handleDelete,
}) {
  return (
    <div className="habit-list">
      {newHabitList.map((habit, index) => (
        <div key={`new-${index}`} className="habit-item">
          <input
            type="text"
            className="habit-input"
            value={habit}
            onChange={(e) => handleNewHabitChange(index, e.target.value)}
            placeholder="새 습관 추가"
          />
          {/* 이미지를 버튼 안에 넣습니다. */}
          <img
            src={DeleteButton}
            alt="삭제 버튼"
            style={{ width: "48px", height: "48px", marginRight: "5px" }}
            className="new-delete-button"
            onClick={() => handleDelete(index)}
          />
        </div>
      ))}
      <div className="habit-item-test">
        <button className="plus-button" onClick={handleAddInput}>
          <img
            src={PlusButton}
            alt="플러스 버튼"
            style={{ width: "400px", height: "54px", marginRight: "5px" }}
          />
        </button>
      </div>
      <div className="cancel-button"></div>
      <div className="modified-complete-button"></div>
    </div>
  );
}
