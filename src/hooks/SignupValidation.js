import { useEffect, useState } from 'react';

function useInputValid(values) {
  const [errors, setErrors] = useState({
    name: false,
    content: false,
    password: false,
    passwordConfirm: false,
  });

  useEffect(() => {
    validateForm();
  }, [values]);

  const validateForm = () => {
    let errors = {};

    const name = values.name || '';
    const studyName = values.studyName || '';
    const content = values.content || '';
    const password = values.password || '';
    const passwordConfirm = values.passwordConfirm || '';

    console.log(values.name);

    if (name.length < 1) {
      errors.name = '1글자 이상 입력해야 합니다';
    } else if (name.length > 10) {
      errors.name = '10글지 이내로 입력해야 합니다';
    }

    if (studyName.length < 1) {
      errors.studyName = '1글자 이상 입력해야 합니다';
    } else if (studyName.length > 10) {
      errors.studyName = '10글지 이내로 입력해야 합니다';
    }

    if (content.length < 1) {
      errors.content = '1글자 이상 입력해야 합니다';
    } else if (content.length > 100) {
      errors.content = ' 100글자 이내로 입력해야 합니다';
    }

    if (password.length < 5) {
      errors.password = '5글자 이상 입력해야 합니다';
    } else if (password.length > 10) {
      errors.password = '10글자 이내로 입력해야 합니다';
    }

    if (password !== passwordConfirm) {
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다';
    }

    setErrors(errors);
  };

  const validate = () => {
    validateForm();
  };

  return { errors, validate };
}

export default useInputValid;
