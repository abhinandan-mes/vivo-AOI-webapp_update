const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Add API state
content = content.replace(
  "const [changeovers, setChangeovers] = useState([]);",
  "const [changeovers, setChangeovers] = useState([]);\n  const [laserChangeovers, setLaserChangeovers] = useState([]);"
);

// 2. Add to Promise.all
content = content.replace(
  "apiService.getAllChangeoverChecksheets(),\n        apiService.getEngineers()",
  "apiService.getAllChangeoverChecksheets(),\n        apiService.getLaserChangeoverReports(),\n        apiService.getEngineers()"
);
content = content.replace(
  ".then(([checklistRes, checkpointRes, changeoverRes, engineersRes]) => {",
  ".then(([checklistRes, checkpointRes, changeoverRes, laserRes, engineersRes]) => {"
);
content = content.replace(
  "setChangeovers(changeoverRes.data.data || []);\n          setEngineers(engineersRes.data.data || []);",
  "setChangeovers(changeoverRes.data.data || []);\n          setLaserChangeovers(laserRes.data.data || []);\n          setEngineers(engineersRes.data.data || []);"
);

// 3. Add to delete handler
content = content.replace(
  "} else if (type === 'changeover') {",
  "} else if (type === 'laser_changeover') {\n          // await apiService.deleteLaserChangeover(id); // not implemented\n        } else if (type === 'changeover') {"
);

// 4. Update title/filename/export
content = content.replace(
  "reportType === 'changeover' ? (language === 'zh' ? '????' : 'Changeover Checksheet') :",
  "reportType === 'changeover' ? (language === 'zh' ? '????' : 'Changeover Checksheet') :\n    reportType === 'laser_changeover' ? (language === 'zh' ? '????' : 'Laser Changeover') :"
);
content = content.replace(
  "reportType === 'changeover' ? 'changeover-checksheets' :",
  "reportType === 'changeover' ? 'changeover-checksheets' :\n    reportType === 'laser_changeover' ? 'laser-changeover-checksheets' :"
);

// 5. Export columns
content = content.replace(
  "} else if (reportType === 'changeover') {",
  "} else if (reportType === 'laser_changeover') {\n      const detailColumns = [\n        [language === 'zh' ? '1. ??????' : '1. Program Name Confirmation', 'prog_name_check'],\n        [language === 'zh' ? '2. ??????' : '2. Laser Parameter Confirmation', 'laser_param_check'],\n        [language === 'zh' ? '3. ?????????' : '3. Laser Machine Duplicate Code Function', 'duplicate_code_check'],\n        [language === 'zh' ? '4. PCB????' : '4. PCB Anti-Reverse Confirmation', 'pcb_anti_reverse_check'],\n        [language === 'zh' ? '5. AB???????' : '5. A/B Side Barcode Consistency', 'ab_barcode_check'],\n        [language === 'zh' ? '6. ??????' : '6. Laser Carving Sequence Confirmation', 'laser_sequence_check'],\n        [language === 'zh' ? '7. ??????' : '7. Laser Carving Position Confirmation', 'laser_position_check']\n      ];\n      return [\n        [language === 'zh' ? '???' : 'Line', 'line'],\n        [language === 'zh' ? '??' : 'Group', 'group_name'],\n        [language === 'zh' ? '??' : 'Date', 'date'],\n        [language === 'zh' ? '??' : 'Shift', 'shift'],\n        [language === 'zh' ? '????' : 'Program Name', 'program_name'],\n        ...detailColumns\n      ];\n    } else if (reportType === 'changeover') {"
);

// 6. data rows
content = content.replace(
  "const data = reportType === 'checkpoint' ? checkpoints : reportType === 'changeover' ? changeovers : checklists;",
  "const data = reportType === 'checkpoint' ? checkpoints : reportType === 'changeover' ? changeovers : reportType === 'laser_changeover' ? laserChangeovers : checklists;"
);

// 7. push rows without padding
content = content.replace(
  "if (reportType === 'changeover') {\n      // Changeovers don't happen on every line every day",
  "if (reportType === 'changeover' || reportType === 'laser_changeover') {\n      // Changeovers don't happen on every line every day"
);

// 8. tab toggle
content = content.replace(
  "          <button\n            type=\"button\"\n            className={`toggle-btn ${reportType === 'changeover' ? 'active' : ''}`}\n            onClick={() => setReportType('changeover')}\n          >\n            {language === 'zh' ? '????' : 'Changeover'}\n          </button>",
  "          <button\n            type=\"button\"\n            className={`toggle-btn ${reportType === 'changeover' ? 'active' : ''}`}\n            onClick={() => setReportType('changeover')}\n          >\n            {language === 'zh' ? '????' : 'Changeover'}\n          </button>\n          <button\n            type=\"button\"\n            className={`toggle-btn ${reportType === 'laser_changeover' ? 'active' : ''}`}\n            onClick={() => setReportType('laser_changeover')}\n          >\n            {language === 'zh' ? '????' : 'Laser Changeover'}\n          </button>"
);

// 9. component insertion
content = content.replace(
  ": reportType === 'changeover'\n            ? <ChangeoverReport",
  ": reportType === 'laser_changeover'\n            ? <LaserChangeoverReport rows={filteredRows} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} isSuperAdmin={isSuperAdmin} onDelete={handleDeleteClick} getEngineerDisplay={getEngineerDisplay} selectedRows={selectedRows} onSelectRow={handleSelectRow} onSelectAll={handleSelectAll} />\n            : reportType === 'changeover'\n            ? <ChangeoverReport"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Replacements completed');
