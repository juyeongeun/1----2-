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
    updateHabits,
    createHabit,
    deleteHabit,
  } = useFetchHabit(studyId);

  const {
    completeHabits,
    loading: completeLoading,
    error: completeError,
    completeHabit,
  } = useFetchCompleteHabit(studyId);

  // 최초 로드 시 habits를 localHabits에 설정
  useEffect(() => {
    if (habits.length > 0) {
      const updatedHabits = habits.map((habit) => ({
        habitId: habit.habitId || habit.id,
        habitName: habit.habitName,
        endDate: habit.endDate,
      }));
      setLocalHabits(updatedHabits);
    }
  }, [habits]);

  const refreshHabits = useCallback(() => {
    const updatedHabits = habits.map((habit) => ({
      habitId: habit.habitId || habit.id,
      habitName: habit.habitName,
      endDate: habit.endDate,
    }));

    setLocalHabits((prevHabits) => {
      const habitMap = new Map(
        [...prevHabits, ...updatedHabits].map((habit) => [habit.habitId, habit])
      );
      return Array.from(habitMap.values());
    });
  }, [habits]);

  if (habitsLoading || completeLoading) {
    return <div>Loading...</div>;
  }

  if (habitsError || completeError) {
    return <div className="error">{habitsError || completeError}</div>;
  }

  const isHabitCompletedToday = (habitId) => {
    const today = new Date().toLocaleDateString("en-CA");
    return completeHabits.some(
      (completeHabit) =>
        new Date(completeHabit.createdAt).toLocaleDateString("en-CA") ===
          today && completeHabit.habitId === habitId
    );
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
        <button className="edit-button" onClick={() => setIsModalOpen(true)}>
          목록 수정
        </button>
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
        updateHabits={updateHabits}
        createHabit={createHabit}
        deleteHabit={deleteHabit}
        onUpdate={refreshHabits} // 모달이 닫힐 때만 상태를 업데이트
      />
    </>
  );
}

export default TodoList;
