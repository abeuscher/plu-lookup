import { generateMetadata, getStructuredData } from '../../utils';

import Exporter from '../../components/Exporter';
import { StructuredData } from '../layout';

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
