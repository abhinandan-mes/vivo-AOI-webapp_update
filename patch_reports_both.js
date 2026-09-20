const fs = require('fs');

let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');

// 1. Remove the old Global Summary Controls block
const globalControlsRegex = /\s*\{\/\* Global Summary Controls \*\/\}\s*<div style=\{\{ display: 'flex'[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
code = code.replace(globalControlsRegex, '');

// 2. Inject the updated Global Summary Controls next to Doc No inside the heading
const newHeading = `
      <div className="reports-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>{t('rep_title')}</h1>
          <p>{language === 'zh' ? '详细记录储存在后台' : 'Detailed records stored in the backend.'}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {/* Global Summary Controls */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
                <option value="Both">{language === 'zh' ? '全部' : 'Both'}</option>
                <option value="Day">{language === 'zh' ? '白班' : 'Day'}</option>
                <option value="Night">{language === 'zh' ? '夜班' : 'Night'}</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b', textAlign: 'right', marginTop: '6px' }}>
            <div>AOI & SPI Doc No. - INWJZ1-42026050500004</div>
            <div>Laser Doc No. - WJZD00-2021020100003</div>
          </div>
        </div>
      </div>`;

const headingRegex = /<div className="reports-heading" style=\{\{ display: 'flex', justifyContent: 'space-between', alignItems:\s*'flex-start' \}\}>[\s\S]*?<div>Laser Doc No\. - WJZD00-2021020100003<\/div>\s*<\/div>\s*<\/div>/;
code = code.replace(headingRegex, newHeading);

// 3. Add "Both" option to the individual renderSummaryCard select
const shiftSelectRegex = /<option value="Day">\{t\('day'\)\}<\/option>\s*<option value="Night">\{t\('night'\)\}<\/option>/;
code = code.replace(shiftSelectRegex, `<option value="Both">{language === 'zh' ? '全部' : 'Both'}</option>\n                <option value="Day">{t('day')}</option>\n                <option value="Night">{t('night')}</option>`);

// 4. Update the 4 shift filters to support "Both"
code = code.replace(
  'r.shift === techSummaryShift);',
  '(techSummaryShift === \'Both\' || r.shift === techSummaryShift));'
);
code = code.replace(
  'r.shift === funcSummaryShift);',
  '(funcSummaryShift === \'Both\' || r.shift === funcSummaryShift));'
);
code = code.replace(
  'r.shift === changeSummaryShift);',
  '(changeSummaryShift === \'Both\' || r.shift === changeSummaryShift));'
);
code = code.replace(
  'r.shift === laserSummaryShift);',
  '(laserSummaryShift === \'Both\' || r.shift === laserSummaryShift));'
);

fs.writeFileSync('client/src/components/Reports.js', code);
console.log("Reports.js layout and logic updated!");
