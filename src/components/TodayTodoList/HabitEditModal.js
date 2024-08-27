import React, { useState, useEffect } from "react";
import "./HabitEditModal.css";

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
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>목록 수정</h2>
        <div className="habit-list">
          {localHabits.length > 0 ? (
            localHabits.map((habit) => (
              <div key={habit.habitId} className="habit-item">
                <input
                  type="text"
                  value={habit.habitName}
                  onChange={(e) => handleChange(habit.habitId, e.target.value)}
                />
                <button
                  className="delete-button"
                  onClick={() => handleDelete(habit.habitId)}
                >
                  삭제
                </button>
              </div>
            ))
          ) : (
            <p>습관이 없습니다.</p>
          )}
          {newHabitList.map((habit, index) => (
            <div key={`new-${index}`} className="habit-item">
              <input
                type="text"
                value={habit}
                onChange={(e) => handleNewHabitChange(index, e.target.value)}
                placeholder="새 습관 추가"
              />
            </div>
          ))}
          <div className="habit-item">
            <button onClick={handleAddInput}>+</button>
          </div>
        </div>
        <div>
          <button onClick={onClose}>취소</button>
          <button onClick={handleSave}>수정 완료</button>
        </div>
      </div>
    </div>
  );
}
