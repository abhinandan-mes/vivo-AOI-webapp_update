const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /apiService\.getAllChangeoverChecksheets\(\),\s*apiService\.getEngineers\(\)/,
  "apiService.getAllChangeoverChecksheets(),\n        apiService.getLaserChangeoverReports(),\n        apiService.getEngineers()"
);

fs.writeFileSync(file, content, 'utf8');
