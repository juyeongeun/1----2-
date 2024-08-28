import React, { useState, useEffect } from "react";
import "./HabitEditModal.css";
import HabitList from "./HabitModalList.js";
import NewHabitList from "./NewHabitList.js";
import ModalButtons from "./ModalButtons.js";

export default function HabitEditModal({
  isOpen,
  onClose,
  habits,
  updateHabit,
  createHabit,
  deleteHabit,
  onUpdate,
}) {
  const [localHabits, setLocalHabits] = useState(habits);
  const [newHabitList, setNewHabitList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setLocalHabits(habits);
      setNewHabitList([]); // 모달이 열릴 때 새로 추가된 습관 초기화
    }
  }, [isOpen, habits]);

  const handleChange = (id, newName) => {
    setLocalHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.habitId === id ? { ...habit, habitName: newName } : habit
      )
    );
  };

  const handleAddInput = () => {
    setNewHabitList((prevNewHabits) => [...prevNewHabits, ""]);
  };

  const handleNewHabitChange = (index, newName) => {
    const updatedList = [...newHabitList];
    updatedList[index] = newName;
    setNewHabitList(updatedList);
  };

  const handleSave = async () => {
    try {
      // 기존 습관 업데이트
      for (const habit of localHabits) {
        const originalHabit = habits.find((h) => h.habitId === habit.habitId);
        if (habit.habitName !== originalHabit.habitName) {
          await updateHabit(habit.habitId, { habitName: habit.habitName });
        }
      }

      // 새로 추가된 습관 저장
      const newHabitResponses = await Promise.all(
        newHabitList
          .filter((name) => name.trim() !== "")
          .map(async (habitName) => {
            const habit = await createHabit(habitName);
            return habit;
          })
      );

      // 새로 추가된 습관을 localHabits에 추가
      setLocalHabits((prevHabits) => [
        ...prevHabits,
        ...newHabitResponses.map((response) => ({
          habitId: response.id,
          habitName: response.habitName,
        })),
      ]);

      // 빈값 입력 필드 제거
      setNewHabitList((prevNewHabitList) =>
        prevNewHabitList.filter((name) => name.trim() !== "")
      );

      await onUpdate(); // 상태 업데이트 콜백 호출

      onClose(); // 모달 닫기
    } catch (error) {
      console.error("Failed to update habits:", error);
    }
  };

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit(habitId);
      setLocalHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.habitId !== habitId)
      );
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-background">
          <h2>습관 목록</h2>

          <HabitList
            localHabits={localHabits}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
          <NewHabitList
            newHabitList={newHabitList}
            handleNewHabitChange={handleNewHabitChange}
            handleAddInput={handleAddInput}
          />
          <ModalButtons onClose={onClose} handleSave={handleSave} />
        </div>
      </div>
    </div>
  );
}
