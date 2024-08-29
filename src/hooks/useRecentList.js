import { useState, useEffect } from 'react';
import axios from 'axios';

function useStudiesListId(ids) {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState([]);

  useEffect(() => {
    async function fetchData() {
      //status의 결과값에 따라 데이터 분류 가능
      const responses = await Promise.allSettled(
        ids.map((id) =>
          axios.get(`https://study-api-m36o.onrender.com/api/studies/${id}`)
        )
      );

      // 삭제되지 않은 데이터는 데이터를 받아서 전송
      const successfulResponses = responses
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value.data);

      // 삭제된 데이터는 주소에서 아이디를 받아와서 배열로 받아옴
      // 에러는 여기서 직접 해결함(catch문을 거치치 않음)
      const failedIds = responses
        .filter((result) => result.status === 'rejected')
        .map((result) => result.reason.config.url.split('/').pop());

      setRecent(successfulResponses);
      setDeleteId(failedIds);
      setLoading(false);

      setError(null); // 에러를 무시하고 null로 설정
      setLoading(false);
    }

    fetchData();
  }, [ids]);

  return { recent, loading, deleteId, error };
}

export default useStudiesListId;
