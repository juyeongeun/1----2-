import { useParams } from "react-router-dom";
import useFetchStudy from "../../hooks/useFetchStudy.js";
import FocusTimer from "./FocusTimer.js";
import FocusTop from "./FocusTop.js";
import "./FocusPage.css";
import { useState, useEffect } from "react";
import TimerSettingModal from "./TimerSettingModal.js";
import PasswordModal from "../StudyDetailComponents/PasswordModal.js";
import { useNavigate } from "react-router-dom";

const FocusPage = () => {
  const { studyId } = useParams();
  const { studyName, name, point, password, loading, error } =
    useFetchStudy(studyId);

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [time, setTime] = useState(30 * 60);
  const [initTime, setInitTime] = useState(30 * 60);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPasswordCorrect) {
      setIsModalOpen(false);
      setModalOpen(true);
    }
  }, [isPasswordCorrect]);

  const handleModalSubmit = () => {
    setIsPasswordCorrect(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/study/${studyId}`);
  };
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

      {/* 비밀번호 모달 */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        correctPassword={password}
        studyName={studyName}
        name={name}
        buttonText={"오늘의 집중으로 가기"}
      />

      {/* 타이머 설정 모달 */}
      {modalOpen && isPasswordCorrect && (
        <TimerSettingModal
          setModalOpen={setModalOpen}
          name={name}
          studyName={studyName}
          setTime={setTime}
          setInitTime={setInitTime}
        />
      )}
    </div>
  );
};

export default FocusPage;
