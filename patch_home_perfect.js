const fs = require('fs');
let code = fs.readFileSync('client/src/components/Home.js', 'utf8');

// 1. Add laserChangeover to dashboardStats state
code = code.replace(
  'changeover: { total: 0, shifts: { day: 0, night: 0 }, groups: {} }',
  'changeover: { total: 0, shifts: { day: 0, night: 0 }, groups: {} },\n      laserChangeover: { total: 0, shifts: { day: 0, night: 0 }, groups: {} }'
);

// 2. Fetch logic
const newFetchLogic = `
        const statsResponse = await apiService.getDashboardStats(date);
        let updatedStats = {
          checkpoint: { total: 0, shifts: { day: 0, night: 0 }, groups: {} },
          checklist: { total: 0, shifts: { day: 0, night: 0 }, groups: {} },
          changeover: { total: 0, shifts: { day: 0, night: 0 }, groups: {} },
          laserChangeover: { total: 0, shifts: { day: 0, night: 0 }, groups: {} }
        };

        if (statsResponse.data && statsResponse.data.success) {
          updatedStats = {
            ...updatedStats,
            checkpoint: statsResponse.data.checkpoint,
            checklist: statsResponse.data.checklist,
            changeover: statsResponse.data.changeover || updatedStats.changeover
          };
        }

        try {
          const laserRes = await apiService.getLaserChangeoverReports({ date });
          if (laserRes.data && laserRes.data.data) {
             const lasers = laserRes.data.data;
             const laserDayShift = lasers.filter(c => c.shift === 'Day').length;
             const laserNightShift = lasers.filter(c => c.shift === 'Night').length;
             updatedStats.laserChangeover = {
               total: lasers.length,
               shifts: { day: laserDayShift, night: laserNightShift },
               groups: {}
             };
          }
        } catch(err) {
          console.error("Failed to fetch laser changeovers for dashboard", err);
        }

        setDashboardStats(updatedStats);
`;
code = code.replace(
  /const statsResponse = await apiService\.getDashboardStats\(date\);\s*if \(statsResponse\.data\.success\) \{\s*setDashboardStats\(\{[\s\S]*?\}\);\s*\}/,
  newFetchLogic
);

// 3. Totals
code = code.replace(
  'const changeoverTotal = stats.changeover?.total || 0;\n    const combinedTotal = checklistTotal + checkpointTotal + changeoverTotal;',
  'const changeoverTotal = stats.changeover?.total || 0;\n    const laserTotal = stats.laserChangeover?.total || 0;\n    const combinedTotal = checklistTotal + checkpointTotal + changeoverTotal + laserTotal;'
);

// 4. Update the Active Groups Card JSX to Laser Changeovers Card JSX
const originalCardStr = `        {/* Card 3 (Amber): Active Groups */}
        <div className="unified-stat-card accent-amber">
          <div className="unified-icon-block icon-amber">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </div>
          <div className="unified-stat-content">
            <span className="unified-stat-label">{language === 'zh' ? '活跃的小组' : 'Active Groups'}</span>
            <span className="unified-stat-value">{activeGroupsCount}</span>
            <span className="unified-stat-sub" title={groupBreakdownStr} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{groupBreakdownStr}</span>
          </div>
        </div>`;

// Wait, the zh text in original string might be corrupted or different. Let's use regex instead of direct string replace for the card
const laserCardJsx = `        {/* Card 3 (Amber/Fuchsia): Laser Changeovers */}
        <div className="unified-stat-card accent-fuchsia" style={{ borderLeftColor: '#d946ef' }}>
          <div className="unified-icon-block" style={{ background: '#fdf4ff', color: '#d946ef' }}>
             <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9v8l10-12h-9z"/></svg>
          </div>
          <div className="unified-stat-content">
            <span className="unified-stat-label">{language === 'zh' ? '激光换型' : 'Laser Changeovers'}</span>
            <span className="unified-stat-value">{stats.laserChangeover?.total || 0}</span>
            <span className="unified-stat-sub">{language === 'zh' ? \`白班: \${stats.laserChangeover?.shifts?.day || 0} | 夜班: \${stats.laserChangeover?.shifts?.night || 0}\` : \`Day: \${stats.laserChangeover?.shifts?.day || 0} | Night: \${stats.laserChangeover?.shifts?.night || 0}\`}</span>
          </div>
        </div>`;

code = code.replace(
  /\{\/\* Card 3 \(Amber\): Active Groups \*\/\}[ \t\n\r]*<div className="unified-stat-card accent-amber">[\s\S]*?<\/div>[ \t\n\r]*<\/div>[ \t\n\r]*<\/div>/,
  laserCardJsx
);

fs.writeFileSync('client/src/components/Home.js', code);
console.log("Home.js perfect patch done.");
