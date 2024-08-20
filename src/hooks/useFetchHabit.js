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

  return { habits, loading, error };
}

export default useFetchHabit;
