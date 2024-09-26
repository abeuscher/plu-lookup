export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  export const calculateScore = (userAnswers: Record<string, string>, correctAnswers: Record<string, string>): number => {
    return Object.keys(correctAnswers).reduce((score, key) => {
      return score + (userAnswers[key] === correctAnswers[key] ? 1 : 0);
    }, 0);
  };