const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  /setChangeovers\(changeoverRes\.data\.data \|\| \[\]\);\s*setEngineers\(engineersRes\.data\.data \|\| \[\]\);/g,
  "setChangeovers(changeoverRes.data.data || []);\n          setLaserChangeovers(laserRes.data.data || []);\n          setEngineers(engineersRes.data.data || []);"
);
fs.writeFileSync(file, content, 'utf8');
