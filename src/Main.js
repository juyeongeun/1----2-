import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.js";
import StudyRoomPage from "./pages/StudyRoomPage.js";
import CreateStudyPage from "./pages/CreateStudyPage.js";
import HabitTrackerPage from "./pages/HabitTrackerPage.js";
import FocusTimerPage from "./pages/FocusTimerPage.js";
import StudyDetailPage from "./pages/StudyDetailPage.js";
import EditStudyPage from "./pages/EditStudyPage.js";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudyRoomPage />} />
          <Route path="/study" element={<CreateStudyPage />} />
          <Route path="/study/:id" element={<StudyDetailPage />} />
          <Route path="/editStudy" element={<EditStudyPage />} />
          <Route path="/habit" element={<HabitTrackerPage />} />
          <Route path="/focus" element={<FocusTimerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
