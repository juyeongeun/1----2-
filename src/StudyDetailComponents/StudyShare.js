import { FaFacebook, FaTwitter, FaInstagram, FaLink } from "react-icons/fa"; // 아이콘 불러오기
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function StudyShare() {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Check out this study group!");
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("링크가 클립보드에 복사되었습니다.", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="shareContainer">
      <div className="shareOptions">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shareIcon"
        >
          <FaFacebook />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shareIcon"
        >
          <FaTwitter />
        </a>
        <a
          href={`https://www.instagram.com/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shareIcon"
        >
          <FaInstagram />
        </a>
        <span onClick={handleCopyLink} className="shareIcon">
          <FaLink />
        </span>
        <ToastContainer />
      </div>
    </div>
  );
}

export default StudyShare;
