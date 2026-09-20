const fs = require('fs');
let code = fs.readFileSync('client/src/components/Home.js', 'utf8');

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
console.log("Home.js Active Groups patched");
