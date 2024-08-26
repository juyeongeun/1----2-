import styles from "./CreateBackground.module.css";
import React, { useState } from "react";
import backgroundGreen from "../../img/background/background_1.png";
import backgroundYe from "../../img/background/background_2.png";
import backgroundBlu from "../../img/background/background_3.png";
import backgroundPink from "../../img/background/background_4.png";
import backgroundTable from "../../img/background/background_5.png";
import backgroundSun from "../../img/background/background_6.png";
import backgroundRain from "../../img/background/background_7.png";
import backgroundPlan from "../../img/background/background_8.png";
import backgroundIcon from "../../img/background/background_icon.png";

const images = [
  backgroundGreen,
  backgroundYe,
  backgroundBlu,
  backgroundPink,
  backgroundTable,
  backgroundSun,
  backgroundRain,
  backgroundPlan,
];

function Background({ handleChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (index) => {
    setSelectedIndex(index);

    const value = images[index];
    const name = "background";
    handleChange({ name, value });
  };

  return (
    <>
      <p className={styles.text}>배경을 선택해 주세요</p>
      <div className={styles.gallery}>
        {images.map((src, index) => (
          <div className={styles.container} key={index}>
            <img
              src={src}
              key={index}
              alt={`Img ${index}`}
              onClick={() => handleClick(index)}
            />
            {index === selectedIndex && (
              <img
                src={backgroundIcon}
                alt="이미지선택아이콘"
                className={styles.iconImage}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Background;
