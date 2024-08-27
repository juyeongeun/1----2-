import React from "react";

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
            value={habit}
            onChange={(e) => handleNewHabitChange(index, e.target.value)}
            placeholder="새 습관 추가"
          />
          <button
            className="delete-button"
            onClick={() => handleDelete(habit.habitId)}
          >
            삭제
          </button>
        </div>
      ))}
      <div className="habit-item">
        <button onClick={handleAddInput}>+</button>
      </div>
    </div>
  );
}
