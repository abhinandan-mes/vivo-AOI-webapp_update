const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

const target = `<button
          type="button"
          className={\`toggle-btn \${reportType === 'changeover' ? 'active' : ''}\`}
          onClick={() => setReportType('changeover')}
        >
          {language === 'zh' ? '换线点检' : 'Changeover Checksheet'}
        </button>`;

const replacement = `<button
          type="button"
          className={\`toggle-btn \${reportType === 'checklist' ? 'active' : ''}\`}
          onClick={() => setReportType('checklist')}
        >
          {t('rep_toggle_checklist')}
        </button>
        <button
          type="button"
          className={\`toggle-btn \${reportType === 'checkpoint' ? 'active' : ''}\`}
          onClick={() => setReportType('checkpoint')}
        >
          {t('rep_toggle_checkpoint')}
        </button>
        <button
          type="button"
          className={\`toggle-btn \${reportType === 'changeover' ? 'active' : ''}\`}
          onClick={() => setReportType('changeover')}
        >
          {language === 'zh' ? '换线点检' : 'Changeover Checksheet'}
        </button>`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content, 'utf8');
