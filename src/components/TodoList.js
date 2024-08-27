import React, { useState } from "react";
import "./TodoList.css"; // CSS 파일을 불러와서 스타일을 적용합니다

function TodoList() {
  // 초기 할 일 목록(todos)을 배열로 설정하고, 상태 관리
  // todos: 할 일 목록 배열, setTodos: 할 일 목록을 업데이트하는 함수
  const [todos, setTodos] = useState([
    { text: "미라클모닝 6시 기상", completed: true }, // 완료된 할 일
    { text: "아침 챙겨 먹기", completed: true }, // 완료된 할 일
    { text: "React 스터디 책 1챕터 읽기", completed: false }, // 아직 완료되지 않은 할 일
    { text: "스트레칭", completed: false }, // 아직 완료되지 않은 할 일
    { text: "영양제 챙겨 먹기", completed: false }, // 아직 완료되지 않은 할 일
    { text: "사이드 프로젝트", completed: false }, // 아직 완료되지 않은 할 일
    { text: "물 2L 먹기", completed: false }, // 아직 완료되지 않은 할 일
  ]);

  // 할 일 항목을 클릭할 때 완료 상태를 변경하는 함수
  const toggleTodo = (index) => {
    // todos 배열을 순회하면서, 클릭된 항목의 completed 상태를 반대로 바꿈
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    );
    // 변경된 todos 배열로 상태를 업데이트
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-list">
      <h2>오늘의 습관</h2> {/* 섹션 제목 */}
      <div>목록 수정</div>
      <ul className="habit-list">
        {/* 할 일 목록을 화면에 보여줌 */}
        {todos.map((todo, index) => (
          <li
            key={index} // 각 항목의 고유한 키
            className={todo.completed ? "completed" : ""} // completed이면 다른 스타일 적용
            onClick={() => toggleTodo(index)} // 클릭 시 할 일의 완료 상태를 변경
          >
            {todo.text} {/* 할 일의 텍스트를 표시 */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList; // TodoList 컴포넌트를 내보내서 다른 파일에서 사용 가능하게 합니다
