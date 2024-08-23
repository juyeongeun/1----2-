import React, { useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLink } from "react-icons/fa"; // 카카오톡 아이콘 추가
import { toast } from "react-toastify";
import KakaoIcon from "../img/kakaotalk_sharing.png";

function StudyShare({ onShareClick }) {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = "Check out this study group!";
  const { Kakao } = window;

  useEffect(() => {
    const kakaoKey = "aec25d1cabf3760334251f03504abbd9";

    // Kakao SDK 초기화 이전에 cleanup 호출
    if (Kakao && Kakao.isInitialized()) {
      Kakao.cleanup();
    }

    // 카카오 SDK 초기화
    if (kakaoKey && Kakao) {
      Kakao.init(kakaoKey);
      console.log("Kakao SDK Initialized:", Kakao.isInitialized());
    } else {
      console.error("Kakao 객체가 정의되지 않았거나 키가 유효하지 않습니다.");
    }
  }, [Kakao]);

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

  const handleKakaoShare = () => {
    const url =
      "https://feature-share-kakao--zingy-faloodeh-281168.netlify.app/";
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: shareText,
        description: "스터디 그룹에 참여해 보세요!",
        imageUrl:
          "https://feature-share-kakao--zingy-faloodeh-281168.netlify.app/nav_logo.png",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "스터디 참여하기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
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
