import { useNavigate } from "react-router-dom";
import arrow from "./assets/arrow.png";
import "./FocusTop.css";

const FocusTop = ({ name, studyName, studyId, error, loading }) => {
  const nav = useNavigate();

  const today_habit = () => {
    nav(`/habit/${studyId}`);
  };

  const home = () => {
    nav("/");
  };

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div class="todaysFocus-Top">
      <span class="todaysFocus-Top-text">
        {name}의 {studyName}
      </span>
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
