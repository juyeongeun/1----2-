import { useState, useEffect } from "react"; // React에서 상태 관리와 사이드 이펙트를 처리하기 위한 훅을 가져옵니다.
import axios from "axios"; // HTTP 요청을 보내기 위해 Axios 라이브러리를 가져옵니다.

function useFetchHabit(studyId) {
  // 이 커스텀 훅은 주어진 studyId에 해당하는 습관 데이터를 가져옵니다.

  const [habits, setHabits] = useState([]); // 습관 데이터를 저장하기 위한 상태를 정의합니다. 초기값은 빈 배열입니다.
  const [loading, setLoading] = useState(true); // 데이터가 로딩 중인지 여부를 나타내는 상태를 정의합니다. 초기값은 true입니다.
  const [error, setError] = useState(null); // 에러 메시지를 저장하기 위한 상태를 정의합니다. 초기값은 null입니다.

  const baseUrl = "https://study-api-m36o.onrender.com/api/habits"; // API 요청의 기본 URL을 정의합니다.

  useEffect(() => {
    // studyId가 변경될 때마다 이 효과가 실행됩니다. 주로 API 요청을 위해 사용됩니다.
    const fetchHabits = async () => {
      // 비동기 함수로, API로부터 데이터를 가져오는 작업을 수행합니다.
      try {
        const response = await axios.get(`${baseUrl}/${studyId}`);
        // Axios를 사용하여 API에 GET 요청을 보냅니다. studyId를 URL의 일부로 사용합니다.

        const data = response.data.map((item) => ({
          // 가져온 데이터를 필요한 형태로 변환하여 data 변수에 저장합니다.
          habitId: item.id, // 각 항목의 id를 habitId로 저장합니다.
          habitName: item.habitName, // 각 항목의 habitName을 그대로 저장합니다.
          isActive: item.isActive, // 각 항목의 isActive 상태를 그대로 저장합니다.
        }));

        setHabits(data); // 변환된 데이터를 habits 상태로 업데이트합니다.
      } catch (err) {
        setError(err.message); // 오류가 발생하면 오류 메시지를 error 상태로 설정합니다.
      } finally {
        setLoading(false); // 데이터 가져오기 작업이 끝나면 로딩 상태를 false로 설정합니다.
      }
    };

    fetchHabits(); // fetchHabits 함수를 호출하여 데이터를 가져오는 작업을 시작합니다.
  }, [studyId]); // studyId가 변경될 때마다 useEffect가 다시 실행됩니다.

  return { habits, loading, error };
  // 가져온 습관 데이터, 로딩 상태, 오류 메시지를 반환합니다.
}

export default useFetchHabit;
// 이 커스텀 훅을 다른 컴포넌트에서 사용할 수 있도록 내보냅니다.
