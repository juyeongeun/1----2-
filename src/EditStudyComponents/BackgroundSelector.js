import React from "react";
import { backgrounds } from "../img/ImgImport.js";

function BackgroundSelector({ selectedBackground, handleBackgroundClick }) {
  return (
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
  );
}

export default BackgroundSelector;
