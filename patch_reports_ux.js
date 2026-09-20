const fs = require('fs');
let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');

// 1. Sync global filters with table filters
code = code.replace(
  'setLaserSummaryDate(date);',
  'setLaserSummaryDate(date);\n    setFilters(prev => ({ ...prev, from: date, to: date }));'
);
code = code.replace(
  'setLaserSummaryShift(shift);',
  'setLaserSummaryShift(shift);\n    setFilters(prev => ({ ...prev, shift: shift === \'Both\' ? \'\' : shift }));'
);

// 2. Make summary cards clickable
// To do this smoothly, we add an onClick to the div inside renderSummaryCard
code = code.replace(
  'const renderSummaryCard = (title, submittedLines, pendingReviewLines, approvedLines, notFilledLines, notInstLines, colorThemeClass, dateValue, onDateChange, shiftValue, onShiftChange, hideNotFilled = false) => {',
  'const renderSummaryCard = (title, submittedLines, pendingReviewLines, approvedLines, notFilledLines, notInstLines, colorThemeClass, dateValue, onDateChange, shiftValue, onShiftChange, hideNotFilled = false, typeKey = \'\') => {'
);
code = code.replace(
  '<div className={`summary-card ${colorThemeClass}`}>',
  '<div className={`summary-card ${colorThemeClass}`} onClick={() => { if(typeKey) { setReportType(typeKey); document.querySelector(\'.report-segmented-toggle\')?.scrollIntoView({ behavior: \'smooth\', block: \'start\' }); } }} style={{ cursor: typeKey ? \'pointer\' : \'default\' }}>'
);
// Make sure child inputs don't trigger the card click
code = code.replace(
  'onChange={(e) => onDateChange(e.target.value)}',
  'onChange={(e) => onDateChange(e.target.value)}\n                onClick={(e) => e.stopPropagation()}'
);
code = code.replace(
  'onChange={(e) => onShiftChange(e.target.value)}',
  'onChange={(e) => onShiftChange(e.target.value)}\n                onClick={(e) => e.stopPropagation()}'
);

// Update calls to renderSummaryCard
code = code.replace(
  'techSummaryShift, setTechSummaryShift)',
  'techSummaryShift, setTechSummaryShift, false, \'checklist\')'
);
code = code.replace(
  'funcSummaryShift, setFuncSummaryShift)',
  'funcSummaryShift, setFuncSummaryShift, false, \'checkpoint\')'
);
code = code.replace(
  'changeSummaryShift, setChangeSummaryShift, true)',
  'changeSummaryShift, setChangeSummaryShift, true, \'changeover\')'
);
code = code.replace(
  'laserSummaryShift, setLaserSummaryShift, true)',
  'laserSummaryShift, setLaserSummaryShift, true, \'laser_changeover\')'
);

// 3. Make the tab/filter bar sticky and nicer
code = code.replace(
  '<div className="report-segmented-toggle">',
  '<div className="report-sticky-header">\n        <div className="report-segmented-toggle" style={{ borderBottom: \'none\', padding: \'0.5rem 0\' }}>'
);
code = code.replace(
  '<div className="report-filters">',
  '<div className="report-filters" style={{ padding: \'0.5rem 0 1rem 0\', background: \'#f8fafc\', borderBottom: \'1px solid #e2e8f0\', boxShadow: \'0 4px 6px -1px rgba(0,0,0,0.05)\' }}>'
);
// Close the new wrapper div after report-filters
code = code.replace(
  '</select>\n          </label>\n        </div>\n\n        <div className="report-list-header">',
  '</select>\n          </label>\n        </div>\n        </div>\n\n        <div className="report-list-header">'
);

fs.writeFileSync('client/src/components/Reports.js', code);
console.log("Reports.js UX improvements patched.");
