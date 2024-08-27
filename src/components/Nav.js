import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';
import navLogo from '../img/nav_logo.png';
import navBtn from '../img/nav_btn.png';
import mobileLoco from '../img/nav_mobile_logo.png';
import mobileBtn from '../img/nav_mobile_btn.png';

function Nav({ handleResetClick }) {
  const location = useLocation();
  const hideLogoPaths = [
    '/habit',
    '/focus',
    '/study',
    'study/:id',
    '/editStudy',
  ]; // 로고 숨기는 경로

  const shouldHideLogo = hideLogoPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.container}>
          <Link to='/' onClick={handleResetClick}>
            <img src={navLogo} className={styles.navLogo} alt='로고' />
            <img
              src={mobileLoco}
              className={styles.mobileLogo}
              alt='모바일로고'
            />
          </Link>
          {!shouldHideLogo && (
            <Link to='/study'>
              <img
                src={navBtn}
                className={styles.navBtn}
                alt='스터디만들기버튼'
              />
              <img
                src={mobileBtn}
                className={styles.mobileBtn}
                alt='모바일스터디만들가버튼'
              />
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Nav;
