import React from "react";
import { useParams } from "react-router-dom";
import useFetchHabit from "../hooks/useFetchHabit.js";
import useFetchCompleteHabit from "../hooks/useFetchCompleteHabit.js";
import "./StudyHabits.css";
import ic_inactive from "../img/check/ic_inactive.svg";
import { activeIcons } from "../img/ImgImport.js";

function StudyHabits() {
  const { studyId } = useParams();
  const {
    habits,
    loading: habitLoading,
    error: habitError,
  } = useFetchHabit(studyId);
  const {
    completeHabits,
    loading: completeLoading,
    error: completeError,
  } = useFetchCompleteHabit(studyId);

  // 특정 요일에 습관이 완료되었는지 확인
  const isHabitCompleteOnDay = (habitId, dayIndex) => {
    return completeHabits.some((ch) => {
      const habitCompletionDate = new Date(ch.createdAt);
      const habitDay = habitCompletionDate.getDay();
      return (
        ch.habitId === habitId &&
        (habitDay === 0 ? 6 : habitDay - 1) === dayIndex
      );
    });
  };

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
