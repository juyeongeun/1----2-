import React from "react";

function LabeledInput({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  hasError,
  errorMsg,
}) {
  return (
    <div className="formGroup">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={hasError ? "inputError" : "input"}
      />
      {hasError && <p className="errorMsg">{errorMsg}</p>}
    </div>
  );
}

export default LabeledInput;
