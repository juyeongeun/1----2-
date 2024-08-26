import "./FocusMid.css";

const FocusMid = ({ point, error, loading }) => {
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div class="todaysFocus_Mid">
      <div class="todaysFocus_Mid_point_Wrapper">
        <span class="todaysFocus_Mid_point_text">현재까지 획득한 포인트</span>
        <div class="todaysFocus_Mid_point_container">
          <span class="todaysFocus_Mid_point_point">{point}P 획득</span>
        </div>
      </div>
    </div>
  );
};

export default FocusMid;
