import { useEffect, useState } from "react";

function useInputValid(values) {
  const [errors, setErrors] = useState({
    name: false,
    content: false,
    password: false,
    passwordConfirm: false,
  });

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const validateForm = () => {
      let errors = {};
      let isFormValid = true;

      const name = values.name || "";
      const studyName = values.studyName || "";
      const content = values.content || "";
      const password = values.password || "";
      const passwordConfirm = values.passwordConfirm || "";

      if (name.length < 1) {
        errors.name = "1글자 이상 입력해야 합니다";
        isFormValid = false;
      } else if (name.length > 10) {
        errors.name = "10글자 이내로 입력해야 합니다";
        isFormValid = false;
      }

      if (studyName.length < 1) {
        errors.studyName = "1글자 이상 입력해야 합니다";
        isFormValid = false;
      } else if (studyName.length > 10) {
        errors.studyName = "10글자 이내로 입력해야 합니다";
        isFormValid = false;
      }

      if (content.length < 1) {
        errors.content = "1글자 이상 입력해야 합니다";
        isFormValid = false;
      } else if (content.length > 100) {
        errors.content = "100글자 이내로 입력해야 합니다";
        isFormValid = false;
      }

      if (password.length < 5) {
        errors.password = "5글자 이상 입력해야 합니다";
        isFormValid = false;
      } else if (password.length > 10) {
        errors.password = "10글자 이내로 입력해야 합니다";
        isFormValid = false;
      }

      if (password !== passwordConfirm) {
        errors.passwordConfirm = "비밀번호가 일치하지 않습니다";
      }

      setErrors(errors);
      setIsValid(isFormValid);
    };

    validateForm();
  }, [values]);

  const validateForm = () => {
    let errors = {};
    let isFormValid = true;

    const name = values.name || '';
    const studyName = values.studyName || '';
    const content = values.content || '';
    const password = values.password || '';
    const passwordConfirm = values.passwordConfirm || '';

    if (name.length < 1) {
      errors.name = '1글자 이상 입력해야 합니다';
      isFormValid = false;
    } else if (name.length > 3) {
      errors.name = '3글자 이내로 입력해야 합니다';
      isFormValid = false;
    }

    if (studyName.length < 1) {
      errors.studyName = '1글자 이상 입력해야 합니다';
      isFormValid = false;
    } else if (studyName.length > 10) {
      errors.studyName = '10글자 이내로 입력해야 합니다';
      isFormValid = false;
    }

    if (content.length < 1) {
      errors.content = '1글자 이상 입력해야 합니다';
      isFormValid = false;
    } else if (content.length > 100) {
      errors.content = ' 100글자 이내로 입력해야 합니다';
      isFormValid = false;
    }

    if (password.length < 5) {
      errors.password = '5글자 이상 입력해야 합니다';
      isFormValid = false;
    } else if (password.length > 10) {
      errors.password = '10글자 이내로 입력해야 합니다';
      isFormValid = false;
    }

    if (password !== passwordConfirm) {
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다';
    }

    setErrors(errors);
    setIsValid(isFormValid);
  };

  return { errors, isValid };
}

export default useInputValid;
