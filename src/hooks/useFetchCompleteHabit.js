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

  return { completeHabits, loading, error };
}

export default useFetchCompleteHabit;
