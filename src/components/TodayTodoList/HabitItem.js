import React from "react";
import "./HabitItem.css";
import ModalDelete from "../../img/btn_determinate.png";

export default function HabitItem({ habit, handleChange, handleDelete }) {
  return (
    <div className="habit-item">
      <div>
        <input
          className="habit-input" // 클래스 이름 추가
          type="text"
          value={habit.habitName}
          onChange={(e) => handleChange(habit.habitId, e.target.value)}
        />
      </div>

      <div>
        <button className="plus-button" onClick={handleAddInput}>
          <img
            src={PlusButton}
            alt="플러스 버튼"
            style={{ width: "400px", height: "54px", marginRight: "5px" }}
          />
        </button>
      </div>
    </div>
  );
}
