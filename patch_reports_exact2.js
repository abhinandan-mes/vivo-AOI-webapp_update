const fs = require('fs');

// --- REPORTS.JS PATCH ---
let reportsCode = fs.readFileSync('client/src/components/Reports.js', 'utf8');

// Match everything around the div closing
reportsCode = reportsCode.replace(
  /\{renderSummaryCard\(t\('rep_summary_checkpoint'\)([\s\S]*?)'func-theme'([\s\S]*?)\}\r?\n\s*<\/div>/,
  `{renderSummaryCard(t('rep_summary_checkpoint')$1'func-theme'$2}\n        {renderSummaryCard(language === 'zh' ? '换型点检表状态' : 'Changeover Checksheet Status', changeTodayDoneLines, changePendingReviewLines, changeApprovedLines, changeTodayPendingLines, notInstalledLines, 'changeover-theme', changeSummaryDate, setChangeSummaryDate, changeSummaryShift, setChangeSummaryShift, true)}\n        {renderSummaryCard(language === 'zh' ? '激光换型状态' : 'Laser Changeover Status', laserTodayDoneLines, laserPendingReviewLines, laserApprovedLines, laserTodayPendingLines, notInstalledLines, 'laser-theme', laserSummaryDate, setLaserSummaryDate, laserSummaryShift, setLaserSummaryShift, true)}\n        </div>`
);

fs.writeFileSync('client/src/components/Reports.js', reportsCode);
console.log("Reports.js fixed with regex handling CRLF");
