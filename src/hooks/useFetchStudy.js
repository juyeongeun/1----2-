import { useState, useEffect } from "react";
import axios from "axios";

function useFetchStudy() {
  const [studyName, setStudyName] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [background, setBackground] = useState(null); // 배경 상태 추가
  const [password, setPassword] = useState("");
  const [point, setPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "https://study-api-m36o.onrender.com/api/studies";
  const id = 5; // 이 ID는 예시입니다. 실제로 필요에 따라 설정하세요.

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        const data = response.data;
        if (data) {
          setStudyName(data.studyName);
          setName(data.name);
          setContent(data.content);
          setBackground(data.background); // 배경 설정
          setPassword(data.password);
          setPoint(data.point);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyData();
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

  const updateStudy = async (updatedStudy) => {
    setLoading(true);
    try {
      await axios.put(`${baseUrl}/${id}`, updatedStudy);
      window.location.href = `/study/${id}`;
    } catch (err) {
      setError(err.message);
      alert("as");
    } finally {
      setLoading(false);
    }
  };

  return {
    studyName,
    name,
    point,
    content,
    background,
    password,
    loading,
    error,
    deleteStudy,
    updateStudy,
  };
}

export default useFetchStudy;
