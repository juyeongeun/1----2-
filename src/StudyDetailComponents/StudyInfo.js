import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import useFetchEmoji from "../hooks/useFetchEmoji.js";
import StudyShare from "./StudyShare.js";

import "./StudyInfo.css";

function StudyInfo() {
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false); // 공유 옵션 표시 상태

  // 커스텀 훅 사용
  const { emojis, loading, error, saveEmoji } = useFetchEmoji();

  const onEmojiClick = (emojiObject, event) => {
    const selectedEmoji = emojiObject.emoji;
    setChosenEmoji(selectedEmoji);
    saveEmoji(selectedEmoji); // 선택된 이모지를 DB에 저장
    setEmojiPickerVisible(false);
  };

  const onCountClick = (isExpanded) => () => {
    setIsExpanded(!isExpanded);
  };

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
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
          {isEmojiPickerVisible && <EmojiPicker onEmojiClick={onEmojiClick} />}
          <div>
            <span className="text color-G" onClick={handleShareClick}>
              공유하기
            </span>
            <span className="text color-G">| </span>
            <span className="text color-G">수정하기</span>
            <span className="text color-G">| </span>
            <span className="text color-B">스터디 삭제하기</span>
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
    </>
  );
}

export default StudyInfo;
