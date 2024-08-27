import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import StudyRoomPage from './pages/StudyRoomPage.js';
import CreateStudyPage from './pages/CreateStudyPage.js';
import HabitTrackerPage from './pages/HabitTrackerPage.js';
import FocusTimerPage from './pages/FocusTimerPage.js';
import StudyDetailPage from './pages/StudyDetailPage.js';
import EditStudyPage from './pages/EditStudyPage.js';

import { useState } from 'react';

function Main() {
  const [logoClickReset, setLogoClickReset] = useState(false);

  const handleResetClick = () => {
    setLogoClickReset((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout handleResetClick={handleResetClick} />}>
          <Route
            index
            element={<StudyRoomPage paramsReset={logoClickReset} />}
          />
          <Route path='/study' element={<CreateStudyPage />} />
          <Route path='/study/:studyId' element={<StudyDetailPage />} />
          <Route path='/editStudy/:studyId' element={<EditStudyPage />} />
          <Route path='/habit' element={<HabitTrackerPage />} />
          <Route path='/focus/:studyId' element={<FocusTimerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
