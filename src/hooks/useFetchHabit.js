import { useState, useEffect } from "react";
import axios from "axios";

function useFetchHabit(studyId) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "https://study-api-m36o.onrender.com/api/habits";

  useEffect(() => {
    const fetchHabits = async () => {
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
    };

    fetchHabits();
  }, [studyId]);

  const updateHabit = async (habitId, data) => {
    try {
      await axios.put(`${baseUrl}/${studyId}/${habitId}`, data);
    } catch (err) {
      setError(err.message);
    }
  };

  const createHabit = async (habitName) => {
    try {
      const response = await axios.post(`${baseUrl}/${studyId}`, { habitName });
      setHabits((prevHabits) => [...prevHabits, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`${baseUrl}/${studyId}/${habitId}`);
      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.habitId !== habitId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return { habits, loading, error, updateHabit, createHabit, deleteHabit };
}

export default useFetchHabit;
