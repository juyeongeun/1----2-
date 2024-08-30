import React, { useReducer, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditStudyForm.css";
import useFetchStudy from "../../hooks/useFetchStudy.js";
import useInputValid from "../../hooks/useInputValid.js";
import LabeledInput from "./LabeledInput.js";
import BackgroundSelector from "./BackgroundSelector.js";
import PasswordInput from "./PasswordInput.js";
import SubmitButton from "./SubmitButton.js";
import { backgrounds } from "../../img/ImgImport.js";
import PasswordModal from "../StudyDetailComponents/PasswordModal.js";
import { useNavigate } from "react-router-dom";

const initialState = {
  nickname: "",
  studyNameState: "",
  description: "",
  selectedBackground: null,
  password: "",
  confirmPassword: "",
  isPasswordVisible: false,
  isPasswordVisible2: false,
  showErrors: {
    name: false,
    studyName: false,
    content: false,
    password: false,
    passwordConfirm: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_FIELDS":
      return { ...state, ...action.fields };
    case "SET_ERROR_VISIBILITY":
      return {
        ...state,
        showErrors: { ...state.showErrors, [action.field]: true },
      };
    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, isPasswordVisible: !state.isPasswordVisible };
    case "TOGGLE_PASSWORD_VISIBILITY2":
      return { ...state, isPasswordVisible2: !state.isPasswordVisible2 };
    default:
      return state;
  }
}

function EditStudyForm() {
  const { studyId } = useParams();
  const {
    studyName,
    name,
    content,
    background,
    password: storedPassword,
    loading,
    error,
    updateStudy,
  } = useFetchStudy(studyId);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const navigate = useNavigate();

  const {
    nickname,
    studyNameState,
    description,
    selectedBackground,
    password,
    confirmPassword,
    isPasswordVisible,
    isPasswordVisible2,
    showErrors,
  } = state;

  const { errors } = useInputValid({
    name: nickname,
    studyName: studyNameState,
    content: description,
    password,
    passwordConfirm: confirmPassword,
  });

  useEffect(() => {
    if (!loading && !error) {
      dispatch({
        type: "SET_FIELDS",
        fields: {
          nickname: name,
          studyNameState: studyName,
          description: content,
          selectedBackground: backgrounds.indexOf(background),
        },
      });
    }
  }, [loading, error, name, studyName, content, background]);

  useEffect(() => {
    // 모달을 열기 위한 기본 설정
    if (isPasswordCorrect) {
      setIsModalOpen(false); // 비밀번호가 확인되면 모달 닫기
    }
  }, [isPasswordCorrect]);

  const handleBlur = (e) => {
    const { name } = e.target;
    dispatch({ type: "SET_ERROR_VISIBILITY", field: name });
  };

  const handleBackgroundClick = (index) => {
    dispatch({ type: "SET_FIELD", field: "selectedBackground", value: index });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStudy({
      studyName: studyNameState,
      name: nickname,
      content: description,
      background: backgrounds[selectedBackground],
      password,
    });
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
  const handleModalSubmit = () => {
    setIsPasswordCorrect(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/study/${studyId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="editStudyContainer">
      <p className="editTitle">스터디 수정하기</p>
      <form className="editForm" onSubmit={handleSubmit}>
        <LabeledInput
          label="닉네임"
          name="name"
          type="text"
          value={nickname}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "nickname",
              value: e.target.value,
            })
          }
          onBlur={handleBlur}
          placeholder="닉네임을 입력해 주세요"
          hasError={showErrors.name && errors.name}
          errorMsg={errors.name}
        />
        <LabeledInput
          label="스터디 이름"
          name="studyName"
          type="text"
          value={studyNameState}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "studyNameState",
              value: e.target.value,
            })
          }
          onBlur={handleBlur}
          placeholder="스터디 이름을 입력해 주세요"
          hasError={showErrors.studyName && errors.studyName}
          errorMsg={errors.studyName}
        />
        <div className="formGroup">
          <label>소개</label>
          <textarea
            name="content"
            value={description}
            onBlur={handleBlur}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "description",
                value: e.target.value,
              })
            }
            placeholder="소개 멘트를 작성해 주세요"
            className={
              showErrors.content && errors.content
                ? "textareaError"
                : "textarea"
            }
          />
          {showErrors.content && errors.content && (
            <p className="errorMsg">{errors.content}</p>
          )}
        </div>
        <BackgroundSelector
          selectedBackground={selectedBackground}
          handleBackgroundClick={handleBackgroundClick}
        />
        <PasswordInput
          label="비밀번호"
          name="password"
          value={password}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "password",
              value: e.target.value,
            })
          }
          onBlur={handleBlur}
          placeholder="비밀번호를 입력해 주세요"
          hasError={showErrors.password && errors.password}
          errorMsg={errors.password}
          isPasswordVisible={isPasswordVisible}
          togglePasswordVisibility={() =>
            dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY" })
          }
        />
        <PasswordInput
          label="비밀번호 확인"
          name="passwordConfirm"
          value={confirmPassword}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "confirmPassword",
              value: e.target.value,
            })
          }
          onBlur={handleBlur}
          placeholder="비밀번호를 다시 입력해 주세요"
          hasError={showErrors.passwordConfirm && errors.passwordConfirm}
          errorMsg={errors.passwordConfirm}
          isPasswordVisible={isPasswordVisible2}
          togglePasswordVisibility={() =>
            dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY2" })
          }
        />
        <SubmitButton isFormValid={isFormValid} />
      </form>
      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        correctPassword={storedPassword}
        studyName={studyName}
        name={name}
        buttonText={"수정하러가기"}
      />
    </div>
  );
}

export default EditStudyForm;
