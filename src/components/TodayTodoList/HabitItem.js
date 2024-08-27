import React from "react";
import "./HabitItem.css";

export default function HabitItem({ habit, handleChange, handleDelete }) {
  return (
    <div className="habit-item">
      <input
        type="text"
        value={habit.habitName}
        onChange={(e) => handleChange(habit.habitId, e.target.value)}
      />
      <button
        className="delete-button"
        onClick={() => handleDelete(habit.habitId)}
      >
        삭제
      </button>
    </div>
  );
}
