import { generateMetadata, getStructuredData } from '../../utils';

import ProductSearch from '../../components/ProductSearch';
import { StructuredData } from '../layout';

export const metadata = generateMetadata('/voice-lookup');

const VoiceLookup = () => {
  const structuredData = getStructuredData('/voice-lookup');
  return (
    <>
      <StructuredData data={structuredData} />
      <ProductSearch />
    </>
  );
};

export default VoiceLookup;
