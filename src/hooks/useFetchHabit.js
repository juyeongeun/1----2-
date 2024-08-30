import { useState, useCallback, useEffect } from "react";
import axios from "axios";

function useFetchHabit(studyId) {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = "https://study-api-m36o.onrender.com/api/habits";

  const fetchHabits = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/${studyId}`);
      const data = response.data.map((item) => ({
        habitId: item.id,
        habitName: item.habitName,
        isActive: item.isActive,
        endDate: item.endDate,
      }));
      const sortedData = data.sort((a, b) => a.habitId - b.habitId);
      setHabits(sortedData);
    } catch (err) {
      setError(err.message);
    }
  }, [studyId]);

  useEffect(() => {
    if (studyId) {
      fetchHabits();
    }
  }, [studyId, fetchHabits]);

  const updateHabits = async (updates) => {
    try {
      await Promise.all(
        updates.map(({ habitId, data }) =>
          axios.put(`${baseUrl}/${studyId}/${habitId}`, data)
        )
      );
      fetchHabits();
    } catch (err) {
      setError(err.message);
    }
  };

  const createHabit = async (habitName) => {
    try {
      await axios.post(`${baseUrl}/${studyId}`, { habitName });
    } catch (err) {
      setError(err.message);
    }
    await fetchHabits();
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

  return { habits, error, updateHabits, createHabit, deleteHabit };
}

export default useFetchHabit;
