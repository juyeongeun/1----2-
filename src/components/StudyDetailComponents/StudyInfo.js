import EmojiPicker from "emoji-picker-react";
import React, { useState, useRef, useEffect } from "react";
import useFetchEmoji from "../../hooks/useFetchEmoji.js";
import StudyShare from "./StudyShare.js";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./StudyInfo.css";
import PasswordModal from "./PasswordModal.js";

function StudyInfo({ studyName, name, password, deleteStudy, studyId }) {
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");
  const navigate = useNavigate();
  const { emojis, loading, error, saveEmoji } = useFetchEmoji(studyId);

  const emojiPickerRef = useRef(null);
  const shareOptionsRef = useRef(null);

  const onEmojiClick = (emojiObject, event) => {
    const selectedEmoji = emojiObject.emoji;
    saveEmoji(selectedEmoji);
    setEmojiPickerVisible(false);
  };

  const onCountClick = (isExpanded) => () => {
    setIsExpanded(!isExpanded);
  };

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleModifyClick = (url) => {
    navigate(url);
  };

  const handleDeleteClick = () => {
    setModalButtonText("삭제하기");
    setRedirectUrl("/");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async () => {
    if (redirectUrl === "/") {
      try {
        await deleteStudy();
        navigate("/", { state: { toast: "deleted" } });
      } catch (err) {
        alert("스터디 삭제 중 오류가 발생했습니다.");
      }
    } else {
      navigate(redirectUrl);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isEmojiPickerVisible &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setEmojiPickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEmojiPickerVisible, showShareOptions]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const hiddenEmojiCount = emojis.length - 3;

  return (
    <>
      <div className="studyInfo">
        <div className="headerInfo">
          <div className="emojis">
            {emojis.slice(0, 3).map((item, id) => (
              <div key={id} className="emojiItem">
                {item.emoji}
                <span className="emojiCount">{item.count}</span>
              </div>
            ))}
            {hiddenEmojiCount > 0 && (
              <div
                className="emojiItem moreEmoji"
                onClick={onCountClick(isExpanded)}
              >
                + {hiddenEmojiCount}..
              </div>
            )}
            <button
              className="emojiBtn"
              onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
            >
              추가
            </button>
          </div>
          {isEmojiPickerVisible && (
            <div className="emoji-picker-react" ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <div className="share" ref={shareOptionsRef}>
            <span className="text color-G" onClick={handleShareClick}>
              공유하기
            </span>
            <span className="text color-G">| </span>
            <span
              className="text color-G"
              onClick={() => handleModifyClick(`/editStudy/${studyId}`)}
            >
              수정하기
            </span>
            <span className="text color-G">| </span>
            <span className="text color-B" onClick={handleDeleteClick}>
              스터디 삭제하기
            </span>
          </div>
        </div>
        <div className="emoji-dropdown">
          {isExpanded && (
            <div className="expandedEmojiList">
              {emojis.slice(3, emojis.length).map((item, id) => (
                <div key={id} className="emojiItemDrop">
                  {item.emoji}
                  <span className="emojiCount">{item.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {showShareOptions && (
            <StudyShare
              id={studyId}
              name={name}
              onShareClick={handleShareClick}
            />
          )}
        </div>
        <ToastContainer />
      </div>
      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        correctPassword={password}
        studyName={studyName}
        name={name}
        buttonText={modalButtonText}
      />
    </>
  );
}

export default StudyInfo;
