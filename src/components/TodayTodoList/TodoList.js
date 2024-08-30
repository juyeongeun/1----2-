import React, { useState, useCallback, useEffect } from "react";
import "./TodoList.css";
import useFetchHabit from "../../hooks/useFetchHabit.js";
import useFetchCompleteHabit from "../../hooks/useFetchCompleteHabit.js";
import HabitEditModal from "./HabitEditModal.js";
import { useParams } from "react-router-dom";

function TodoList() {
  const { studyId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localHabits, setLocalHabits] = useState([]);

  const {
    habits,
    loading: habitsLoading,
    error: habitsError,
    updateHabit,
    createHabit,
    deleteHabit,
  } = useFetchHabit(studyId);

  const {
    completeHabits,
    loading: completeLoading,
    error: completeError,
    completeHabit,
  } = useFetchCompleteHabit(studyId);

  // Update localHabits whenever habits change
  useEffect(() => {
    setLocalHabits([...habits]);
  }, [habits]);

  const refreshHabits = useCallback(() => {
    setLocalHabits([...habits]);
  }, [habits]);

  if (habitsLoading || completeLoading) {
    return <div>Loading...</div>;
  }

  if (habitsError || completeError) {
    return <div className="error">{habitsError || completeError}</div>;
  }

  const today = new Date().toISOString().split("T")[0];

  const isHabitCompletedToday = (habitId) => {
    return completeHabits.some((completeHabit) => {
      const completeDate = completeHabit.createdAt.split("T")[0];
      return completeDate === today && completeHabit.habitId === habitId;
    });
  };

  const toggleTodo = async (habitId) => {
    try {
      await completeHabit(habitId);
      refreshHabits();
    } catch (err) {
      console.error("Failed to complete habit:", err);
    }
  };

  const activeHabits = localHabits.filter((habit) => habit.endDate === null);

  return (
    <>
      <div className="todo-list">
        <h2>오늘의 습관</h2>
        <div>
          <button className="edit-button" onClick={() => setIsModalOpen(true)}>
            목록 수정
          </button>
        </div>
      </div>
      {activeHabits.length === 0 ? (
        <div className="no-habits">
          <p>아직 습관이 없어요</p>
          <p>목록 수정을 눌러 습관을 생성해보세요</p>
        </div>
      ) : (
        <ul className="habit-list">
          {activeHabits.map((habit) => (
            <li
              key={habit.habitId}
              className={
                isHabitCompletedToday(habit.habitId) ? "completed" : ""
              }
              onClick={() => toggleTodo(habit.habitId)}
            >
              {habit.habitName}
            </li>
          ))}
        </ul>
      )}

      <HabitEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        habits={activeHabits}
        updateHabit={updateHabit}
        createHabit={createHabit}
        deleteHabit={deleteHabit}
        onUpdate={refreshHabits}
      />
    </>
  );
}

export default TodoList;
