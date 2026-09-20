const fs = require('fs');
let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');

code = code.replace(
  /\{renderSummaryCard\(t\('rep_summary_checkpoint'\),\s*funcTodayDoneLines,\s*funcPendingReviewLines,\s*funcApprovedLines,\s*funcTodayPendingLines,\s*notInstalledLines,\s*'func-theme',\s*funcSummaryDate,\s*setFuncSummaryDate,\s*funcSummaryShift,\s*setFuncSummaryShift\)\}\s*<\/div>/,
  `{renderSummaryCard(t('rep_summary_checkpoint'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, 'func-theme', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}
        {renderSummaryCard(language === 'zh' ? '换型点检表状态' : 'Changeover Checksheet Status', changeTodayDoneLines, changePendingReviewLines, changeApprovedLines, changeTodayPendingLines, notInstalledLines, 'changeover-theme', changeSummaryDate, setChangeSummaryDate, changeSummaryShift, setChangeSummaryShift, true)}
        {renderSummaryCard(language === 'zh' ? '激光换型状态' : 'Laser Changeover Status', laserTodayDoneLines, laserPendingReviewLines, laserApprovedLines, laserTodayPendingLines, notInstalledLines, 'laser-theme', laserSummaryDate, setLaserSummaryDate, laserSummaryShift, setLaserSummaryShift, true)}
        </div>`
);

fs.writeFileSync('client/src/components/Reports.js', code);
console.log("Reports JSX patched again");
