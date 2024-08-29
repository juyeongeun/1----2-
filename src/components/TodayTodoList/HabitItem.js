import React from "react";
import "./HabitItem.css";
import DeleteButton from "../../img/btn_determinate.png";

export default function HabitItem({ habit, handleChange, handleDelete }) {
  return (
    <div className="habit-item">
      <input
        type="text"
        value={habit.habitName}
        onChange={(e) => handleChange(habit.habitId, e.target.value)}
        className="habit-input"
      />
      <img
        src={DeleteButton}
        alt="삭제 버튼"
        className="delete-button"
        onClick={() => handleDelete(habit.habitId)}
      />
    </div>
  );
}
