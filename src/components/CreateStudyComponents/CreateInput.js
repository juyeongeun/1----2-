import styles from "./CreateInput.module.css";

function Input({ handleChange, showErrors, handleBlur, errors, hasError }) {
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };
  return (
    <>
      <div>
        <p className={styles.text}>닉네임</p>
        <input
          name="name"
          onBlur={handleBlur}
          onChange={handleInputValue}
          className={hasError("name") ? styles.inputError : styles.input}
          placeholder="닉네임을 입력해 주세요"
        />
        {showErrors.name && <p className={styles.errorMsg}>{errors.name}</p>}
        <p className={styles.text}>스터디이름</p>
        <input
          name="studyName"
          onBlur={handleBlur}
          onChange={handleInputValue}
          className={hasError("studyName") ? styles.inputError : styles.input}
          placeholder="스터디 이름을 입력해 주세요"
        />
        {showErrors.studyName && (
          <p className={styles.errorMsg}>{errors.studyName}</p>
        )}
        <p className={styles.text}>소개</p>
        <textarea
          name="content"
          onBlur={handleBlur}
          onChange={handleInputValue}
          className={
            hasError("content") ? styles.textareaError : styles.textarea
          }
          placeholder="소개 멘트를 작성해 주세요"
        />
        {showErrors.content && (
          <p className={styles.errorMsg}> {errors.content}</p>
        )}
      </div>
    </>
  );
}

export default Input;
