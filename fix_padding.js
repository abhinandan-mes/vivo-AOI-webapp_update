const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "if (reportType === 'changeover') {\n        // Changeovers don't happen on every line every day, so we do NOT pad with \"Not Filled\" rows.",
  "if (reportType === 'changeover' || reportType === 'laser_changeover') {\n        // Changeovers don't happen on every line every day, so we do NOT pad with \"Not Filled\" rows."
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed padding logic');
