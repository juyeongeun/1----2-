import { useRef, useState } from "react";
import polygon from "./assets/Polygon.png";
import btn_pause from "./assets/btn_pause.png";
import btn_restart from "./assets/btn_restart.png";
import btn_stop from "./assets/stop.png";
import "./FocusTimer.css";
import { timeParser } from "../utility/timeParser.js";
const FocusTimer = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [clear, setClear] = useState(false);
  const [soon, setSoon] = useState("");
  const [pause, setPause] = useState(false);
  const [time, setTime] = useState(1500);
  const intervalRef = useRef();

  const startAndReset = () => {
    if (isRunning) {
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
      setIsRunning(false);
    } else {
      clearInterval(intervalRef.current);
      if (clear && time < 0) {
        setClear(false);
      }
      setTime(1500);
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
      <div class="todaysFocus-bottom">
        <div class="todaysFocus-bottom-Container">
          <span class="todaysFocus-bottom-mainText">오늘의 집중</span>
          <span class={`todaysFocus-bottom-time ${soon}`}>
            {timeParser(time)}
          </span>
          <div class="todaysFocus-bottom-start-btnWrapper">
            <div class={`pause_warning_popUp ${pause ? "pause" : ""}`}>
              🚨 집중이 중단되었습니다.
            </div>
            <div class={`pause_clear_popUp ${clear ? "clear" : ""}`}>
              🎉 50포인트를 획득했습니다!
            </div>

            {!clear ? (
              <>
                <img
                  class={`todaysFocus-bottom-start-pause ${
                    isRunning ? "stop" : "start"
                  }`}
                  src={btn_pause}
                  alt=""
                  onClick={pauseAndRestart}
                />
                <button
                  onClick={startAndReset}
                  class={`todaysFocus-bottom-start-btnContainer ${
                    isRunning ? "stop" : "start"
                  }`}
                >
                  <img
                    class="todaysFocus-bottom-start-play"
                    src={polygon}
                    alt=""
                  />
                  <span class="todaysFocus-bottom-start-text">Start!!</span>
                </button>
                <img
                  class={`todaysFocus-bottom-start-restart ${
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
                class="todaysFocus-bottom-stop"
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
