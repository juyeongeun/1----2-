import React from "react";
import HabitItem from "./HabitItem.js";

export default function HabitList({ localHabits, handleChange, handleDelete }) {
  return (
    <>
      {localHabits.map((habit) => (
        <HabitItem
          key={habit.habitId}
          habit={habit}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}
