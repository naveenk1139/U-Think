export const calculateProfileCompletion = (user: any) => {
  if (!user) return { percentage: 0, missingFields: [] };
  
  const fields = [
    { key: 'displayName', weight: 15, label: 'Name' },
    { key: 'email', weight: 15, label: 'Email' },
    { key: 'educationLevel', weight: 20, label: 'Education Level' },
    { key: 'streamPreference', weight: 20, label: 'Stream' },
    { key: 'interests', weight: 15, label: 'Interests', isArray: true },
    { key: 'careerGoal', weight: 15, label: 'Career Goal' }
  ];

  let completedWeight = 0;
  const missingFields: string[] = [];

  fields.forEach(field => {
    const value = user[field.key];
    const isCompleted = field.isArray 
      ? (Array.isArray(value) && value.length > 0)
      : (value !== undefined && value !== null && value !== '');

    if (isCompleted) {
      completedWeight += field.weight;
    } else {
      missingFields.push(field.label);
    }
  });

  return {
    percentage: Math.min(100, Math.round(completedWeight)),
    missingFields
  };
};

export const calculateMatchScore = (itemTags: string[], user: any) => {
  if (!user || !itemTags || itemTags.length === 0) return 60; // Default baseline score
  
  const userInterests = Array.isArray(user.interests) ? user.interests : [];
  const userStream = user.streamPreference || '';
  
  let score = 50; // base score
  
  // Stream match + 25%
  if (userStream && itemTags.some(tag => tag.toLowerCase().includes(userStream.toLowerCase()))) {
    score += 25;
  }
  
  // Interests match + (up to 25%)
  if (userInterests.length > 0) {
    const matchedInterests = itemTags.filter(tag => 
      userInterests.some((ui: string) => tag.toLowerCase().includes(ui.toLowerCase()))
    );
    if (matchedInterests.length > 0) {
      score += Math.min(25, matchedInterests.length * 10);
    }
  }

  return Math.min(99, score);
};

export const getEducationJourney = (user: any) => {
  const currentLvl = user?.educationLevel?.toLowerCase() || '';
  
  return [
    { stage: '10th', status: 'completed' },
    { stage: 'Choose Pathway', status: 'completed' },
    { stage: '12th', status: currentLvl.includes('12') ? 'current' : (currentLvl.includes('10') ? 'upcoming' : 'completed') },
    { stage: 'Choose Course', status: currentLvl.includes('12') ? 'next' : (currentLvl.includes('10') ? 'upcoming' : 'completed') },
    { stage: 'College', status: currentLvl.includes('bachelor') ? 'current' : 'upcoming' },
    { stage: 'Career', status: 'upcoming' },
    { stage: 'Jobs', status: 'upcoming' }
  ];
};
