import { Outlet } from 'react-router-dom';
import Nav from './Nav.js';
import Footer from './Footer.js';

function Layout({ handleResetClick }) {
  return (
    <>
      <Nav handleResetClick={handleResetClick} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
