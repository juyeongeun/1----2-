import { useParams } from "react-router-dom";
import useFetchStudy from "../../hooks/useFetchStudy.js";
import FocusTimer from "./FocusTimer.js";
import FocusTop from "./FocusTop.js";
import "./FocusPage.css";
import { useState } from "react";
import TimerSettingModal from "./TimerSettingModal.js";

const FocusPage = () => {
  const { studyId } = useParams();
  const { studyName, name, point, loading, error } = useFetchStudy(studyId);
  const [modalOpen, setModalOpen] = useState(true);
  const [time, setTime] = useState(30 * 60);
  const [initTime, setInitTime] = useState(30 * 60);
  return (
    <div className="main_Container">
      <FocusTop
        name={name}
        studyName={studyName}
        studyId={studyId}
        loading={loading}
        error={error}
      />
      <FocusTimer
        initTime={initTime}
        time={time}
        setTime={setTime}
        studyId={studyId}
        point={point}
        setModalOpen={setModalOpen}
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
