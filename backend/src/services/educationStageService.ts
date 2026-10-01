import { IUser } from '../models/User.js';

export interface IEducationStage {
  stageId: string; // e.g., '10th', '12th', 'diploma', 'degree', 'pg', 'working'
  readableStage: string; // e.g., "12th / PUC", "B.E CSE - 3rd Year"
  category: 'Schooling' | 'HigherSecondary' | 'Vocational' | 'Undergraduate' | 'Postgraduate' | 'Professional';
  isTransitionPhase: boolean; // True if they are in the final year and need next-step guidance
}

/**
 * Detects the specific education stage of the student based on their profile data.
 * Used to conditionally route them to the correct recommendation engines.
 */
export const detectEducationStage = (user: IUser): IEducationStage => {
  const profile = user.intelligenceProfile || {};
  const baseLevel = (user.educationLevel || profile.educationStage || '').toLowerCase().trim();
  const yearOrClass = (user.classOrYear || String(profile.currentYear || '')).toLowerCase().trim();
  const degree = (profile.courseOrDegree || '').trim();
  const branch = (profile.branchOrSpecialization || '').trim();
  
  // 1. Check Working Professional
  if (baseLevel.includes('working') || baseLevel.includes('professional') || baseLevel.includes('career')) {
    return {
      stageId: 'working',
      readableStage: 'Working Professional / Career Switching',
      category: 'Professional',
      isTransitionPhase: true
    };
  }

  // 2. Check Post-Graduation
  if (baseLevel.includes('postgrad') || baseLevel.includes('masters') || baseLevel.includes('pg') || baseLevel.includes('m.tech') || baseLevel.includes('mba')) {
    const stageDesc = degree ? `${degree}${branch ? ' ' + branch : ''} - PG` : 'Postgraduate Student';
    return {
      stageId: 'pg',
      readableStage: stageDesc,
      category: 'Postgraduate',
      isTransitionPhase: yearOrClass.includes('final') || yearOrClass.includes('2')
    };
  }

  // 3. Check Undergraduate Degree
  if (baseLevel.includes('undergrad') || baseLevel.includes('bachelor') || baseLevel.includes('degree') || baseLevel.includes('ug') || baseLevel.includes('b.tech') || baseLevel.includes('b.e')) {
    let yearText = '';
    let isFinalYear = false;
    
    if (yearOrClass.includes('1') || yearOrClass.includes('first')) yearText = '1st Year';
    else if (yearOrClass.includes('2') || yearOrClass.includes('second')) yearText = '2nd Year';
    else if (yearOrClass.includes('3') || yearOrClass.includes('third')) yearText = '3rd Year';
    else if (yearOrClass.includes('4') || yearOrClass.includes('fourth') || yearOrClass.includes('final')) {
      yearText = 'Final Year';
      isFinalYear = true;
    }
    
    const stageDesc = `${degree || 'UG Degree'}${branch ? ' ' + branch : ''}${yearText ? ' - ' + yearText : ''}`;
    
    return {
      stageId: 'degree',
      readableStage: stageDesc,
      category: 'Undergraduate',
      isTransitionPhase: isFinalYear
    };
  }

  // 4. Check Diploma / Polytechnic
  if (baseLevel.includes('diploma') || baseLevel.includes('polytechnic')) {
    return {
      stageId: 'diploma',
      readableStage: `Diploma${branch ? ' in ' + branch : ''}`,
      category: 'Vocational',
      isTransitionPhase: yearOrClass.includes('final') || yearOrClass.includes('3')
    };
  }

  // 5. Check ITI
  if (baseLevel.includes('iti')) {
    return {
      stageId: 'iti',
      readableStage: `ITI${branch ? ' - ' + branch : ''}`,
      category: 'Vocational',
      isTransitionPhase: true
    };
  }

  // 6. Check 11th / 12th / PUC
  if (baseLevel.includes('12') || baseLevel.includes('puc') || baseLevel.includes('intermediate') || yearOrClass.includes('12')) {
    return {
      stageId: '12th',
      readableStage: `12th / PUC${user.stream ? ' (' + user.stream + ')' : ''}`,
      category: 'HigherSecondary',
      isTransitionPhase: true
    };
  }
  
  if (baseLevel.includes('11') || yearOrClass.includes('11')) {
    return {
      stageId: '11th',
      readableStage: `11th Standard${user.stream ? ' (' + user.stream + ')' : ''}`,
      category: 'HigherSecondary',
      isTransitionPhase: false
    };
  }

  // 7. Check 10th
  if (baseLevel.includes('10') || yearOrClass.includes('10') || baseLevel.includes('ssc')) {
    return {
      stageId: '10th',
      readableStage: '10th Standard / SSLC',
      category: 'Schooling',
      isTransitionPhase: true
    };
  }

  // Default fallback if insufficient info
  return {
    stageId: 'other',
    readableStage: 'Exploring Careers',
    category: 'Schooling',
    isTransitionPhase: false
  };
};
