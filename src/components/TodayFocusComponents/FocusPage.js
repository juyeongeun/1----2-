import { useParams } from "react-router-dom";
import useFetchStudy from "../../hooks/useFetchStudy.js";
import FocusMid from "./components/FocusMid.js";
import FocusTimer from "./components/FocusTimer.js";
import FocusTop from "./components/FocusTop.js";
import "./FocusPage.css";
import { useState } from "react";
import TimerSettingModal from "./components/TimerSettingModal.js";

const FocusPage = () => {
  const { studyId } = useParams();
  const { studyName, name, point, loading, error } = useFetchStudy(studyId);
  const [modalOpen, setModalOpen] = useState(true);
  const [currentPoint, setCurrentPoint] = useState(point ?? 0);
  const [time, setTime] = useState(30 * 60);
  const [initTime, setInitTime] = useState(30 * 60);
  return (
    <div className="main_Container">
      <FocusTop
        name={name}
        studyName={studyName}
        loading={loading}
        error={error}
      />
      <FocusMid point={currentPoint} loading={loading} error={error} />
      <FocusTimer
        initTime={initTime}
        time={time}
        setTime={setTime}
        studyId={studyId}
        currentPoint={currentPoint}
        setCurrentPoint={setCurrentPoint}
        loading={loading}
        error={error}
      />
      {modalOpen ? (
        <TimerSettingModal
          setModalOpen={setModalOpen}
          name={name}
          studyName={studyName}
          setTime={setTime}
          setInitTime={setInitTime}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FocusPage;
