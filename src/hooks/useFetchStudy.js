import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function useFetchStudy(studyId) {
  const [state, setState] = useState({
    studyName: "",
    name: "",
    content: "",
    background: "",
    point: 0,
    password: "",
    loading: false,
    error: null,
  });

  const navigate = useNavigate();
  const baseUrl = "https://study-api-m36o.onrender.com/api/studies";

  useEffect(() => {
    if (studyId) {
      const fetchStudyData = async () => {
        setState((prevState) => ({ ...prevState, loading: true }));
        try {
          const response = await axios.get(`${baseUrl}/${studyId}`);
          const data = response.data;
          setState((prevState) => ({
            ...prevState,
            ...data,
            loading: false,
          }));
        } catch (err) {
          setState((prevState) => ({
            ...prevState,
            error: err.message,
            loading: false,
          }));
        }
      };

      fetchStudyData();
    }
  }, [studyId]);

  const deleteStudy = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      await axios.delete(`${baseUrl}/${studyId}`);
      setState((prevState) => ({ ...prevState, loading: false }));
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        error: err.message,
        loading: false,
      }));
    }
  };

  const updateStudy = async (updatedStudy) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      await axios.put(`${baseUrl}/${studyId}`, updatedStudy);
      navigate(`/study/${studyId}`);
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        error: err.message,
      }));
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const createStudy = async (newStudy) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await axios.post(baseUrl, newStudy);
      setState((prevState) => ({ ...prevState, loading: false }));
      return response.data;
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        error: err.message,
        loading: false,
      }));
      throw err;
    }
  };

  return {
    createStudy,
    studyName: state.studyName,
    name: state.name,
    content: state.content,
    background: state.background,
    point: state.point,
    password: state.password,
    loading: state.loading,
    error: state.error,
    deleteStudy,
    updateStudy,
  };
}

export default useFetchStudy;
