export const PUC_COMBINATIONS: Record<string, Record<string, string[]>> = {
  science: {
    PCM: ["B.E./B.Tech", "B.Sc Mathematics", "B.Sc Physics", "B.Sc Chemistry", "BCA", "B.Sc IT"],
    PCMC: ["B.E./B.Tech", "BCA", "B.Sc Computer Science", "B.Sc Mathematics", "B.Sc IT"],
    PCME: ["B.E./B.Tech", "B.Sc Electronics", "BCA", "B.Sc Physics", "B.Sc Mathematics"],
    PCMB: ["MBBS", "BDS", "BAMS", "BHMS", "B.Pharm", "B.Sc Nursing", "B.E./B.Tech", "B.Sc Biotechnology"],
    PCMS: ["B.E./B.Tech", "B.Sc Statistics", "B.Sc Mathematics", "BCA", "Data Science"],
    PCB: ["MBBS", "BDS", "BAMS", "BHMS", "B.Pharm", "B.Sc Nursing", "B.Sc Biotechnology"],
    PCBZ: ["MBBS", "BDS", "B.Sc Zoology", "B.Sc Life Sciences", "B.Pharm"],
    PCBH: ["MBBS", "B.Sc Home Science", "Nutrition & Dietetics", "B.Pharm", "Nursing"],
  },
  commerce: {
    CEBA: ["B.Com", "BBA", "BA Economics", "CA", "CS"],
    SEBA: ["B.Com", "BBA", "BA Economics", "B.Sc Statistics", "CA"],
    HEBA: ["BA History", "BA Economics", "BA Political Science", "B.Com", "BBA"],
    ABMS: ["B.Com", "BBA", "BBM", "CA", "MBA (after graduation)"],
    EBAC: ["B.Com", "BBA", "BA Economics", "CA", "CMA"],
    BSBA: ["B.Com", "BBA", "B.Sc Statistics", "CA"],
    CSBA: ["B.Com", "BBA", "Company Secretary (CS)", "CA"],
  },
  arts: {
    HEPS: ["BA History", "BA Economics", "BA Political Science", "LLB", "Civil Services Preparation"],
    HEPP: ["BA History", "BA Political Science", "LLB", "Journalism"],
    HESP: ["BA History", "BA Economics", "BA Sociology", "Social Work"],
    EPS: ["BA Economics", "BA Political Science", "BA Sociology", "Public Administration"],
  },
};

export const getAllAllowedDegreesForCombination = (combination: string) => {
  for (const stream in PUC_COMBINATIONS) {
    if (PUC_COMBINATIONS[stream as keyof typeof PUC_COMBINATIONS][combination as any]) {
      return PUC_COMBINATIONS[stream as keyof typeof PUC_COMBINATIONS][combination as any];
    }
  }
  return [];
};
