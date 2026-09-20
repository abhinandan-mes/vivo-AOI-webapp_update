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

// 3. signature
code = code.replace(
  'const renderSummaryCard = (title, submittedLines, pendingReviewLines, approvedLines, notFilledLines, notInstLines, colorThemeClass, dateValue, onDateChange, shiftValue, onShiftChange) => {',
  'const renderSummaryCard = (title, submittedLines, pendingReviewLines, approvedLines, notFilledLines, notInstLines, colorThemeClass, dateValue, onDateChange, shiftValue, onShiftChange, hideNotFilled = false) => {'
);

// 4. metrics
let lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<span className="metric-value submitted">{submittedLines.length} <small>/ {totalLines}</small></span>')) {
    lines[i] = lines[i].replace('<small>/ {totalLines}</small>', '{!hideNotFilled && <small>/ {totalLines}</small>}');
  }
  if (lines[i].includes('<span className="metric-value pending-review">{pendingReviewLines.length} <small>/ {submittedLines.length}</small></span>')) {
    lines[i] = lines[i].replace('<small>/ {submittedLines.length}</small>', '{!hideNotFilled && <small>/ {submittedLines.length}</small>}');
  }
  if (lines[i].includes('<span className="metric-value approved">{approvedLines.length} <small>/ {submittedLines.length}</small></span>')) {
    lines[i] = lines[i].replace('<small>/ {submittedLines.length}</small>', '{!hideNotFilled && <small>/ {submittedLines.length}</small>}');
  }

  // Not filled metric item
  if (lines[i].includes('<div className="summary-metric-item">') && lines[i+1] && lines[i+1].includes('Not Filled')) {
    lines[i] = '{!hideNotFilled && (\n' + lines[i];
    lines[i+3] = lines[i+3] + '\n)}';
  }

  // Progress ring
  if (lines[i].includes('<div className="summary-progress-ring-container">')) {
    lines[i] = '{!hideNotFilled && (\n' + lines[i];
  }
  if (lines[i].includes('<span className="progress-percent">{progressPercent}%</span>')) {
    lines[i+1] = lines[i+1] + '\n)}';
  }

  // breakdown not filled
  if (lines[i].includes('<div className="line-breakdown-group">') && lines[i+1] && lines[i+1].includes('Not Filled:')) {
    lines[i] = '{!hideNotFilled && (\n' + lines[i];
    lines[i+11] = lines[i+11] + '\n)}';
  }

  // breakdown not installed
  if (lines[i].includes('{notInstLines && notInstLines.length > 0 && (')) {
    lines[i] = lines[i].replace('{notInstLines && notInstLines.length > 0 && (', '{!hideNotFilled && notInstLines && notInstLines.length > 0 && (');
  }
}

code = lines.join('\n');

// 5. grid
code = code.replace(
  '<div className="reports-summary-dashboard">',
  '<div className="reports-summary-dashboard" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>'
);

code = code.replace(
  '{renderSummaryCard(t(\'rep_summary_checkpoint\'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, \'func-theme\', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}\n        </div>',
  '{renderSummaryCard(t(\'rep_summary_checkpoint\'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, \'func-theme\', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}\n        {renderSummaryCard(language === \'zh\' ? \'换型点检表状态\' : \'Changeover Checksheet Status\', changeTodayDoneLines, changePendingReviewLines, changeApprovedLines, changeTodayPendingLines, notInstalledLines, \'changeover-theme\', changeSummaryDate, setChangeSummaryDate, changeSummaryShift, setChangeSummaryShift, true)}\n        {renderSummaryCard(language === \'zh\' ? \'激光换型状态\' : \'Laser Changeover Status\', laserTodayDoneLines, laserPendingReviewLines, laserApprovedLines, laserTodayPendingLines, notInstalledLines, \'laser-theme\', laserSummaryDate, setLaserSummaryDate, laserSummaryShift, setLaserSummaryShift, true)}\n        </div>'
);

fs.writeFileSync('client/src/components/Reports.js', code);
console.log("Reports.js perfect patch done.");
