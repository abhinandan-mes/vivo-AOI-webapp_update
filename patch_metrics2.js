const fs = require('fs');
let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');

// The replacement for notFilledLines.length in the top row
code = code.replace(
  /<div className="summary-metric-item">\s*<span className="metric-label notfilled">.*?<\/span>\s*<span className="metric-value notfilled">\{notFilledLines\.length\} <small>\/ \{totalLines\}<\/small><\/span>\s*<\/div>/,
  '{!hideNotFilled && (<div className="summary-metric-item"><span className="metric-label notfilled">{language === \'zh\' ? \'未填写\' : \'Not Filled\'}</span><span className="metric-value notfilled">{notFilledLines.length} <small>/ {totalLines}</small></span></div>)}'
);

// The replacement for breakdown group notfilled
code = code.replace(
  /<div className="line-breakdown-group">\s*<span className="breakdown-label notfilled">[\s\S]*?className="empty-chips-label".*?<\/div>\s*<\/div>/,
  '{!hideNotFilled && ( <div className="line-breakdown-group"><span className="breakdown-label notfilled">{language === \'zh\' ? \'未填写:\' : \'Not Filled:\'}</span><div className="line-chips-container">{notFilledLines.length > 0 ? (notFilledLines.map(line => (<span key={line} className="line-chip notfilled">{line}</span>))) : (<span className="empty-chips-label">{t(\'rep_summary_empty\')}</span>)}</div></div>)}'
);

fs.writeFileSync('client/src/components/Reports.js', code);
console.log("Reports JSX metric patched fully");
