const fs = require('fs');
let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');

code = code.replace(
  "{t('rep_toggle_checklist')}",
  "<>📝 {t('rep_toggle_checklist')}</>"
);
code = code.replace(
  "{t('rep_toggle_checkpoint')}",
  "<>⚙️ {t('rep_toggle_checkpoint')}</>"
);
code = code.replace(
  "Changeover Checksheet'}",
  "Changeover Checksheet'}</>"
);
code = code.replace(
  "language === 'zh' ? '?r \"' : 'Changeover Checksheet'",
  "<>🔄 {language === 'zh' ? '换线表单' : 'Changeover Checksheet'}"
);
code = code.replace(
  "Laser Changeover'}",
  "Laser Changeover'}</>"
);
code = code.replace(
  "language === 'zh' ? ' -> ?' : 'Laser Changeover'",
  "<>⚡ {language === 'zh' ? '镭射换线表单' : 'Laser Changeover'}"
);

fs.writeFileSync('client/src/components/Reports.js', code);
