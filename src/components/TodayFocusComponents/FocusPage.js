import FocusMid from "./components/FocusMid.js";
import FocusTimer from "./components/FocusTimer.js";
import FocusTop from "./components/FocusTop.js";
import "./FocusPage.css";

const FocusPage = () => {
  return (
    <div class="main_Container">
      <FocusTop />
      <FocusMid />
      <FocusTimer />
    </div>
  );
};

export default FocusPage;
