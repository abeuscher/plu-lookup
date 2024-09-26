// layout.tsx

import '../styles/global.scss';

import FooterBar from '../components/FooterBar';
import NavigationBar from '../components/NavigationBar';

// Import global styles

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <div className="container">
          <NavigationBar />

          <main>{children}</main>

          <FooterBar />
        </div>
      </body>
    </html>
  );
};

export default Layout;
