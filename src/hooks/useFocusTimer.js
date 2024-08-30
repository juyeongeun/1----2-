import axios from "axios";
import { useEffect, useState } from "react";

const useFocusTimer = (studyId) => {
  const baseUrl = "https://study-api-m36o.onrender.com/api";
  const [currentPoint, setCurrentPoint] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startFocus = async () => {
      const getPoint = async (studyId) => {
        try {
          const res = await axios.get(`${baseUrl}/studies/${studyId}`);
          const { point } = res.data;
          return point;
        } catch (e) {
          return e.response;
        }
      };
      try {
        const point = await getPoint(studyId);
        setCurrentPoint(point);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    startFocus();
  }, [studyId]);

  const updatePoint = async (currentPoint, point, studyId) => {
    const setPoint = async (currentPoint, studyId) => {
      try {
        const res = await axios.post(`${baseUrl}/focus/${studyId}`, {
          point: currentPoint,
        });
        return res;
      } catch (e) {
        return e.response;
      }
    };
    const totalPoint = currentPoint + parseInt(point);
    const res = await setPoint(totalPoint, studyId);
    console.log(res);
  };

  const timeParser = (time) => {
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

  return {
    currentPoint,
    setCurrentPoint,
    loading,
    error,
    updatePoint,
    timeParser,
  };
};

export default useFocusTimer;
