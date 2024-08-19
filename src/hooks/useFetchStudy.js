import { useState, useEffect } from "react";
import axios from "axios";

function useFetchStudy() {
  const [studyName, setStudyName] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [point, setPoint] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "https://study-api-m36o.onrender.com/api/studies";
  const id = 5; // 이 ID는 예시입니다. 실제로 필요에 따라 설정하세요.

  useEffect(() => {
    const fetchStudyName = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        const data = response.data;
        if (data) {
          setStudyName(data.studyName);
          setName(data.name);
          setContent(data.content);
          setPoint(data.point);
          setPassword(data.password);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyName();
  }, []);

  const deleteStudy = async () => {
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return {
    studyName,
    name,
    point,
    content,
    password,
    loading,
    error,
    deleteStudy,
  };
}

export default useFetchStudy;
