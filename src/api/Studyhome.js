import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://teamproject-test-db.onrender.com',
});

export async function getStudiesList(params = {}) {
  try {
    const response = await instance.get('/studies', {
      params,
    });
    console.log(response.data);
    return response;
  } catch (e) {
    if (e.response) {
      console.log('Response status:', e.response.status);
      console.log('Response data:', e.response.data);
    } else {
      console.log('Error message:', e.message);
    }
  }
}

getStudiesList();

// 새로운 스터디를 생성하는 함수
export async function createStudy(studyData) {
  try {
    // POST 요청을 보내서 새로운 스터디 생성
    const { data } = await instance.post('/studies', studyData);
    console.log('Study created:', data);
    return data;
  } catch (e) {
    // 오류가 발생하면 상태 코드와 데이터를 콘솔에 출력
    if (e.response) {
      console.log('Response status:', e.response.status);
      console.log('Response data:', e.response.data);
    } else {
      console.log('Error message:', e.message);
    }
  }
}

// 새로운 스터디 데이터를 예시로 생성
// const newStudy = {
//   name: 'New Study Name',
//   studyName: 'Unique Study Name',
//   content: 'Study content here',
//   background: 'GREEN',
//   password: 'securepassword',
// };

// 함수 호출
// createStudy(newStudy);
