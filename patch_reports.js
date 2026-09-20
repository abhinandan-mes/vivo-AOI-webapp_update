const fs = require('fs');
let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');

// 1. Add state variables
code = code.replace(
  'const [funcSummaryShift, setFuncSummaryShift] = useState(() => getCurrentShift());',
  'const [funcSummaryShift, setFuncSummaryShift] = useState(() => getCurrentShift());\n  const [changeSummaryDate, setChangeSummaryDate] = useState(() => dateKey(new Date()));\n  const [changeSummaryShift, setChangeSummaryShift] = useState(() => getCurrentShift());\n  const [laserSummaryDate, setLaserSummaryDate] = useState(() => dateKey(new Date()));\n  const [laserSummaryShift, setLaserSummaryShift] = useState(() => getCurrentShift());'
);

// 2. Add useMemo hooks before updateFilter
const hooksCode = `
  const changeTodaySubmissions = useMemo(() => {
    return changeovers.filter(r => dateKey(r.date) === changeSummaryDate && r.shift === changeSummaryShift);
  }, [changeovers, changeSummaryDate, changeSummaryShift]);

  const changeTodayDoneLines = useMemo(() => {
    return Array.from(new Set(changeTodaySubmissions.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [changeTodaySubmissions, lineOptions]);

  const changeTodayPendingLines = useMemo(() => { return []; }, []);

  const changePendingReviewLines = useMemo(() => {
    const pending = changeTodaySubmissions.filter(r => r.approval_status === 'ENG_PENDING');
    return Array.from(new Set(pending.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [changeTodaySubmissions, lineOptions]);

  const changeApprovedLines = useMemo(() => {
    const approved = changeTodaySubmissions.filter(r => r.approval_status === 'APPROVED');
    return Array.from(new Set(approved.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [changeTodaySubmissions, lineOptions]);


  const laserTodaySubmissions = useMemo(() => {
    return laserChangeovers.filter(r => dateKey(r.date) === laserSummaryDate && r.shift === laserSummaryShift);
  }, [laserChangeovers, laserSummaryDate, laserSummaryShift]);

  const laserTodayDoneLines = useMemo(() => {
    return Array.from(new Set(laserTodaySubmissions.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [laserTodaySubmissions, lineOptions]);

  const laserTodayPendingLines = useMemo(() => { return []; }, []);

  const laserPendingReviewLines = useMemo(() => {
    const pending = laserTodaySubmissions.filter(r => r.approval_status === 'ENG_PENDING');
    return Array.from(new Set(pending.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [laserTodaySubmissions, lineOptions]);

  const laserApprovedLines = useMemo(() => {
    const approved = laserTodaySubmissions.filter(r => r.approval_status === 'APPROVED');
    return Array.from(new Set(approved.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [laserTodaySubmissions, lineOptions]);
`;
code = code.replace('  const updateFilter = event => {', hooksCode + '\n  const updateFilter = event => {');

// 3. Update renderSummaryCard signature
code = code.replace(
  'const renderSummaryCard = (title, submittedLines, pendingReviewLines, approvedLines, notFilledLines, notInstLines, colorThemeClass, dateValue, onDateChange, shiftValue, onShiftChange) => {',
  'const renderSummaryCard = (title, submittedLines, pendingReviewLines, approvedLines, notFilledLines, notInstLines, colorThemeClass, dateValue, onDateChange, shiftValue, onShiftChange, hideNotFilled = false) => {'
);

// 4. Hide 'notfilled' metric item
code = code.replace(
  '<div className="summary-metric-item">\n              <span className="metric-label notfilled">{language === \'zh\' ? \'未填写\' : \'Not Filled\'}</span>\n              <span className="metric-value notfilled">{notFilledLines.length} <small>/ {totalLines}</small></span>\n            </div>',
  '{!hideNotFilled && (\n              <div className="summary-metric-item">\n                <span className="metric-label notfilled">{language === \'zh\' ? \'未填写\' : \'Not Filled\'}</span>\n                <span className="metric-value notfilled">{notFilledLines.length} <small>/ {totalLines}</small></span>\n              </div>\n            )}'
);

