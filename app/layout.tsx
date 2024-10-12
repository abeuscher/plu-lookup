// app/layout.tsx

import '../styles/global.scss';

import FooterBar from '../components/FooterBar';
import NavigationBar from '../components/NavigationBar';
import Script from 'next/script';

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
export function StructuredData({ data }: { data: object }) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(data)}
    </Script>
  );
}
