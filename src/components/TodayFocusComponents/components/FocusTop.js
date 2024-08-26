import { useNavigate } from "react-router-dom";
import arrow from "./assets/arrow.png";
import "./FocusTop.css";

const FocusTop = () => {
  const nav = useNavigate();

  const today_habit = () => {
    nav("/habit");
  };

  const home = () => {
    nav("/");
  };
  return (
    <div class="todaysFocus-Top">
      <span class="todaysFocus-Top-text">연우의 개발공장</span>
      <div class="todaysFocus-Top-btnContainer">
        <div onClick={today_habit} class="todaysFocus-Top-btn">
          <span class="todaysFocus-Top-btn-text">오늘의 습관</span>
          <img class="todaysFocus-Top-btn-arrow" src={arrow} alt="" />
        </div>
        <div onClick={home} class="todaysFocus-Top-btn">
          <span class="todaysFocus-Top-btn-text">홈</span>
          <img class="todaysFocus-Top-btn-arrow" src={arrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FocusTop;
