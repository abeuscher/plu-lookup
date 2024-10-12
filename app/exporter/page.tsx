import { generateMetadata, getStructuredData } from '@/utils';

import Exporter from '@/components/Exporter';
import { StructuredData } from '@/components/StructuredData';

export const metadata = generateMetadata('/exporter');

const ExporterPage = () => {
  const structuredData = getStructuredData('/voice-lookup');
  return (
    <>
      <StructuredData data={structuredData} />
      <Exporter />
    </>
  );
};

export default ExporterPage;
