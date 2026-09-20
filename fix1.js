const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

// fix the promise array
content = content.replace(
  /apiService\.getAllChangeoverChecksheets\(\),\s*apiService\.getEngineers\(\)/,
  "apiService.getAllChangeoverChecksheets(),\n        apiService.getLaserChangeoverReports(),\n        apiService.getEngineers()"
);

// fix the state assignment
content = content.replace(
  /setChangeovers\(changeoverRes\.data\.data \|\| \[\]\);\s*setEngineers\(engineersRes\.data\.data \|\| \[\]\);/,
  "setChangeovers(changeoverRes.data.data || []);\n          setLaserChangeovers(laserRes.data.data || []);\n          setEngineers(engineersRes.data.data || []);"
);

// add missing tab toggle
// Find the changeover tab toggle
const changeoverTabRegex = /<button[\s\S]*?onClick=\{\(\) => setReportType\('changeover'\)\}[\s\S]*?<\/button>/;
const match = content.match(changeoverTabRegex);
if (match) {
  content = content.replace(match[0], match[0] + "\n          <button\n            type=\"button\"\n            className={`toggle-btn ${reportType === 'laser_changeover' ? 'active' : ''}`}\n            onClick={() => setReportType('laser_changeover')}\n          >\n            {language === 'zh' ? '????' : 'Laser Changeover'}\n          </button>");
}

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed the missing Promise and Toggle');
