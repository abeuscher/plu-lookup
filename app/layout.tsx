// app/layout.tsx

import '@/styles/global.scss';

import FooterBar from '@/components/FooterBar';
import NavigationBar from '@/components/NavigationBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <NavigationBar />
          <main>{children}</main>
          <FooterBar />
        </div>
      </body>
    </html>
  );
}
