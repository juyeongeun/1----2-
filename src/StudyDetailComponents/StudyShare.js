import React, { useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLink } from "react-icons/fa";
import { toast } from "react-toastify";
import KakaoIcon from "../img/kakaotalk_sharing.png";
import shareIcon from "../img/ic_share_logo.png";

function StudyShare({ id, onShareClick }) {
  const shareUrl = encodeURIComponent(
    `https://feature-share-kakao--zingy-faloodeh-281168.netlify.app/${id}`
  );
  const shareText = "Check out this study group!";
  const { Kakao } = window;

  useEffect(() => {
    // SDK 초기화 전에 clean up
    if (Kakao && Kakao.isInitialized()) {
      Kakao.cleanup();
    }
    // SDK 초기화
    Kakao.init("aec25d1cabf3760334251f03504abbd9");
  }, [Kakao]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://feature-share-kakao--zingy-faloodeh-281168.netlify.app/study/${id}`
    );
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

  const handleKakaoShare = () => {
    const url = `https://feature-share-kakao--zingy-faloodeh-281168.netlify.app/${id}`;
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: shareText,
        description: "스터디 그룹에 참여해 보세요!",
        imageUrl: shareIcon,
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: "스터디 참여하기",
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
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
        <span onClick={handleKakaoShare} className="shareIcon">
          <img
            src={KakaoIcon}
            alt="KakaoTalk"
            style={{ width: "32px", height: "32px" }}
          />
        </span>
      </div>
    </div>
  );
}

export default StudyShare;
