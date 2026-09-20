const fs = require('fs');

// --- REPORTS.JS PATCH ---
let reportsCode = fs.readFileSync('client/src/components/Reports.js', 'utf8');

const targetStr = "{renderSummaryCard(t('rep_summary_checkpoint'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, 'func-theme', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}\n        </div>";

const replacementStr = `{renderSummaryCard(t('rep_summary_checkpoint'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, 'func-theme', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}
        {renderSummaryCard(language === 'zh' ? '换型点检表状态' : 'Changeover Checksheet Status', changeTodayDoneLines, changePendingReviewLines, changeApprovedLines, changeTodayPendingLines, notInstalledLines, 'changeover-theme', changeSummaryDate, setChangeSummaryDate, changeSummaryShift, setChangeSummaryShift, true)}
        {renderSummaryCard(language === 'zh' ? '激光换型状态' : 'Laser Changeover Status', laserTodayDoneLines, laserPendingReviewLines, laserApprovedLines, laserTodayPendingLines, notInstalledLines, 'laser-theme', laserSummaryDate, setLaserSummaryDate, laserSummaryShift, setLaserSummaryShift, true)}
        </div>`;

reportsCode = reportsCode.replace(targetStr, replacementStr);

fs.writeFileSync('client/src/components/Reports.js', reportsCode);
console.log("Reports.js fixed with exact match.");
