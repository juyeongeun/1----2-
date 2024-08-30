# 2팀

📄 [팀 협업 문서](https://arrow-season-125.notion.site/ec0da2984aee44b29e332e18b85d12db?v=c951e5190e594c56aae608fd15b9420b&pvs=4)

## 팀원 구성

<table height="250px">
  <tbody>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/677f13bf-29a4-4cc8-8b39-ac3469ddd9a8" width="150px;" alt="강범준"/><br />
        <b>FS 팀장: 강범준</b><br />
        <sub><a href="https://github.com/kangbeomjoon">GitHub 프로필</a></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/9946a636-9764-43db-bf8b-02397f897d54" width="150px;" alt=""/><br />
        <b>FS 팀원: 김대건</b><br />
        <sub><a href="https://github.com/TradeOffEgoist">GitHub 프로필</a></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/ed5b95c4-4e15-43d7-bf6f-6a5813c7ac88" width="150px;" alt=""/><br />
        <b>FS 팀원: 김효인</b></sub><br />
        <sub><a href="https://github.com/mozzi34">GitHub 프로필</a></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/f8555d80-ed28-469c-b6c2-8b253ec0e908" width="150px;" alt="주영은"/><br />
        <b>FS 팀원: 주영은</b></sub><br />
        <sub><a href="https://github.com/juyeongeun">GitHub 프로필</a></sub>
      </td>
     <tr/>
  <tbody/>
<table/>

## 프로젝트 소개

- **제목**: 공부의 숲
- **소개**: 개인 공부 관리 및 커뮤니티 서비스
  - 최근 몇 년간 올바른 습관의 정착에 대한 사람들의 관심이 높아지고 있고, 그중에서도 ‘조금씩 습관을 들이기’에 대한 이론이 각광받고 있습니다. 따라서 개인이 학습할 내용을 정리할 스터디를 만들고, 하루동안 수행할 공부를 관리하며 집중 타이머 기능을 제공해 잘 수행할 때마다 포인트를 제공하는 서비스 제작합니다.

## 기술 스택

### Frontend

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Css-1572B6?style=for-the-badge&logo=Css&logoColor=white">

### Backend

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white">

### Database

<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white">

### 기타 Tool

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/Zoom-0B5CFF?style=for-the-badge&logo=zoom&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"> <img src="https://img.shields.io/badge/render-000000?style=for-the-badge&logo=render&logoColor=white">

## 팀원별 구현 기능 상세

### 강범준

- **habit**

  - 오늘의 습관 Todo List 표시
  - Todo List 토글 기능
    ![alt text](<스크린샷 2024-08-30 오후 1.28.16-1.jpg>)

- **habit modal** - 오늘의 습관 수정 모달 화면 - 플러스 (+)버튼 및 모달 창 디자인 - 습관 목록 입력 창 및 삭제 버튼 디자인
  ![alt text](<스크린샷 2024-08-30 오후 1.28.27.jpg>)

### 김대건

- 오늘의 집중 페이지
  (자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

### 김효인

- **DATABASE**
  - **study**
    - study 생성 기능 구현
    - study 목록 조회 기능 구현
- **메인 페이지**
  - GET을 이용한 스터디 정보 표시
    - 닉네임, 스터디 이름에 따른 말줄임표 추가
    - 스터디 배경화면에 따른 내부 텍스트 색깔 추가
    - 스터디 생성한 날짜 표시
    - 스터디 소개 3줄로 표시
  - react study를 이용하여 스터디 사용
  - GET을 이용한 이모지 정보 표시
    - 갯수가 3개 이상일 경우 +숫자로 표시
  - react emoji를 이용하여 이모지 표시
  - 기능
    - 공부의 숲 로고 클릭 시 새로고침 기능 추가
    - 검색 기능 구현
    - 드롭다운 기능으로 [최신순, 오래된순, 포인트순]으로 조회 가능
    - 페이지네이션으로 추가 정보 불러오기 기능 구현
  - 특정 스터디 누르면 상세 페이지 이동 구현
  - 스터디 만들기 버튼 누르면 만들기 페이지로 이동
  - 반응형 레이아웃 구현
- **스터디 만들기 페이지**
  - POST를 이용한 스터디 정보 전송
  - 만들기 버튼 누르면 상세 페이지 이동 구현
  - 반응형 레이아웃 구현
- **스터디 만들기, 수정하기 공용 기능**
  - 유효성 검사 기능 구현
- **공통 컴포넌트 구현**
  - NavBar의 레이아웃
  - main 공통 컴포넌트
  - body 배경색

**스터디 목록 조회**
<a href='https://ifh.cc/v-RvKCMg' target='_blank'><img src='https://ifh.cc/g/RvKCMg.jpg' border='0'></a>

**스터디 생성하기 폼**
<a href='https://ifh.cc/v-Wl6vk1' target='_blank'><img src='https://ifh.cc/g/Wl6vk1.jpg' border='0'></a>

### 주영은

- **DATABASE 엔티티 간의 관계 및 속성 정의**
  - **study**
    - study 상세 조회 기능 구현
    - study 수정 기능 구현
    - study 삭제 기능 구현
  - **reaction**
    - 특정 study에 대한 reaction 조회 기능 구현
    - 특정 study에 대한 reaction 생성 기능 구현
      - 해당 이모지가 있다면 +1
      - 해당 이모지가 없다면 생성
  - **habit**
    - 특정 study에 대한 습관 생성 기능 구현
    - 특정 study에 대한 습관 조회 기능 구현
    - 습관명 수정 기능 구현
    - 습관 삭제 기능 구현
      - 습관 삭제시 endDate 속성에 값 지정
      - cron을 활용해 매주 월요일 자정에 endDate 속성값이 null이 아니고, isActive가 true인 습관 삭제
  - **completeHabit**
    - 완료된 습관 생성 기능 구현
    - 완료된 습관 조회 기능 구현
    - 완료된 습관 삭제 기능 구현
      - cron을 활용해 매주 월요일 자정에 completeHabit 데이터 초기화
  - **서버 배포**
    - render.com 사용하여 배포
- **스터디 상세 조회 페이지**
  - GET을 사용하여 스터디 상세 정보 표시
  - GET을 사용하여 이모지 상세 정보 표시
  - POST를 사용하여 추가할 이모지 정보 전송
  - react emoji를 사용하여 이모지 사용
  - 스터디 링크 공유하기
    - 공유하기의 Link-copy 클릭시 확인용 toast message 표시
    - 카카오톡 공유하기 기능 추가 구현
  - 수정하기, 스터디 삭제하기, 오늘의 습관, 오늘의 집중 클릭시 권한 확인 모달 표시
  - 수정하기 클릭시 스터디 수정 페이지 이동 구현
  - 스터디 삭제하기 클릭시 스터디 삭제 후 메인페이지 이동 구현
    - 삭제 확인용 toast message 표시
  - 오늘의 습관 클릭시 해당 study의 오늘의 습관 페이지 이동 구현
  - 오늘의 집중 클릭시 해당 study의 오늘의 집중 페이지 이동 구현
  - GET을 사용하여 습관명 표시
  - GET을 사용하여 완료된 습관 표시
  - 반응형 레이아웃 구현
- **스터디 수정 페이지**
  - GET을 사용하여 해당 스터디의 기존 데이터 표시
  - PUT을 사용하여 수정하기 버튼 클릭시 데이터 전송
  - 유효성 검사와 input 값에 따라 수정하기 버튼 활성/비활성 구현
  - 수정하기 버튼 클릭시 스터디 상세 페이지로 이동
  - 반응형 레이아웃 구현
- **오늘의 습관 페이지**
  - GET을 사용하여 해당 스터디의 습관 표시
  - GET을 사용하여 해당 스터디의 습관 완료 여부 표시
  - PUT을 사용하여 해당 스터디의 습관 수정 및 삭제값 수정
  - POST를 사용하여 해당 스터디의 습관 생성
- **프론트 배포**
  - netlify 사용하여 배포

**스터디 상세 조회**

![image](https://github.com/user-attachments/assets/eff21e9d-5e1b-4037-8cda-29a4e7ddcc29)

**권한 확인 모달**

![image](https://github.com/user-attachments/assets/3dec79f8-af35-4a80-b593-e73fa47fa286)

**수정하기 폼**

![image](https://github.com/user-attachments/assets/6b7d32e6-0324-454e-b787-45d9bbad3358)

## 파일구조

### 프론트엔드 파일 구조

```
node_modules
public/
├── _redirects
├── favicon.png
├── ic_share_logo.png
├── index.css
└── index.html

src/
├── components/
│   ├── CreateStudyComponents/
│   │   ├── CreateBackground.js
│   │   ├── CreateBackground.module.css
│   │   ├── CreateFooter.js
│   │   ├── CreateFooter.module.css
│   │   ├── CreateForm.js
│   │   ├── CreateForm.module.css
│   │   ├── CreateInput.js
│   │   ├── CreateInput.module.css
│   │   ├── CreatePassword.js
│   │   └── CreatePassword.module.css
│   ├── EditStudyComponents/
│   │   ├── BackgroundSelector.js
│   │   ├── EditStudyForm.css
│   │   ├── EditStudyForm.js
│   │   ├── LabeledInput.js
│   │   ├── PasswordInput.js
│   │   └── SubmitButton.js
│   ├── Layout/
│   │   ├── Container.js
│   │   ├── Container.module.css
│   │   ├── Footer.js
│   │   ├── Layout.js
│   │   ├── Nav.js
│   │   └── Nav.module.css
│   ├── StudyDetailComponents/
│   │   ├── PasswordModal.css
│   │   ├── PasswordModal.js
│   │   ├── StudyHabits.css
│   │   ├── StudyHabits.js
│   │   ├── StudyInfo.css
│   │   ├── StudyInfo.js
│   │   ├── StudyName.css
│   │   ├── StudyName.js
│   │   ├── StudyPoint.css
│   │   ├── StudyPoint.js
│   │   └── StudyShare.js
│   ├── StudyHomeComponents/
│   │   ├── backgrounds/
│   │   ├── Dropdown.js
│   │   ├── Dropdown.module.css
│   │   ├── ExploreDataFetch.js
│   │   ├── ExploreDataFetch.module.css
│   │   ├── ExploreStudies.js
│   │   ├── ExploreStudies.module.css
│   │   ├── ExploreStudiesHeader.js
│   │   ├── ExploreStudiesHeader.module.css
│   │   ├── RecentDataFetch.js
│   │   ├── RecentDataFetch.module.css
│   │   ├── RecentStudies.js
│   │   ├── RecentStudies.module.css
│   │   └── StudyHomeForm.js
│   ├── TodayFocusComponents/
│   │   ├── api/
│   │   │   └── setPoint.js
│   │   ├── components/
│   │   │   ├── assets/
│   │   │   ├── FocusMid.css
│   │   │   ├── FocusMid.js
│   │   │   ├── FocusTimer.css
│   │   │   ├── FocusTimer.js
│   │   │   ├── FocusTop.css
│   │   │   ├── FocusTop.js
│   │   │   ├── TimerSettingModal.css
│   │   │   └── TimerSettingModal.js
│   │   └── utility/
│   │       ├── timeParser.js
│   │       ├── FocusPage.css
│   │       └── FocusPage.js
│   └── TodayTodoList/
│       ├── HabitEditModal.css
│       ├── HabitEditModal.js
│       ├── HabitItem.css
│       ├── HabitItem.js
│       ├── HabitModalList.css
│       ├── HabitModalList.js
│       ├── HabitStudyComponent.css
│       ├── HabitStudyComponent.js
│       ├── ModalButtons.css
│       ├── ModalButtons.js
│       ├── NewHabitList.css
│       ├── NewHabitList.js
│       ├── TodoList.css
│       └── TodoList.js
├── css/
│   └── reset.css
├── hooks/
│   ├── useExploreList.js
│   ├── useFetchCompleteHabit.js
│   ├── useFetchEmoji.js
│   ├── useFetchHabit.js
│   ├── useFetchStudy.js
│   ├── useInputValid.js
│   └── useRecentList.js
├── img/
├── pages/
│   ├── CreateStudyPage.js
│   ├── EditStudyPage.js
│   ├── FocusTimerPage.js
│   ├── HabitTrackerPage.js
│   ├── StudyDetailPage.js
│   ├── StudyRoomPage.js
│   ├── index.js
│   └── Main.js
├── index.js
├── Main.js
.gitignore
package-lock.json
package.json
README.md
```

## 구현 홈페이지

[공부의 숲](https://main--gatherstudy.netlify.app/)

## 프로젝트 회고록

(제작한 발표자료 링크 혹은 첨부파일 첨부)
