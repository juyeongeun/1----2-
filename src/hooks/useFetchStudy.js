import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function useFetchStudy(studyId) {
  const [studyName, setStudyName] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [background, setBackground] = useState(null); // 배경 상태 추가
  const [password, setPassword] = useState("");
  const [point, setPoint] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩 상태 초기값을 false로 설정
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = "https://study-api-m36o.onrender.com/api/studies";

  useEffect(() => {
    if (studyId) {
      // studyId가 존재하는 경우에만 데이터 로드
      const fetchStudyData = async () => {
        setLoading(true); // 로딩 시작
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
          setLoading(false); // 로딩 종료
        }
      };

      fetchStudyData();
    }
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
      navigate(`/study/${studyId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createStudy = async (newStudy) => {
    setLoading(true);
    try {
      const response = await axios.post(baseUrl, newStudy);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
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
