import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchEmoji from "../hooks/useFetchEmoji.js";
import useFetchStudy from "../hooks/useFetchStudy.js";
import StudyShare from "./StudyShare.js";
import "./StudyInfo.css";
import PasswordModal from "./PasswordModal.js";

function StudyInfo() {
  const { studyId } = useParams();
  console.log(studyId);
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");

  // 커스텀 훅 사용
  const { emojis, loading, error, saveEmoji } = useFetchEmoji(studyId);
  const { studyName, name, password, deleteStudy } = useFetchStudy(studyId); // deleteStudy 추가

  const onEmojiClick = (emojiObject, event) => {
    const selectedEmoji = emojiObject.emoji;
    setChosenEmoji(selectedEmoji);
    saveEmoji(selectedEmoji);
    setEmojiPickerVisible(false);
  };

  const onCountClick = (isExpanded) => () => {
    setIsExpanded(!isExpanded);
  };

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleModifyClick = (url, text, studyId) => {
    setModalButtonText(text);
    setRedirectUrl(url);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async () => {
    if (redirectUrl === "/") {
      try {
        await deleteStudy();
        alert("스터디가 성공적으로 삭제되었습니다.");
        window.location.href = redirectUrl;
      } catch (err) {
        console.error("스터디 삭제 중 오류가 발생했습니다:", err);
        alert("스터디 삭제 중 오류가 발생했습니다.");
      }
    } else {
      window.location.href = redirectUrl;
    }
  };

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
            <div className="emoji-picker-react">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <div className="share">
            <span className="text color-G" onClick={handleShareClick}>
              공유하기
            </span>
            <span className="text color-G">| </span>
            <span
              className="text color-G"
              onClick={() =>
                handleModifyClick(`/editStudy/${studyId}`, "수정하러가기")
              }
            >
              수정하기
            </span>
            <span className="text color-G">| </span>
            <span
              className="text color-B"
              onClick={() => handleModifyClick("/", "삭제하기")}
            >
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
        <div>{showShareOptions && <StudyShare />}</div>
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
