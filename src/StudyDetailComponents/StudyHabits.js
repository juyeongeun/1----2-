import React, { useEffect } from "react";
import useFetchHabit from "../hooks/useFetchHabit.js";
import useFetchCompleteHabit from "../hooks/useFetchCompleteHabit.js";
import "./StudyHabits.css";
import ic_inactive from "../img/check/ic_inactive.svg";
import { activeIcons } from "../img/ImgImport.js";

function StudyHabits() {
  const { habits, loading: habitLoading, error: habitError } = useFetchHabit(5);
  const {
    completeHabits,
    loading: completeLoading,
    error: completeError,
  } = useFetchCompleteHabit(5);

  // 로컬 스토리지에 데이터를 저장
  const saveToLocalStorage = (habitId, dayIndex) => {
    const currentData =
      JSON.parse(localStorage.getItem("completedHabits")) || {};
    if (!currentData[habitId]) {
      currentData[habitId] = [];
    }
    if (!currentData[habitId].includes(dayIndex)) {
      currentData[habitId].push(dayIndex);
    }
    localStorage.setItem("completedHabits", JSON.stringify(currentData));
  };

  // 일요일 자정 이후 로컬 스토리지를 초기화
  const clearStorageOnSunday = () => {
    const now = new Date();
    const lastClear = localStorage.getItem("lastClear") || 0;

    if (
      now.getDay() === 1 &&
      now.getHours() === 0 &&
      now.getMinutes() === 0 &&
      now.getSeconds() === 0 &&
      now > new Date(parseInt(lastClear, 10))
    ) {
      localStorage.removeItem("completedHabits");
      localStorage.setItem("lastClear", now.getTime());
    }
  };

  const isHabitCompleteOnDay = (habitId, dayIndex) => {
    const storedData =
      JSON.parse(localStorage.getItem("completedHabits")) || {};
    if (storedData[habitId] && storedData[habitId].includes(dayIndex)) {
      return true;
    }

    const habitCompletion = completeHabits.find((ch) => {
      const habitCompletionDate = new Date(ch.createdAt);
      const habitDay = habitCompletionDate.getDay();
      return (
        ch.habitId === habitId &&
        (habitDay === 0 ? 6 : habitDay - 1) === dayIndex
      );
    });

    if (habitCompletion) {
      saveToLocalStorage(habitId, dayIndex);
      return true;
    }

    return false;
  };

  useEffect(() => {
    clearStorageOnSunday();
  }, []);

  if (habitLoading || completeLoading) {
    return <div>Loading...</div>;
  }

  if (habitError || completeError) {
    return <div>Error: {habitError || completeError}</div>;
  }

  const activeHabits = habits.filter((h) => h.isActive);
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div className="habitContainer">
      <p className="habitText">습관 기록표</p>
      {activeHabits.length > 0 ? (
        <table className="habitTable">
          <thead>
            <tr className="date">
              <td></td>
              {daysOfWeek.map((day, index) => (
                <td key={index}>{day}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeHabits.map((h, id) => (
              <tr key={id}>
                <td className="habitName">{h.habitName}</td>
                {daysOfWeek.map((_, dayIndex) => (
                  <td key={dayIndex} className="habitCheck">
                    <img
                      className="habitIcon"
                      src={
                        isHabitCompleteOnDay(h.habitId, dayIndex)
                          ? activeIcons[
                              `ic_active${
                                (id % Object.keys(activeIcons).length) + 1
                              }`
                            ]
                          : ic_inactive
                      }
                      alt={
                        isHabitCompleteOnDay(h.habitId, dayIndex)
                          ? `Active Habit ${id + 1}`
                          : "Inactive Habit"
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="noneHabit">
          아직 습관이 없어요
          <br />
          오늘의 습관에서 습관을 생성해보세요
        </p>
      )}
    </div>
  );
}

export default StudyHabits;
