const fs = require('fs');
let code = fs.readFileSync('client/src/components/Home.js', 'utf8');

// 1. Add laserChangeover to dashboardStats state
code = code.replace(
  'changeover: { total: 0, shifts: { day: 0, night: 0 }, groups: {} }',
  'changeover: { total: 0, shifts: { day: 0, night: 0 }, groups: {} },\n      laserChangeover: { total: 0, shifts: { day: 0, night: 0 }, groups: {} }'
);

// 2. Add laserChangeover computation logic to fetchDashboardData
const newFetchLogic = `
        // 1. Fetch daily submission stats for the selected date
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

        // Fetch laser changeovers manually since it's not in the dashboard stats API
        try {
          const laserRes = await apiService.getLaserChangeoverReports({ date });
          if (laserRes.data && laserRes.data.data) {
             const lasers = laserRes.data.data;
             const laserDayShift = lasers.filter(c => c.shift === 'Day').length;
             const laserNightShift = lasers.filter(c => c.shift === 'Night').length;
             const laserGroups = {};
             lasers.forEach(c => {
               const g = c.group_name || 'Unknown';
               laserGroups[g] = (laserGroups[g] || 0) + 1;
             });
             updatedStats.laserChangeover = {
               total: lasers.length,
               shifts: { day: laserDayShift, night: laserNightShift },
               groups: laserGroups
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

// 3. Update active groups replacement with Laser Changeover
code = code.replace(
  'const changeoverTotal = stats.changeover?.total || 0;\n    const combinedTotal = checklistTotal + checkpointTotal + changeoverTotal;',
  'const changeoverTotal = stats.changeover?.total || 0;\n    const laserTotal = stats.laserChangeover?.total || 0;\n    const combinedTotal = checklistTotal + checkpointTotal + changeoverTotal + laserTotal;'
);

// 4. Update JSX cards - replace Active Groups card with Laser Changeover card
const laserCardJsx = `
        <div className="stat-card">
          <div className="stat-card-inner">
            <div className="stat-icon-wrapper" style={{ background: '#fdf4ff', color: '#d946ef' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-label">{language === 'zh' ? '激光换型' : 'LASER CHANGEOVERS'}</span>
              <span className="stat-number">{laserTotal}</span>
              <span className="stat-detail">Day: {stats.laserChangeover?.shifts?.day || 0} | Night: {stats.laserChangeover?.shifts?.night || 0}</span>
            </div>
          </div>
        </div>
`;

code = code.replace(
  /<div className="stat-card">\s*<div className="stat-card-inner">\s*<div className="stat-icon-wrapper" style={{ background: '#fefce8', color: '#eab308' }}>[\s\S]*?<span className="stat-label">{language === 'zh' \? '活跃的小组' : 'ACTIVE GROUPS'}<\/span>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  laserCardJsx
);

fs.writeFileSync('client/src/components/Home.js', code);
console.log("Home.js patched successfully");
