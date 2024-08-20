import { useState, useEffect } from 'react';
import { getStudiesList } from '../api/Studyhome.js'; // 데이터 요청을 위한 함수\

function useInputValid({ orderBy, offset, limit, keyword }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log({ orderBy, offset, limit, keyword });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getStudiesList({
          orderBy,
          offset,
          offset,
          keyword,
        });
        console.log('API Response:', response);
        console.log(response.data);
        setData(response.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderBy, offset, limit, keyword]);

  return { data, loading, error, keyword };
}

export default useInputValid;
