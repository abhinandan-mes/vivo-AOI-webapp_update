const fs = require('fs');

let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');

// 1. Add global state variables and handlers
if (!code.includes('globalSummaryDate')) {
  const globalStateHook = `
  const [globalSummaryDate, setGlobalSummaryDate] = useState(() => dateKey(new Date()));
  const [globalSummaryShift, setGlobalSummaryShift] = useState(() => getCurrentShift());

  const handleGlobalDateChange = (date) => {
    setGlobalSummaryDate(date);
    setTechSummaryDate(date);
    setFuncSummaryDate(date);
    setChangeSummaryDate(date);
    setLaserSummaryDate(date);
  };

  const handleGlobalShiftChange = (shift) => {
    setGlobalSummaryShift(shift);
    setTechSummaryShift(shift);
    setFuncSummaryShift(shift);
    setChangeSummaryShift(shift);
    setLaserSummaryShift(shift);
  };
`;
  code = code.replace(
    'const [techSummaryDate, setTechSummaryDate] = useState(() => dateKey(new Date()));',
    globalStateHook + '\n  const [techSummaryDate, setTechSummaryDate] = useState(() => dateKey(new Date()));'
  );
}

// 2. Add the UI below reports-heading
if (!code.includes('Global Summary Controls')) {
  const globalUI = `
        {/* Global Summary Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0.4rem 1rem', background: '#fff', borderRadius: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#1e293b' }}>
            📊 {language === 'zh' ? '全局日期: ' : 'Global Stats Day: '}
            <input
              type="date"
              style={{ border: 'none', background: 'transparent', marginLeft: '0.5rem', outline: 'none', color: '#334155', fontWeight: 'bold' }}
              value={globalSummaryDate}
              onChange={(e) => handleGlobalDateChange(e.target.value)}
              max={dateKey(new Date())}
            />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0.4rem 1rem', background: '#fff', borderRadius: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#1e293b' }}>
            ⏱️ {language === 'zh' ? '全局班次: ' : 'Global Shift: '}
            <select
              style={{ border: 'none', background: 'transparent', marginLeft: '0.5rem', outline: 'none', color: '#334155', fontWeight: 'bold', cursor: 'pointer' }}
              value={globalSummaryShift}
              onChange={(e) => handleGlobalShiftChange(e.target.value)}
            >
              <option value="Day">{language === 'zh' ? '白班' : 'Day'}</option>
              <option value="Night">{language === 'zh' ? '夜班' : 'Night'}</option>
            </select>
          </div>
        </div>
`;

  code = code.replace(
    '<div className="reports-summary-dashboard"',
    globalUI + '\n        <div className="reports-summary-dashboard"'
  );
}

fs.writeFileSync('client/src/components/Reports.js', code);
console.log("Reports.js patched with global date/shift picker");
