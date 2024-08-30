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

  // 모달이 열릴 때만 상태 초기화
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
    setNewHabitList((prevNewHabits) =>
      prevNewHabits.map((habit, i) => (i === index ? newName : habit))
    );
  };

  const handleSave = async () => {
    try {
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

      const newHabitResponses = [];
      for (const habitName of newHabitList.filter(
        (name) => name.trim() !== ""
      )) {
        const response = await createHabit(habitName);
        newHabitResponses.push({
          habitId: response.id,
          habitName: habitName,
        });
      }

      setLocalHabits((prevHabits) => [...prevHabits, ...newHabitResponses]);

      setNewHabitList([]);
      await onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update habits:", error);
    }
  };

  const handleHabitDelete = async (habitId) => {
    try {
      await deleteHabit(habitId);
      setLocalHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.habitId !== habitId)
      );
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  const handleNewHabitDelete = (index) => {
    setNewHabitList((prevNewHabits) =>
      prevNewHabits.filter((_, i) => i !== index)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-background">
          <h2 className="modal-title">습관 목록</h2>
          <HabitList
            localHabits={localHabits}
            handleChange={handleChange}
            handleDelete={handleHabitDelete}
          />
          <NewHabitList
            newHabitList={newHabitList}
            handleNewHabitChange={handleNewHabitChange}
            handleAddInput={handleAddInput}
            handleDelete={handleNewHabitDelete}
          />
          <ModalButtons onClose={onClose} handleSave={handleSave} />
        </div>
      </div>
    </div>
  );
}
