const fs = require('fs');
let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');

code = code.replace(
  '<div className="reports-summary-dashboard">',
  '<div className="reports-summary-dashboard" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>'
);

code = code.replace(
  '{renderSummaryCard(t(\'rep_summary_checkpoint\'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, \'func-theme\', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}\n        </div>',
  '{renderSummaryCard(t(\'rep_summary_checkpoint\'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, \'func-theme\', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}\n        {renderSummaryCard(language === \'zh\' ? \'换型点检表状态\' : \'Changeover Checksheet Status\', changeTodayDoneLines, changePendingReviewLines, changeApprovedLines, changeTodayPendingLines, notInstalledLines, \'changeover-theme\', changeSummaryDate, setChangeSummaryDate, changeSummaryShift, setChangeSummaryShift, true)}\n        {renderSummaryCard(language === \'zh\' ? \'激光换型状态\' : \'Laser Changeover Status\', laserTodayDoneLines, laserPendingReviewLines, laserApprovedLines, laserTodayPendingLines, notInstalledLines, \'laser-theme\', laserSummaryDate, setLaserSummaryDate, laserSummaryShift, setLaserSummaryShift, true)}\n        </div>'
);

fs.writeFileSync('client/src/components/Reports.js', code);
console.log("Reports JSX patched");
