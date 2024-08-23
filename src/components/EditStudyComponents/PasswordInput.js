import React from "react";
import ic_open_pw from "../../img/ic_open_pw.svg";
import ic_close_pw from "../../img/ic_close_pw.svg";

function PasswordInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  hasError,
  errorMsg,
  isPasswordVisible,
  togglePasswordVisibility,
}) {
  return (
    <div className="formGroup">
      <label>{label}</label>
      <div className="passwordGroup">
        <input
          name={name}
          type={isPasswordVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={hasError ? "inputError" : "input"}
        />
        <img
          src={isPasswordVisible ? ic_open_pw : ic_close_pw}
          alt="toggle visibility"
          className="passwordToggleIcon"
          onClick={togglePasswordVisibility}
        />
      </div>
      {hasError && <p className="errorMsg">{errorMsg}</p>}
    </div>
  );
}

export default PasswordInput;
