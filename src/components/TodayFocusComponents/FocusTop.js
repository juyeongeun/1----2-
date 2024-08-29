import { useNavigate } from "react-router-dom";
import arrow from "../../img/today_focus/arrow.png";
import "./FocusTop.css";

const FocusTop = ({ name, studyName, studyId, error, loading }) => {
  const nav = useNavigate();

  const today_habit = () => {
    nav(`/habit/${studyId}`);
  };

  const home = () => {
    nav(`/study/${studyId}`);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="todaysFocus-Top">
      <span className="todaysFocus-Top-text">
        {name}의 {studyName}
      </span>
      <div className="todaysFocus-Top-btnContainer">
        <div onClick={today_habit} className="todaysFocus-Top-btn">
          <span className="todaysFocus-Top-btn-text">오늘의 습관</span>
          <img className="todaysFocus-Top-btn-arrow" src={arrow} alt="" />
        </div>
        <div onClick={home} className="todaysFocus-Top-btn">
          <span className="todaysFocus-Top-btn-text">홈</span>
          <img className="todaysFocus-Top-btn-arrow" src={arrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FocusTop;
