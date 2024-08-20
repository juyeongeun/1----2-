import { useState, useEffect } from "react";
import axios from "axios";

function useFetchStudy(studyId) {
  const [studyName, setStudyName] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [background, setBackground] = useState(null); // 배경 상태 추가
  const [password, setPassword] = useState("");
  const [point, setPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "https://study-api-m36o.onrender.com/api/studies";

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${studyId}`);
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
  }, [studyId]);

  const deleteStudy = async () => {
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/${studyId}`);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateStudy = async (updatedStudy) => {
    setLoading(true);
    try {
      await axios.put(`${baseUrl}/${studyId}`, updatedStudy);
      window.location.href = `/study/${studyId}`;
    } catch (err) {
      setError(err.message);
      alert("as");
    } finally {
      setLoading(false);
    }
  };

  const createStudy = async (newStudy) => {
    setLoading(true);
    try {
      const response = await axios.post(baseUrl, newStudy);
      setLoading(false);
      return response.data; // 생성된 스터디 데이터를 반환
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err; // 오류가 발생하면 예외를 던져서 호출자가 처리할 수 있게 함
    }
  };

  return {
    createStudy,
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
