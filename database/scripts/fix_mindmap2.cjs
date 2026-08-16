const fs = require('fs');
const file = './src/components/ExamsDirectory.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<\/div>\n\s*<\/div>\n\s*\)\}\n\n\s*\{\/\* RIGHT COLUMN: DOMAIN DETAIL OVERVIEW & PATHWAYS \*\/\}/g,
  `</div>\n        </div>\n\n        {/* RIGHT COLUMN: DOMAIN DETAIL OVERVIEW & PATHWAYS */}`
);

// If there's an exact string like that:
content = content.replace(
  `          </div>
        </div>
        )}

        {/* RIGHT COLUMN: DOMAIN DETAIL OVERVIEW & PATHWAYS */}`,
  `          </div>
        </div>

        {/* RIGHT COLUMN: DOMAIN DETAIL OVERVIEW & PATHWAYS */}`
);

fs.writeFileSync(file, content);
