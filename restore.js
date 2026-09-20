const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Add state
content = content.replace(
  "const [changeovers, setChangeovers] = useState([]);",
  "const [changeovers, setChangeovers] = useState([]);\n  const [laserChangeovers, setLaserChangeovers] = useState([]);"
);

// 2. Fix Promise array
content = content.replace(
  "apiService.getAllChangeoverChecksheets(),\n      apiService.getEngineers()",
  "apiService.getAllChangeoverChecksheets(),\n      apiService.getLaserChangeoverReports(),\n      apiService.getEngineers()"
);

// 3. Fix Promise then
content = content.replace(
  ".then(([checklistRes, checkpointRes, changeoverRes, engineersRes]) => {",
  ".then(([checklistRes, checkpointRes, changeoverRes, laserRes, engineersRes]) => {"
);
content = content.replace(
  "setChangeovers(changeoverRes.data.data || []);\n        setEngineers(engineersRes.data.data || []);",
  "setChangeovers(changeoverRes.data.data || []);\n        setLaserChangeovers(laserRes.data.data || []);\n        setEngineers(engineersRes.data.data || []);"
);

// 4. Update useMemo
content = content.replace(
  "reportType === 'checkpoint' ? checkpoints : reportType === 'changeover' ? changeovers : checklists;",
  "reportType === 'checkpoint' ? checkpoints : reportType === 'changeover' ? changeovers : reportType === 'laser_changeover' ? laserChangeovers : checklists;"
);
content = content.replace(
  "}, [reportType, checklists, checkpoints, allLineOptions, notInstalledLines, filters.sort]);",
  "}, [reportType, checklists, checkpoints, changeovers, laserChangeovers, allLineOptions, notInstalledLines, filters.sort]);"
);

// 5. Update delete handler
content = content.replace(
  "} else if (type === 'changeover') {",
  "} else if (type === 'laser_changeover') {\n          // await apiService.deleteLaserChangeover(id);\n        } else if (type === 'changeover') {"
);

// 6. Update titles and filenames
content = content.replace(
  "reportType === 'changeover' ? (language === 'zh' ? '换线点检' : 'Changeover Checksheet') :",
  "reportType === 'changeover' ? (language === 'zh' ? '换线点检' : 'Changeover Checksheet') :\n    reportType === 'laser_changeover' ? (language === 'zh' ? '镭雕换线' : 'Laser Changeover') :"
);
content = content.replace(
  "reportType === 'changeover' ? 'changeover-checksheets' :",
  "reportType === 'changeover' ? 'changeover-checksheets' :\n    reportType === 'laser_changeover' ? 'laser-changeover-checksheets' :"
);

// 7. Update export columns
content = content.replace(
  "} else if (reportType === 'changeover') {",
  "} else if (reportType === 'laser_changeover') {\n      const detailColumns = [\n        [language === 'zh' ? '1. 程序名称' : '1. Program Name Confirmation', 'prog_name_check'],\n        [language === 'zh' ? '2. 镭雕参数' : '2. Laser Parameter Confirmation', 'laser_param_check'],\n        [language === 'zh' ? '3. 重码功能' : '3. Laser Machine Duplicate Code Function', 'duplicate_code_check'],\n        [language === 'zh' ? '4. PCB防反' : '4. PCB Anti-Reverse Confirmation', 'pcb_anti_reverse_check'],\n        [language === 'zh' ? '5. AB面条码' : '5. A/B Side Barcode Consistency', 'ab_barcode_check'],\n        [language === 'zh' ? '6. 镭雕顺序' : '6. Laser Carving Sequence Confirmation', 'laser_sequence_check'],\n        [language === 'zh' ? '7. 镭雕位置' : '7. Laser Carving Position Confirmation', 'laser_position_check']\n      ];\n      return [\n        [language === 'zh' ? '线体号' : 'Line', 'line'],\n        [language === 'zh' ? '班组' : 'Group', 'group_name'],\n        [language === 'zh' ? '日期' : 'Date', 'date'],\n        [language === 'zh' ? '班别' : 'Shift', 'shift'],\n        [language === 'zh' ? '程序名称' : 'Program Name', 'program_name'],\n        ...detailColumns\n      ];\n    } else if (reportType === 'changeover') {"
);

// 8. Add tab toggle
const changeoverTabRegex = /<button[\s\S]*?onClick=\{\(\) => setReportType\('changeover'\)\}[\s\S]*?<\/button>/;
const match = content.match(changeoverTabRegex);
if (match) {
  content = content.replace(match[0], match[0] + "\n        <button\n          type=\"button\"\n          className={`toggle-btn ${reportType === 'laser_changeover' ? 'active' : ''}`}\n          onClick={() => setReportType('laser_changeover')}\n        >\n          {language === 'zh' ? '镭雕换线' : 'Laser Changeover'}\n        </button>");
}

// 9. Add component logic
const renderLogicRegex = /:\s*reportType === 'changeover'\s*\?\s*<ChangeoverReport/;
content = content.replace(
  renderLogicRegex,
  ": reportType === 'laser_changeover'\n            ? <LaserChangeoverReport rows={filteredRows} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} isSuperAdmin={isSuperAdmin} onDelete={handleDeleteClick} getEngineerDisplay={getEngineerDisplay} selectedRows={selectedRows} onSelectRow={handleSelectRow} onSelectAll={handleSelectAll} />\n            : reportType === 'changeover'\n            ? <ChangeoverReport"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Restored perfectly');
