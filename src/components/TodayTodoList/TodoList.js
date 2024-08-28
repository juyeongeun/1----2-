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

  useEffect(() => {
    console.log("Raw Habits:", habits); // API 응답의 raw 데이터 확인

    const updatedHabits = habits.map((habit) => {
      // 습관 객체의 habitId가 존재하는지 확인
      if (habit.habitId) {
        return habit; // 이미 habitId가 존재하면 그대로 반환
      }
      // habitId가 없고, id가 존재하면 habitId로 변환
      return {
        habitId: habit.id, // id를 habitId로 변환
        habitName: habit.habitName,
        endDate: habit.endDate,
        // 필요한 다른 필드도 추가
      };
    });

    console.log("Updated Habits:", updatedHabits); // 변환된 데이터 확인
    const uniqueHabits = Array.from(
      new Map(updatedHabits.map((habit) => [habit.habitId, habit])).values()
    );
    setLocalHabits(uniqueHabits);
  }, [habits]);

  const refreshHabits = useCallback(() => {
    const updatedHabits = habits.map((habit) => {
      // 습관 객체의 habitId가 존재하는지 확인
      if (habit.habitId) {
        return habit; // 이미 habitId가 존재하면 그대로 반환
      }
      // habitId가 없고, id가 존재하면 habitId로 변환
      return {
        habitId: habit.id, // id를 habitId로 변환
        habitName: habit.habitName,
        endDate: habit.endDate,
        // 필요한 다른 필드도 추가
      };
    });

    const uniqueHabits = Array.from(
      new Map(updatedHabits.map((habit) => [habit.habitId, habit])).values()
    );
    setLocalHabits(uniqueHabits);
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
        updateHabits={updateHabits}
        createHabit={createHabit}
        deleteHabit={deleteHabit}
        onUpdate={refreshHabits}
      />
    </>
  );
}

export default TodoList;
