import React from "react";

function SubmitButton({ isFormValid }) {
  return (
    <button type="submit" className="editButton" disabled={!isFormValid()}>
      수정하기
    </button>
  );
}

export default SubmitButton;
