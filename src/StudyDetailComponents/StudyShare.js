import { FaFacebook, FaTwitter, FaInstagram, FaLink } from "react-icons/fa";
import { toast } from "react-toastify";

function StudyShare({ onShareClick }) {
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
    onShareClick();
  };

  const handleShareClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    onShareClick();
  };

  return (
    <div className="shareContainer">
      <div className="shareOptions">
        <span
          onClick={() =>
            handleShareClick(`https://www.instagram.com/?url=${shareUrl}`)
          }
          className="shareIcon"
        >
          <FaInstagram />
        </span>
        <span
          onClick={() =>
            handleShareClick(
              `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
            )
          }
          className="shareIcon"
        >
          <FaFacebook />
        </span>
        <span
          onClick={() =>
            handleShareClick(
              `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`
            )
          }
          className="shareIcon"
        >
          <FaTwitter />
        </span>
        <span onClick={handleCopyLink} className="shareIcon">
          <FaLink />
        </span>
      </div>
    </div>
  );
}

export default StudyShare;
