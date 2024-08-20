import React, { useState, useEffect } from "react";
import "../css/reset.css";
import "./EditStudyForm.css";
import { backgrounds } from "../img/ImgImport.js";
import useFetchStudy from "../hooks/useFetchStudy.js";
import ic_open_pw from "../img/ic_open_pw.svg";
import ic_close_pw from "../img/ic_close_pw.svg";

function EditStudyForm() {
  const {
    studyName,
    name,
    content,
    background,
    password: initialPassword,
    loading,
    error,
    updateStudy,
  } = useFetchStudy();

  const [nickname, setNickname] = useState(name || "");
  const [studyNameState, setStudyNameState] = useState(studyName || "");
  const [description, setDescription] = useState(content || "");
  const [selectedBackground, setSelectedBackground] = useState(null); // 초기값은 null로 설정
  const [password, setPassword] = useState(initialPassword || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  useEffect(() => {
    if (!loading && !error) {
      setNickname(name);
      setStudyNameState(studyName);
      setDescription(content);
      setPassword(initialPassword);
      setSelectedBackground(backgrounds.indexOf(background)); // 초기 선택된 배경 설정
    }
  }, [loading, error, name, studyName, content, background, initialPassword]);

  const handleBackgroundClick = (index) => {
    setSelectedBackground(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStudy({
      studyName: studyNameState,
      name: nickname,
      content: description,
      background: backgrounds[selectedBackground], // 선택된 배경의 URL 전송
      password,
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="editStudyContainer">
      <p className="editTitle">스터디 수정하기</p>
      <form className="editForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요"
          />
        </div>
        <div className="formGroup">
          <label>스터디 이름</label>
          <input
            type="text"
            value={studyNameState}
            onChange={(e) => setStudyNameState(e.target.value)}
            placeholder="스터디 이름을 입력해 주세요"
          />
        </div>
        <div className="formGroup">
          <label>소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="소개 멘트를 작성해 주세요"
          ></textarea>
        </div>
        <div className="formGroup">
          <label>배경을 선택해 주세요</label>
          <div className="backgroundOptions">
            {backgrounds.map((src, index) => (
              <div
                key={index}
                className={`backgroundOption ${
                  selectedBackground === index ? "selected" : ""
                }`}
                onClick={() => handleBackgroundClick(index)}
                style={{ backgroundImage: `url(${src})` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="formGroup">
          <label>비밀번호</label>
          <div className="passwordContainer">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
            />
            <img
              src={isPasswordVisible ? ic_open_pw : ic_close_pw}
              alt="toggle visibility"
              className="passwordToggleIcon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <div className="formGroup">
          <label>비밀번호 확인</label>
          <div className="passwordContainer">
            <input
              type={isPasswordVisible2 ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력해 주세요"
            />
            <img
              src={isPasswordVisible2 ? ic_open_pw : ic_close_pw}
              alt="toggle visibility"
              className="passwordToggleIcon"
              onClick={togglePasswordVisibility2}
            />
          </div>
        </div>
        <button type="submit" className="editButton">
          수정
        </button>
      </form>
    </div>
  );
}

export default EditStudyForm;
