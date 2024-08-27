import React from "react";
import HabitItem from "./HabitItem.js";

export default function HabitList({ localHabits, handleChange, handleDelete }) {
  return (
    <div className="habit-list">
      {localHabits.length > 0 ? (
        localHabits.map((habit) => (
          <HabitItem
            key={habit.habitId}
            habit={habit}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <p>습관이 없습니다.</p>
      )}
    </div>
  );
}
