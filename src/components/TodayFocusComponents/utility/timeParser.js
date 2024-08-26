export const timeParser = (time) => {
  if (time >= 0) {
    const hours =
      parseInt(time / 60) <= 9
        ? `0${parseInt(time / 60)}`
        : parseInt(time / 60);
    const seconds =
      parseInt(time % 60) <= 9
        ? `0${parseInt(time % 60)}`
        : parseInt(time % 60);
    return `${hours}:${seconds}`;
  } else {
    const signTime = time * -1;
    const hours =
      parseInt(signTime / 60) <= 9
        ? `-0${parseInt(signTime / 60)}`
        : `-${parseInt(signTime / 60)}`;
    const seconds =
      parseInt(signTime % 60) <= 9
        ? `0${parseInt(signTime % 60)}`
        : parseInt(signTime % 60);
    return `${hours}:${seconds}`;
  }
};
