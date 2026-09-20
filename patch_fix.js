const fs = require('fs');

// --- REPORTS.JS PATCH ---
let reportsCode = fs.readFileSync('client/src/components/Reports.js', 'utf8');

// Inject the two missing cards
reportsCode = reportsCode.replace(
  /\{renderSummaryCard\([\s\S]*?'func-theme'[\s\S]*?\}\s*<\/div>/,
  `$&`.replace(/<\/div>$/, `  {renderSummaryCard(language === 'zh' ? '换型点检表状态' : 'Changeover Checksheet Status', changeTodayDoneLines, changePendingReviewLines, changeApprovedLines, changeTodayPendingLines, notInstalledLines, 'changeover-theme', changeSummaryDate, setChangeSummaryDate, changeSummaryShift, setChangeSummaryShift, true)}\n        {renderSummaryCard(language === 'zh' ? '激光换型状态' : 'Laser Changeover Status', laserTodayDoneLines, laserPendingReviewLines, laserApprovedLines, laserTodayPendingLines, notInstalledLines, 'laser-theme', laserSummaryDate, setLaserSummaryDate, laserSummaryShift, setLaserSummaryShift, true)}\n        </div>`)
);

fs.writeFileSync('client/src/components/Reports.js', reportsCode);
console.log("Reports.js cards injected");

// --- HOME.JS PATCH ---
let homeCode = fs.readFileSync('client/src/components/Home.js', 'utf8');

// Fix combinedTotal
homeCode = homeCode.replace(
  /const changeoverTotal = stats\.changeover\?\.total \|\| 0;\s*const combinedTotal = checklistTotal \+ checkpointTotal \+ changeoverTotal;/,
  `const changeoverTotal = stats.changeover?.total || 0;\n  const laserTotal = stats.laserChangeover?.total || 0;\n  const combinedTotal = checklistTotal + checkpointTotal + changeoverTotal + laserTotal;`
);

// We also need to fix Day/Night totals in Combined Total card
// Because Laser Changeovers should be added to Day and Night totals!
homeCode = homeCode.replace(
  /const totalDay = \(stats\.checklist\?\.shifts\?\.day \|\| 0\) \+ \(stats\.checkpoint\?\.shifts\?\.day \|\| 0\) \+ \(stats\.changeover\?\.shifts\?\.day \|\| 0\);/,
  `const totalDay = (stats.checklist?.shifts?.day || 0) + (stats.checkpoint?.shifts?.day || 0) + (stats.changeover?.shifts?.day || 0) + (stats.laserChangeover?.shifts?.day || 0);`
);

homeCode = homeCode.replace(
  /const totalNight = \(stats\.checklist\?\.shifts\?\.night \|\| 0\) \+ \(stats\.checkpoint\?\.shifts\?\.night \|\| 0\) \+ \(stats\.changeover\?\.shifts\?\.night \|\| 0\);/,
  `const totalNight = (stats.checklist?.shifts?.night || 0) + (stats.checkpoint?.shifts?.night || 0) + (stats.changeover?.shifts?.night || 0) + (stats.laserChangeover?.shifts?.night || 0);`
);

fs.writeFileSync('client/src/components/Home.js', homeCode);
console.log("Home.js combinedTotal fixed");
