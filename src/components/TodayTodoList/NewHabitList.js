import React from "react";
import DeleteButton from "../../img/btn_determinate.png";
import "./NewHabitList.css";

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
            placeholder="                      "
            value={habit}
            onChange={(e) => handleNewHabitChange(index, e.target.value)}
          />
          <img
            src={DeleteButton}
            alt="삭제 버튼"
            className="new-delete-button"
            onClick={() => handleDelete(index)}
          />
        </div>
      ))}
      <div className="habit-item-test">
        <button className="plus-button" onClick={handleAddInput}>
          +
        </button>
      </div>
    </div>
  );
}
