const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

// The original file has weird ANSI/Windows-1252 corrupted text.
// Let's find it by a regex for the Changeover button and replace it.
const btnRegex = /<button[\s\S]*?onClick=\{\(\) => setReportType\('changeover'\)\}[\s\S]*?<\/button>/;

const replacement = `<button
          type="button"
          className={\`toggle-btn ${reportType === 'changeover' ? 'active' : ''}\`}
          onClick={() => setReportType('changeover')}
        >
          {language === 'zh' ? '换线点检' : 'Changeover Checksheet'}
        </button>
        <button
          type="button"
          className={\`toggle-btn ${reportType === 'laser_changeover' ? 'active' : ''}\`}
          onClick={() => setReportType('laser_changeover')}
        >
          {language === 'zh' ? '镭雕换线' : 'Laser Changeover'}
        </button>`;

content = content.replace(btnRegex, replacement);
fs.writeFileSync(file, content, 'utf8');
