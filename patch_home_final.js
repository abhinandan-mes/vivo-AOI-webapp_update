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
const laserCardJsx = `{/* Card 3 (Amber/Fuchsia): Laser Changeovers */}
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

// Regex specifically targeting ONLY Card 3! 
code = code.replace(
  /\{\/\* Card 3 \(Amber\): Active Groups \*\/\}\s*<div className="unified-stat-card accent-amber">\s*<div className="unified-icon-block icon-amber">[\s\S]*?<\/div>\s*<div className="unified-stat-content">[\s\S]*?<\/div>\s*<\/div>/,
  laserCardJsx
);

fs.writeFileSync('client/src/components/Home.js', code);
console.log("Home.js perfectly patched!");
