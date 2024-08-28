import axios from "axios";
const baseUrl = "https://study-api-m36o.onrender.com/api/";

export const setPoint = async (currentPoint, studyId) => {
  try {
    const res = await axios.post(`${baseUrl}/focus/${studyId}`, {
      point: currentPoint,
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
