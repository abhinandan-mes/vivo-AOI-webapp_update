const fs = require('fs');

let homeCode = fs.readFileSync('client/src/components/Home.js', 'utf8');

homeCode = homeCode.replace(
  'const laserRes = await apiService.getLaserChangeoverReports({ date });',
  'const laserRes = await apiService.getLaserChangeoverReports({ fromDate: date, toDate: date });'
);

fs.writeFileSync('client/src/components/Home.js', homeCode);
console.log("Home.js API param fixed");
