// components/StructuredData.tsx

import Script from 'next/script';

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
