const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

const btnRegex = /<button[\s\S]*?onClick=\{\(\) => setReportType\('changeover'\)\}[\s\S]*?<\/button>/;

const replacement = `<button
          type="button"
          className={\`toggle-btn \${reportType === 'changeover' ? 'active' : ''}\`}
          onClick={() => setReportType('changeover')}
        >
          {language === 'zh' ? '换线点检' : 'Changeover Checksheet'}
        </button>
        <button
          type="button"
          className={\`toggle-btn \${reportType === 'laser_changeover' ? 'active' : ''}\`}
          onClick={() => setReportType('laser_changeover')}
        >
          {language === 'zh' ? '镭雕换线' : 'Laser Changeover'}
        </button>`;

content = content.replace(btnRegex, replacement);

// Also let's fix ALL other ANSI artifacts globally in the file by looking for common patterns
content = content.replace(/AA\?AA AAA"ArAAA\?A"AA"/g, '换线点检');
content = content.replace(/A\?A"Ac'A"A AAAE\+A'/g, '所有线体');
content = content.replace(/A\?A"Ac'A"A A\?A-AAA'/g, '所有班别');
content = content.replace(/A\?A"Ac'A"A A\?A-A A\?z'/g, '所有班组');

fs.writeFileSync(file, content, 'utf8');
