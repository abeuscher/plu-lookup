// app/layout.tsx

import '@/styles/global.scss';

import FooterBar from '@/components/FooterBar';
import NavigationBar from '@/components/NavigationBar';
import ThemeWrapper from '../components/ThemeWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>
          <div className="container">
            <NavigationBar />
            <main>{children}</main>
            <FooterBar />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
