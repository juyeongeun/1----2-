import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditStudyForm.css";
import { backgrounds } from "../img/ImgImport.js";
import useFetchStudy from "../hooks/useFetchStudy.js";
import ic_open_pw from "../img/ic_open_pw.svg";
import ic_close_pw from "../img/ic_close_pw.svg";
import useInputValid from "../hooks/useInputValid.js";

function EditStudyForm() {
  const { studyId } = useParams();
  const { studyName, name, content, background, loading, error, updateStudy } =
    useFetchStudy(studyId);

  const [showErrors, setShowErrors] = useState({
    name: false,
    studyName: false,
    content: false,
    password: false,
    passwordConfirm: false,
  });

  const [values, setValues] = useState({});
  const [nickname, setNickname] = useState(name || "");
  const [studyNameState, setStudyNameState] = useState(studyName || "");
  const [description, setDescription] = useState(content || "");
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  const { errors } = useInputValid(values);

  useEffect(() => {
    setValues({
      name: nickname,
      studyName: studyNameState,
      content: description,
      password: password,
      passwordConfirm: confirmPassword,
    });
  }, [
    loading,
    nickname,
    studyNameState,
    description,
    password,
    confirmPassword,
  ]);

  const handleBlur = (e) => {
    const { name } = e.target;
    setShowErrors({ ...showErrors, [name]: true });
  };

  const hasError = (name) => {
    return showErrors[name] && errors[name];
  };

  useEffect(() => {
    if (!loading && !error) {
      setNickname(name);
      setStudyNameState(studyName);
      setDescription(content);
      setPassword("");
      setSelectedBackground(backgrounds.indexOf(background)); // 초기 선택된 배경 설정
    }
  }, [loading, error, name, studyName, content, background]);

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

  const isFormValid = () => {
    return (
      nickname.trim() !== "" &&
      studyNameState.trim() !== "" &&
      description.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      Object.keys(errors).length === 0
    );
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
            name="name"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={handleBlur}
            placeholder="닉네임을 입력해 주세요"
            className={hasError("name") ? "inputError" : "input"}
          />
          {hasError("name") && <p className="errorMsg">{errors.name}</p>}
        </div>
        <div className="formGroup">
          <label>스터디 이름</label>
          <input
            name="studyName"
            type="text"
            value={studyNameState}
            onBlur={handleBlur}
            onChange={(e) => setStudyNameState(e.target.value)}
            placeholder="스터디 이름을 입력해 주세요"
            className={hasError("studyName") ? "inputError" : "input"}
          />
          {hasError("studyName") && (
            <p className="errorMsg">{errors.studyName}</p>
          )}
        </div>
        <div className="formGroup">
          <label>소개</label>
          <textarea
            name="content"
            value={description}
            onBlur={handleBlur}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="소개 멘트를 작성해 주세요"
            className={hasError("content") ? "textareaError" : "textarea"}
          />
          {hasError("content") && <p className="errorMsg">{errors.content}</p>}
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
          <div className="passwordGroup">
            <input
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onBlur={handleBlur}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              className={hasError("studyName") ? "inputError" : "input"}
            />
            <img
              src={isPasswordVisible ? ic_open_pw : ic_close_pw}
              alt="toggle visibility"
              className="passwordToggleIcon"
              onClick={togglePasswordVisibility}
            />
          </div>
          {hasError("password") && (
            <p className="errorMsg">{errors.password}</p>
          )}
        </div>
        <div className="formGroup">
          <label>비밀번호 확인</label>
          <div className="passwordGroup">
            <input
              name="passwordConfirm"
              type={isPasswordVisible2 ? "text" : "password"}
              value={confirmPassword}
              onBlur={handleBlur}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력해 주세요"
              className={hasError("studyName") ? "inputError" : "input"}
            />
            <img
              src={isPasswordVisible2 ? ic_open_pw : ic_close_pw}
              alt="toggle visibility"
              className="passwordToggleIcon"
              onClick={togglePasswordVisibility2}
            />
          </div>
          {hasError("passwordConfirm") && (
            <p className="errorMsg">{errors.passwordConfirm}</p>
          )}
        </div>
        <button type="submit" className="editButton" disabled={!isFormValid()}>
          수정하기
        </button>
      </form>
    </div>
  );
}

export default EditStudyForm;
