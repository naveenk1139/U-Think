const fs = require('fs');
let content = fs.readFileSync('src/components/ExamsDirectory.tsx', 'utf8');

// Replace the filtering and grouping logic
const searchTarget = `            const filteredExams = EXAMS_DB.filter(e => 
                (e.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                ((e as any).fullName?.toLowerCase() || '').includes(searchQuery.toLowerCase())
              )
              .filter(e => (e as any).level === examLevelFilter);`;

const replacement = `            const filteredExams = EXAMS_DB.filter(e => 
                (e.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                ((e as any).fullName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                ((e as any).conductingBody?.toLowerCase() || '').includes(searchQuery.toLowerCase())
              )
              .filter(e => searchQuery ? true : (e as any).level === examLevelFilter);`;

content = content.replace(searchTarget, replacement);

const groupingTarget = `            const currentGroupings = groupings[examLevelFilter as keyof typeof groupings];
            
            return currentGroupings.map(group => {
              const groupExams = filteredExams.filter(group.filter);
              if (groupExams.length === 0) return null;`;

const groupingReplacement = `            const currentGroupings = searchQuery 
              ? Array.from(new Set(filteredExams.map((e: any) => e.category))).map(cat => ({ title: cat, filter: (e: any) => e.category === cat }))
              : groupings[examLevelFilter as keyof typeof groupings];
            
            return currentGroupings.map(group => {
              const groupExams = filteredExams.filter(group.filter);
              if (groupExams.length === 0) return null;`;

content = content.replace(groupingTarget, groupingReplacement);

// Also need to update the empty state logic
const emptyTarget = `      {((activeTab === 'exams' && EXAMS_DB.filter(e => 
          (e.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
          ((e as any).fullName?.toLowerCase() || '').includes(searchQuery.toLowerCase())
        ).filter(e => (e as any).level === examLevelFilter).length === 0) ||`;

const emptyReplacement = `      {((activeTab === 'exams' && EXAMS_DB.filter(e => 
          (e.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
          ((e as any).fullName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
          ((e as any).conductingBody?.toLowerCase() || '').includes(searchQuery.toLowerCase())
        ).filter(e => searchQuery ? true : (e as any).level === examLevelFilter).length === 0) ||`;

content = content.replace(emptyTarget, emptyReplacement);

fs.writeFileSync('src/components/ExamsDirectory.tsx', content);
