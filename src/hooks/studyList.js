import { useState, useEffect } from 'react';
import axios from 'axios';

function useInputValid({ orderBy, offset, limit, keyword }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const instance = axios.create({
    baseURL: 'https://study-api-m36o.onrender.com/api/',
  });

  console.log({ orderBy, offset, limit, keyword });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await instance.get('/studies', {
          params: {
            orderBy,
            limit,
            offset,
            keyword,
          },
        });
        setLoading(true);
        console.log(response.data);
        setData(response.data.study || []);
        setTotal(response.data.totalCount);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderBy, offset, limit, keyword]);

  return { data, total, loading, error, keyword };
}

export default useInputValid;
