// /data/metadata.ts

export interface PageMetadata {
    title: string;
    description: string;
    keywords: string;
    structuredData: object;
  }
  
  const baseUrl = 'https://www.plumadness.com';
  
  export const metadata: Record<string, PageMetadata> = {
    '/': {
      title: 'PLU Madness | Home',
      description: 'Manage and memorize Product Lookup Numbers (PLUs) efficiently. Filter, group, and learn over 1500+ PLUs worldwide.',
      keywords: 'PLU, Product Lookup Numbers, produce codes, grocery, memorization, learning tool',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'PLU Madness',
        description: 'Manage and memorize Product Lookup Numbers (PLUs) efficiently. Filter, group, and learn over 1500+ PLUs worldwide.',
        url: baseUrl,
      },
    },
    '/exporter': {
      title: 'PLU Madness | Exporter',
      description: 'Export your selected PLUs to CSV format or import previous selections. Easily manage your PLU lists.',
      keywords: 'PLU export, CSV, import PLUs, manage PLU lists, Product Lookup Numbers',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'PLU Madness Exporter',
        description: 'Export your selected PLUs to CSV format or import previous selections. Easily manage your PLU lists.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${baseUrl}/exporter`,
      },
    },
    '/voice-lookup': {
      title: 'PLU Madness | Voice Lookup',
      description: 'Search for PLUs using voice commands. Quick and hands-free access to Product Lookup Numbers.',
      keywords: 'PLU voice search, voice recognition, hands-free PLU lookup, Product Lookup Numbers',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'PLU Madness Voice Lookup',
        description: 'Search for PLUs using voice commands. Quick and hands-free access to Product Lookup Numbers.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${baseUrl}/voice-lookup`,
      },
    },
    '/flashcard': {
      title: 'PLU Madness | Flashcard Game',
      description: 'Test and reinforce your PLU knowledge with our 3-round flashcard game. Customize quizzes with your selected PLUs.',
      keywords: 'PLU flashcards, memory game, Product Lookup Numbers quiz, PLU learning, memorization tool',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: 'PLU Madness Flashcard Game',
        description: 'Test and reinforce your PLU knowledge with our 3-round flashcard game. Customize quizzes with your selected PLUs.',
        learningResourceType: 'Game',
        educationalAlignment: {
          '@type': 'AlignmentObject',
          alignmentType: 'teaches',
          educationalFramework: 'Product Lookup Numbers',
          targetName: 'PLU memorization',
        },
        url: `${baseUrl}/flashcard`,
      },
    },
  };
  
  export function getMetadata(path: string): PageMetadata {
    return metadata[path] || metadata['/'];
  }