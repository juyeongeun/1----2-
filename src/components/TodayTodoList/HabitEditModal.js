import React, { useState, useEffect, useCallback } from "react";
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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalHabits(habits);
    }
  }, [isOpen, habits]);

  const handleCancel = useCallback(() => {
    setNewHabitList([]);
    onClose();
  }, [onClose]);

  const handleChange = useCallback((id, newName) => {
    setLocalHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.habitId === id ? { ...habit, habitName: newName } : habit
      )
    );
  }, []);

  const handleAddInput = useCallback(() => {
    setNewHabitList((prevNewHabits) => [...prevNewHabits, ""]);
  }, []);

  const handleNewHabitChange = useCallback((index, newName) => {
    setNewHabitList((prevNewHabits) =>
      prevNewHabits.map((habit, i) => (i === index ? newName : habit))
    );
  }, []);

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      // Update local habits and new habits
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

      // Close the modal only after all operations are done
      onClose();
    } catch (error) {
      console.error("Failed to update habits:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleHabitDelete = useCallback(
    async (habitId) => {
      try {
        await deleteHabit(habitId);

        setLocalHabits((prevHabits) =>
          prevHabits.filter((habit) => habit.habitId !== habitId)
        );

        await onUpdate();
      } catch (error) {
        console.error("Failed to delete habit:", error);
      }
    },
    [deleteHabit, onUpdate]
  );

  const handleNewHabitDelete = useCallback((index) => {
    setNewHabitList((prevNewHabits) =>
      prevNewHabits.filter((_, i) => i !== index)
    );
  }, []);

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
          <ModalButtons
            onClose={handleCancel}
            handleSave={handleSave}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
}
