const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /if \(reportType === 'changeover'\) \{\s*\/\/\s*Changeovers don't happen/,
  "if (reportType === 'changeover' || reportType === 'laser_changeover') {\n        // Changeovers don't happen"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed padding logic');
