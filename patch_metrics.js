const fs = require('fs');
let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');

// 1. Hide 'notfilled' metric item
code = code.replace(
  '<div className="summary-metric-item">\n              <span className="metric-label notfilled">{language === \'zh\' ? \'未填写\' : \'Not Filled\'}</span>\n              <span className="metric-value notfilled">{notFilledLines.length} <small>/ {totalLines}</small></span>\n            </div>',
  '{!hideNotFilled && (\n              <div className="summary-metric-item">\n                <span className="metric-label notfilled">{language === \'zh\' ? \'未填写\' : \'Not Filled\'}</span>\n                <span className="metric-value notfilled">{notFilledLines.length} <small>/ {totalLines}</small></span>\n              </div>\n            )}'
);

// 2. Hide 'notfilled' breakdown group
code = code.replace(
  '<div className="line-breakdown-group">\n                <span className="breakdown-label notfilled">\n                  {language === \'zh\' ? \'未填写:\' : \'Not Filled:\'}\n                </span>\n                <div className="line-chips-container">\n                  {notFilledLines.length > 0 ? (\n                    notFilledLines.map(line => (\n                       <span key={line} className="line-chip notfilled">{line}</span>\n                    ))\n                  ) : (\n                    <span className="empty-chips-label">{t(\'rep_summary_empty\')}</span>\n                  )}\n                </div>\n              </div>',
  '{!hideNotFilled && (\n            <div className="line-breakdown-group">\n                <span className="breakdown-label notfilled">\n                  {language === \'zh\' ? \'未填写:\' : \'Not Filled:\'}\n                </span>\n                <div className="line-chips-container">\n                  {notFilledLines.length > 0 ? (\n                    notFilledLines.map(line => (\n                       <span key={line} className="line-chip notfilled">{line}</span>\n                    ))\n                  ) : (\n                    <span className="empty-chips-label">{t(\'rep_summary_empty\')}</span>\n                  )}\n                </div>\n              </div>\n            )}'
);

// 3. Hide 'not-installed' breakdown group
code = code.replace(
  '{notInstLines && notInstLines.length > 0 && (\n                <div className="line-breakdown-group">\n                  <span className="breakdown-label not-installed-label">\n                    {language === \'zh\' ? \'未安装:\' : \'Not Installed:\'}\n                  </span>\n                  <div className="line-chips-container">\n                    {notInstLines.map(line => (\n                      <span key={line} className="line-chip not-installed-chip">{line}</span>\n                    ))}\n                  </div>\n                </div>\n              )}',
  '{!hideNotFilled && notInstLines && notInstLines.length > 0 && (\n                <div className="line-breakdown-group">\n                  <span className="breakdown-label not-installed-label">\n                    {language === \'zh\' ? \'未安装:\' : \'Not Installed:\'}\n                  </span>\n                  <div className="line-chips-container">\n                    {notInstLines.map(line => (\n                      <span key={line} className="line-chip not-installed-chip">{line}</span>\n                    ))}\n                  </div>\n                </div>\n              )}'
);

// 4. Hide progress circle and text denominators if hideNotFilled is true
// Look for progress container:
code = code.replace(
  '<div className="summary-progress-ring-container">',
  '{!hideNotFilled && (\n            <div className="summary-progress-ring-container">'
);
code = code.replace(
  '<span className="progress-percent">{progressPercent}%</span>\n              </div>',
  '<span className="progress-percent">{progressPercent}%</span>\n              </div>\n            )}'
);

// For the ' / 18' text, let's conditionally render `<small>/ {totalLines}</small>`
code = code.replace(
  '<span className="metric-value submitted">{submittedLines.length} <small>/ {totalLines}</small></span>',
  '<span className="metric-value submitted">{submittedLines.length} {!hideNotFilled && <small>/ {totalLines}</small>}</span>'
);
code = code.replace(
  '<span className="metric-value pending-review">{pendingReviewLines.length} <small>/ {submittedLines.length}</small></span>',
  '<span className="metric-value pending-review">{pendingReviewLines.length} {!hideNotFilled && <small>/ {submittedLines.length}</small>}</span>'
);
code = code.replace(
  '<span className="metric-value approved">{approvedLines.length} <small>/ {submittedLines.length}</small></span>',
  '<span className="metric-value approved">{approvedLines.length} {!hideNotFilled && <small>/ {submittedLines.length}</small>}</span>'
);

fs.writeFileSync('client/src/components/Reports.js', code);
console.log("Reports JSX metric patched successfully");
