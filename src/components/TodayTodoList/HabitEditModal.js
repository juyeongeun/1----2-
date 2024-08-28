import React, { useState, useEffect } from "react";
import "./HabitEditModal.css";
import HabitList from "./HabitModalList.js";
import NewHabitList from "./NewHabitList.js";
import ModalButtons from "./ModalButtons.js";

export default function HabitEditModal({
  isOpen,
  onClose,
  habits,
  updateHabits,
  createHabit,
  deleteHabit,
  onUpdate,
}) {
  const [localHabits, setLocalHabits] = useState(habits);
  const [newHabitList, setNewHabitList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setLocalHabits(habits);
      setNewHabitList([]);
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
      const updates = localHabits
        .filter((habit) => {
          const originalHabit = habits.find((h) => h.habitId === habit.habitId);
          return habit.habitName !== originalHabit.habitName;
        })
        .map((habit) => ({
          habitId: habit.habitId,
          data: { habitName: habit.habitName },
        }));

      if (updates.length > 0) {
        await updateHabits(updates);
      }

      // 새 습관 추가
      const newHabitResponses = await Promise.all(
        newHabitList
          .filter((name) => name.trim() !== "")
          .map(async (habitName) => {
            const response = await createHabit(habitName);
            const newHabit = {
              habitId: response.id,
              habitName: habitName,
            };
            return newHabit;
          })
      );

      // 모든 습관 상태 업데이트
      setLocalHabits((prevHabits) => [
        ...Array.from(
          new Map(
            [...prevHabits, ...newHabitResponses].map((habit) => [
              habit.habitId,
              habit,
            ])
          ).values()
        ),
      ]);

      setNewHabitList([]);
      await onUpdate();
      onClose();
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
