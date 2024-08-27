import axios from "axios";
const baseUrl = "https://study-api-m36o.onrender.com/api/";

export const setPoint = async (currentPoint, studyId) => {
  const res = await axios.post(`${baseUrl}/focus/${studyId}`, {
    point: currentPoint,
  });
  return res;
};
