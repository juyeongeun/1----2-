import { useParams } from "react-router-dom";
import useFetchStudy from "../../hooks/useFetchStudy.js";
import FocusMid from "./components/FocusMid.js";
import FocusTimer from "./components/FocusTimer.js";
import FocusTop from "./components/FocusTop.js";
import "./FocusPage.css";

const FocusPage = () => {
  const { studyId } = useParams();
  const { studyName, name, point, loading, error } = useFetchStudy(studyId);
  return (
    <div class="main_Container">
      <FocusTop
        name={name}
        studyName={studyName}
        loading={loading}
        error={error}
      />
      <FocusMid point={point} loading={loading} error={error} />
      <FocusTimer />
    </div>
  );
};

export default FocusPage;
