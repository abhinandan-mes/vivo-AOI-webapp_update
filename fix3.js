const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

const target =         <button
          type="button"
          className={\	oggle-btn \\}
          onClick={() => setReportType('changeover')}
        >
          {language === 'zh' ? 'AA?AA AAA"ArAAA?A"AA"' : 'Changeover Checksheet'}
        </button>
      </div>;

const replacement =         <button
          type="button"
          className={\	oggle-btn \\}
          onClick={() => setReportType('changeover')}
        >
          {language === 'zh' ? '换线点检' : 'Changeover Checksheet'}
        </button>
        <button
          type="button"
          className={\	oggle-btn \\}
          onClick={() => setReportType('laser_changeover')}
        >
          {language === 'zh' ? '镭雕换线' : 'Laser Changeover'}
        </button>
      </div>;

content = content.replace(target, replacement);
fs.writeFileSync(file, content, 'utf8');
