import { useRef, useState } from "react";
import polygon from "../../img/today_focus/Polygon.png";
import btn_pause from "../../img/today_focus/btn_pause.png";
import btn_restart from "../../img/today_focus/btn_restart.png";
import btn_stop from "../../img/today_focus/stop.png";
import "./FocusTimer.css";
import useFocusTimer from "../../hooks/useFocusTimer.js";
const FocusTimer = ({ initTime, time, setTime, studyId, setModalOpen }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [clear, setClear] = useState(false);
  const [tempClear, setTempClear] = useState(false);
  const [focusClear, setFocusClear] = useState(false);
  const [soon, setSoon] = useState("");
  const [pause, setPause] = useState(false);
  const [_10minutePoint, set_10minutePoint] = useState(600);
  const intervalRef = useRef();
  //---------------------------------------------
  const {
    currentPoint,
    setCurrentPoint,
    updatePoint,
    timeParser,
    loading,
    error,
  } = useFocusTimer(studyId);
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (loading) {
    return <div>Loading...{_10minutePoint}</div>;
  }
  //---------------------------------------------

  const initTimerTime = () => {
    clearInterval(intervalRef.current);
    setTime(initTime);
    set_10minutePoint(600 - 1);
    setSoon("");
    setPause(false);
    setIsRunning(true);
    //기본적인 타이머 초기화 함수들
    setModalOpen(true);
  };

  //---------------------------------------------
  const startAndReset = async () => {
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

        set_10minutePoint(async (prev) => {
          if (prev === 0) {
            setCurrentPoint((prev) => {
              return prev + 1;
            });
            updatePoint(currentPoint, 1, studyId);
            set_10minutePoint(600 - 1);
            setTempClear(true);
            setTimeout(() => {
              setTempClear(false);
            }, 3000);
          }
          return prev - 1;
        });
      }, 1000);
      setIsRunning(false);
    } else {
      clearInterval(intervalRef.current);
      if (clear && time < 0) {
        setClear(false);
        setFocusClear(true);
        setTimeout(() => setFocusClear(false), 3000);
        setCurrentPoint((prev) => {
          return prev + 3;
        });
        updatePoint(currentPoint, 3, studyId);
      }
      setTime(initTime);
      set_10minutePoint(600 - 1);
      setSoon("");
      setPause(false);
      setIsRunning(true);
    }
  };

  const onlyReset = () => {
    if (!isRunning) {
      setTime(initTime);
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

        set_10minutePoint((prev) => {
          if (prev === 0) {
            setCurrentPoint((prev) => {
              return prev + 1;
            });
            updatePoint(currentPoint, 1, studyId);
            set_10minutePoint(600 - 1);
            setTempClear(true);
            setTimeout(() => {
              setTempClear(false);
            }, 3000);
          }
          return prev - 1;
        });
      }, 1000);
      setPause(false);
    }
  };

  return (
    <>
      <div className="todaysFocus_Mid">
        <div className="todaysFocus_Mid_point_Wrapper">
          <span className="todaysFocus_Mid_point_text">
            현재까지 획득한 포인트
          </span>
          <div className="todaysFocus_Mid_point_container">
            <span className="todaysFocus_Mid_point_point">
              {currentPoint}P 획득
            </span>
          </div>
        </div>
      </div>
      <div className="todaysFocus-bottom">
        <div className="todaysFocus-bottom-Container">
          <div className="mainTextAndInitTimerTime">
            <span className="todaysFocus-bottom-mainText">오늘의 집중</span>
            <button className="InitTimerTimeBtn" onClick={initTimerTime}>
              <span>{timeParser(initTime)}</span>
            </button>
          </div>

          <span className={`todaysFocus-bottom-time ${soon}`}>
            {timeParser(time)}
          </span>

          <div className="todaysFocus-bottom-start-btnWrapper">
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
      <div className="popup_container">
        <div className={`pause_warning_popUp ${pause ? "pause" : ""}`}>
          🚨 집중이 중단되었습니다.
        </div>
      </div>
      <div className="popup_container">
        <div className={`pause_clear_popUp ${focusClear ? "clear" : ""}`}>
          🎉 3포인트를 획득했습니다!
        </div>
      </div>
      <div className="popup_container">
        <div className={`pause_clear_popUp ${tempClear ? "clear" : ""}`}>
          🎉 1포인트를 획득했습니다!
        </div>
      </div>
    </>
  );
};
export default FocusTimer;