// 5. Hide 'notfilled' breakdown group
code = code.replace(
  '<div className="line-breakdown-group">\n                <span className="breakdown-label notfilled">\n                  {language === \'zh\' ? \'未填写:\' : \'Not Filled:\'}\n                </span>\n                <div className="line-chips-container">\n                  {notFilledLines.length > 0 ? (\n                    notFilledLines.map(line => (\n                       <span key={line} className="line-chip notfilled">{line}</span>\n                    ))\n                  ) : (\n                    <span className="empty-chips-label">{t(\'rep_summary_empty\')}</span>\n                  )}\n                </div>\n              </div>',
  '{!hideNotFilled && (\n            <div className="line-breakdown-group">\n                <span className="breakdown-label notfilled">\n                  {language === \'zh\' ? \'未填写:\' : \'Not Filled:\'}\n                </span>\n                <div className="line-chips-container">\n                  {notFilledLines.length > 0 ? (\n                    notFilledLines.map(line => (\n                       <span key={line} className="line-chip notfilled">{line}</span>\n                    ))\n                  ) : (\n                    <span className="empty-chips-label">{t(\'rep_summary_empty\')}</span>\n                  )}\n                </div>\n              </div>\n            )}'
);

// 6. Hide 'not-installed' breakdown group
code = code.replace(
  '{notInstLines && notInstLines.length > 0 && (\n                <div className="line-breakdown-group">\n                  <span className="breakdown-label not-installed-label">\n                    {language === \'zh\' ? \'未安装:\' : \'Not Installed:\'}\n                  </span>\n                  <div className="line-chips-container">\n                    {notInstLines.map(line => (\n                      <span key={line} className="line-chip not-installed-chip">{line}</span>\n                    ))}\n                  </div>\n                </div>\n              )}',
  '{!hideNotFilled && notInstLines && notInstLines.length > 0 && (\n                <div className="line-breakdown-group">\n                  <span className="breakdown-label not-installed-label">\n                    {language === \'zh\' ? \'未安装:\' : \'Not Installed:\'}\n                  </span>\n                  <div className="line-chips-container">\n                    {notInstLines.map(line => (\n                      <span key={line} className="line-chip not-installed-chip">{line}</span>\n                    ))}\n                  </div>\n                </div>\n              )}'
);

// 7. Add the dashboard cards
code = code.replace(
  '{/* 📊 Summary Dashboard Panel 📊 */}\n      <div className="reports-summary-dashboard">',
  '{/* 📊 Summary Dashboard Panel 📊 */}\n      <div className="reports-summary-dashboard" style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: \'1rem\', marginBottom: \'1rem\' }}>'
);

code = code.replace(
  '{renderSummaryCard(t(\'rep_summary_checkpoint\'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, \'func-theme\', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}\n      </div>',
  '{renderSummaryCard(t(\'rep_summary_checkpoint\'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, \'func-theme\', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}\n        {renderSummaryCard(language === \'zh\' ? \'换型点检表状态\' : \'Changeover Checksheet Status\', changeTodayDoneLines, changePendingReviewLines, changeApprovedLines, changeTodayPendingLines, notInstalledLines, \'changeover-theme\', changeSummaryDate, setChangeSummaryDate, changeSummaryShift, setChangeSummaryShift, true)}\n        {renderSummaryCard(language === \'zh\' ? \'激光换型状态\' : \'Laser Changeover Status\', laserTodayDoneLines, laserPendingReviewLines, laserApprovedLines, laserTodayPendingLines, notInstalledLines, \'laser-theme\', laserSummaryDate, setLaserSummaryDate, laserSummaryShift, setLaserSummaryShift, true)}\n      </div>'
);

fs.writeFileSync('client/src/components/Reports.js', code);
console.log("Reports.js patched successfully");
