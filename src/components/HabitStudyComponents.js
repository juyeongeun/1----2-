import React from "react";
import "./HabitStudyComponents.css"; // CSS 파일을 import합니다.
import TodoList from "./TodoList.js"; // TodoList 컴포넌트를 import합니다.

function HabitStudyComponents() {
  // 습관 리스트를 관리하는 배열 (현재는 빈 배열로 설정)
  const habits = []; // 습관이 없을 때는 빈 배열로 설정

  console.log("HabitStudyComponents component rendered");
  console.log("habits: ");
  return (
    <div className="middle-container">
      {/* 두 번째 컨테이너 */}
      <div className="both-sides">
        <div className="left-side">
          <div className="main-title">연우의 개발공장</div>
        </div>
        <div className="right-side">
          <button className="menu">오늘의 집중</button>
          <button className="menu">홈</button>
        </div>
      </div>

      <div>
        <div className="current-time">현재 시간</div>
        <button>2024-01-04 오후 3:06</button>
      </div>

      <div className="inner-container">
        {/* 세 번째 컨테이너 */}
        {habits.length === 0 ? (
          <TodoList /> // 할 일 목록 컴포넌트
        ) : (
          <>
            <div className="habit-header">
              <h2>오늘</h2>
              <button>목록 수정</button>
            </div>
            <ul className="habit-list">
              {habits.map((habit, index) => (
                <li key={index} className={habit.completed ? "completed" : ""}>
                  {habit.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <footer></footer>
    </div>
  );
}

export default HabitStudyComponents;
