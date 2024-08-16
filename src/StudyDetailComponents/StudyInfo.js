import { Link } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import useFetchEmoji from "../hooks/useFetchEmoji.js";
import "./StudyInfo.css";

function StudyInfo() {
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // 커스텀 훅 사용
  const { emojis, loading, error, saveEmoji } = useFetchEmoji();

  const onEmojiClick = (emojiObject, event) => {
    const selectedEmoji = emojiObject.emoji;
    setChosenEmoji(selectedEmoji);
    saveEmoji(selectedEmoji); // 선택된 이모지를 DB에 저장
    setEmojiPickerVisible(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // 표시할 이모지를 결정
  const visibleEmojis = isExpanded ? emojis : emojis.slice(0, 3);
  const hiddenEmojiCount = emojis.length - 3;

  return (
    <div className="studyInfo">
      <div className="headerInfo">
        <div className="emojis">
          {visibleEmojis.map((item, id) => (
            <div key={id} className="emojiItem">
              {item.emoji} {item.count}
            </div>
          ))}
          {!isExpanded && hiddenEmojiCount > 0 && (
            <div className="emojiItem" onClick={() => setIsExpanded(true)}>
              + {hiddenEmojiCount}..
            </div>
          )}
          {isExpanded && (
            <div className="expandedEmojiList">
              {emojis.slice(3).map((item, id) => (
                <div key={id} className="emojiItem">
                  {item.emoji} {item.count}
                </div>
              ))}
            </div>
          )}
          <button
            className="emojiBtn"
            onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
          >
            추가
          </button>
          {isEmojiPickerVisible && <EmojiPicker onEmojiClick={onEmojiClick} />}
        </div>
        <div>
          <Link to="/" className="linkTo">
            공유하기
          </Link>
          <span className="linkTo">| </span>
          <Link to="/" className="linkTo">
            수정하기
          </Link>
          <span className="linkTo">| </span>
          <Link to="/" className="linkTo">
            스터디 삭제하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudyInfo;
