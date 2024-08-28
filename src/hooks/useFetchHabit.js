import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchHabit(studyId) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "https://study-api-m36o.onrender.com/api/habits";

  // 데이터 fetch 함수는 useCallback으로 메모이제이션
  const fetchHabits = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/${studyId}`);
      const data = response.data.map((item) => ({
        habitId: item.id,
        habitName: item.habitName,
        isActive: item.isActive,
        endDate: item.endDate,
      }));
      setHabits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    if (studyId) {
      fetchHabits();
    }
  }, [studyId, fetchHabits]);

  const updateHabit = async (habitId, data) => {
    try {
      await axios.put(`${baseUrl}/${studyId}/${habitId}`, data);
      await fetchHabits(); // 업데이트 후 데이터 재로드
    } catch (err) {
      setError(err.message);
    }
  };

  const createHabit = async (habitName) => {
    try {
      const response = await axios.post(`${baseUrl}/${studyId}`, { habitName });
      setHabits((prevHabits) => [...prevHabits, response.data]); // 새로 생성된 데이터 추가
      return response.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`${baseUrl}/${studyId}/${habitId}`);
      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.habitId !== habitId)
      ); // 삭제된 데이터 필터링
    } catch (err) {
      setError(err.message);
    }
  };

  return { habits, loading, error, updateHabit, createHabit, deleteHabit };
}

export default useFetchHabit;
