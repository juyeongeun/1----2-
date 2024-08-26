import { useState, useEffect } from 'react';
import axios from 'axios';

function useStudiesListId(ids) {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all(
          ids.map((id) =>
            axios.get(`https://study-api-m36o.onrender.com/api/studies/${id}`)
          )
        );
        setRecent(responses.map((response) => response.data));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [ids]);

  return { recent, loading, error };
}

export default useStudiesListId;
