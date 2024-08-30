import { useState, useEffect } from "react";
import axios from "axios";

function useFetchCompleteHabit(studyId) {
  const [completeHabits, setCompleteHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "https://study-api-m36o.onrender.com/api/completeHabits";

  useEffect(() => {
    const fetchCompleteHabits = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${studyId}`);
        setCompleteHabits(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleteHabits();
  }, [studyId]);

  const completeHabit = async (habitId) => {
    try {
      const response = await axios.post(`${baseUrl}/${studyId}/${habitId}`);
      setCompleteHabits((prevHabits) => [...prevHabits, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  return { completeHabits, loading, error, completeHabit };
}

export default useFetchCompleteHabit;
