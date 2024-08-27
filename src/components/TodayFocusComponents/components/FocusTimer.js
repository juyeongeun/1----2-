import { useRef, useState } from "react";
import polygon from "./assets/Polygon.png";
import btn_pause from "./assets/btn_pause.png";
import btn_restart from "./assets/btn_restart.png";
import btn_stop from "./assets/stop.png";
import "./FocusTimer.css";
import { timeParser } from "../utility/timeParser.js";
import { setPoint } from "../api/setPoint.js";
const FocusTimer = ({
  time,
  setTime,
  studyId,
  currentPoint,
  setCurrentPoint,
}) => {
  const [isRunning, setIsRunning] = useState(true);
  const [clear, setClear] = useState(false);
  const [soon, setSoon] = useState("");
  const [pause, setPause] = useState(false);
  const [_10minutePoint, set_10minutePoint] = useState(600);
  const intervalRef = useRef();
  const startAndReset = async () => {
    if (isRunning) {
      intervalRef.current = setInterval(async () => {
        setTime((prev) => {
          if (prev <= 10) {
            setSoon("soon");
          }
          if (prev <= 0) {
            setClear(true);
            setSoon("");
          }
          return prev - 1;
        });
        if (_10minutePoint === 0) {
          setCurrentPoint((prev) => prev + 1);
          await setPoint(currentPoint, studyId);
          set_10minutePoint(600);
        } else {
          set_10minutePoint((prev) => prev - 1);
        }
      }, 1000);
      setIsRunning(false);
    } else {
      clearInterval(intervalRef.current);
      if (clear && time < 0) {
        setClear(false);
      }
      setTime(1500);
      setCurrentPoint((prev) => prev + 3);
      await setPoint(currentPoint, studyId);
      setSoon("");
      setPause(false);
      setIsRunning(true);
    }
  };

  const onlyReset = () => {
    if (!isRunning) {
      setTime(1500);
    }
  };

  const pauseAndRestart = () => {
    if (!pause && !isRunning) {
      clearInterval(intervalRef.current);
      setPause(true);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 10) {
            setSoon("soon");
          }
          if (prev <= 0) {
            setClear(true);
            setSoon("");
          }
          return prev - 1;
        });
      }, 1000);
      setPause(false);
    }
  };

  return (
    <>
      <div className="todaysFocus-bottom">
        <div className="todaysFocus-bottom-Container">
          <span className="todaysFocus-bottom-mainText">오늘의 집중</span>
          <span className={`todaysFocus-bottom-time ${soon}`}>
            {timeParser(time)}
          </span>
          <div className="todaysFocus-bottom-start-btnWrapper">
            <div className={`pause_warning_popUp ${pause ? "pause" : ""}`}>
              🚨 집중이 중단되었습니다.
            </div>
            <div className={`pause_clear_popUp ${clear ? "clear" : ""}`}>
              🎉 50포인트를 획득했습니다!
            </div>

            {!clear ? (
              <>
                <img
                  className={`todaysFocus-bottom-start-pause ${
                    isRunning ? "stop" : "start"
                  }`}
                  src={btn_pause}
                  alt=""
                  onClick={pauseAndRestart}
                />
                <button
                  onClick={startAndReset}
                  className={`todaysFocus-bottom-start-btnContainer ${
                    isRunning ? "stop" : "start"
                  }`}
                >
                  <img
                    className="todaysFocus-bottom-start-play"
                    src={polygon}
                    alt=""
                  />
                  <span className="todaysFocus-bottom-start-text">Start!!</span>
                </button>
                <img
                  className={`todaysFocus-bottom-start-restart ${
                    isRunning ? "stop" : "start"
                  }`}
                  src={btn_restart}
                  alt=""
                  onClick={onlyReset}
                />
              </>
            ) : (
              <img
                src={btn_stop}
                alt=""
                className="todaysFocus-bottom-stop"
                onClick={startAndReset}
              ></img>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default FocusTimer;
