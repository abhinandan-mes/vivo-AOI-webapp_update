const fs = require('fs');

// Patch Reports.js
let reports = fs.readFileSync('client/src/components/Reports.js', 'utf8');

reports = reports.replace(
  "const [changeovers, setChangeovers] = useState([]);",
  "const [changeovers, setChangeovers] = useState([]);\n  const [laserChangeovers, setLaserChangeovers] = useState([]);"
);

reports = reports.replace(
  "const [checklistsRes, checkpointsRes, changeoverRes, engineersRes] = await Promise.all([\n          apiService.getAllChecklists(),\n          apiService.getAllCheckpoints(),\n          apiService.getAllChangeoverChecksheets(),\n          apiService.getEngineers()\n        ]);",
  "const [checklistsRes, checkpointsRes, changeoverRes, laserRes, engineersRes] = await Promise.all([\n          apiService.getAllChecklists(),\n          apiService.getAllCheckpoints(),\n          apiService.getAllChangeoverChecksheets(),\n          apiService.getLaserChangeoverReports(),\n          apiService.getEngineers()\n        ]);"
);

reports = reports.replace(
  "setChangeovers(changeoverRes.data.data || []);",
  "setChangeovers(changeoverRes.data.data || []);\n        setLaserChangeovers(laserRes.data.data || []);"
);

// Toggle
reports = reports.replace(
  /<label className="toggle-label">\s*<input type="radio" value="changeover".*?<\/label>/s,
  `$&
          <label className="toggle-label">
            <input type="radio" value="laser_changeover" checked={reportType === 'laser_changeover'} onChange={e => setReportType(e.target.value)} />
            <span className="toggle-button">
              Laser Changeover
            </span>
          </label>`
);

reports = reports.replace(
  "const data = reportType === 'checkpoint' ? checkpoints : reportType === 'changeover' ? changeovers : checklists;",
  "const data = reportType === 'checkpoint' ? checkpoints : reportType === 'changeover' ? changeovers : reportType === 'laser_changeover' ? laserChangeovers : checklists;"
);

reports = reports.replace(
  "if (reportType === 'changeover') {",
  "if (reportType === 'changeover' || reportType === 'laser_changeover') {"
);

reports = reports.replace(
  "} else if (type === 'changeover') {",
  "} else if (type === 'laser_changeover') {\n          await apiService.deleteLaserChangeover(id);\n        } else if (type === 'changeover') {"
);

reports = reports.replace(
  ": reportType === 'changeover'\n              ? <ChangeoverReport rows={filteredRows}",
  ": reportType === 'laser_changeover'\n              ? <LaserChangeoverReport rows={filteredRows} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} isSuperAdmin={isSuperAdmin} onDelete={handleDeleteClick} getEngineerDisplay={getEngineerDisplay} selectedRows={selectedRows} onSelectRow={handleSelectRow} onSelectAll={handleSelectAll} />\n              : reportType === 'changeover'\n              ? <ChangeoverReport rows={filteredRows}"
);

reports = reports.replace(
  /<div style="font-size: 10px; font-weight: bold; color: #334155;">\s*Doc No\. - INWJZ1-42026050500004\s*<\/div>/g,
  `<div style="font-size: 10px; font-weight: bold; color: #334155; text-align: right;">
                <div>AOI & SPI Doc no. - INWJZ1-42026050500004</div>
                <div>Laser Doc no. WJZD00-2021020100003</div>
              </div>`
);
reports = reports.replace(
  /<div style={{ fontSize: '0\.85rem', fontWeight: 'bold', color: '#64748b', textAlign: 'right', marginTop: '6px' }}>\s*Doc No\. - INWJZ1-42026050500004\s*<\/div>/g,
  `<div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b', textAlign: 'right', marginTop: '6px' }}>
            <div>AOI & SPI Doc no. - INWJZ1-42026050500004</div>
            <div>Laser Doc no. WJZD00-2021020100003</div>
          </div>`
);

// We need to fetch the existing ChangeoverReport component to build LaserChangeoverReport with the same pristine Chinese characters!
// Let's copy ChangeoverReport and rename fields.
const coReportMatch = reports.match(/function ChangeoverReport\(\{(.*?)\}\) \{([\s\S]*?)\n\}\n/);
if (coReportMatch) {
  let laserReport = coReportMatch[0].replace('function ChangeoverReport', 'function LaserChangeoverReport');
  
  // Replace columns in header
  laserReport = laserReport.replace("<th>{language === 'zh' ? '机型名称' : 'Model Name'}</th>", "<th>{language === 'zh' ? '程序名称' : 'Program Name'}</th>");
  laserReport = laserReport.replace("<th>{language === 'zh' ? '机种代码' : 'Model Code'}</th>", "");
  
  laserReport = laserReport.replace(
    /<th>\{language === 'zh' \? '工程师' : 'Engineer'\}<\/th>/,
    "<th>{language === 'zh' ? '1. 程序名称' : '1. Prog Name'}</th>\n          <th>{language === 'zh' ? '2. 镭雕参数' : '2. Laser Param'}</th>\n          <th>{language === 'zh' ? '3. 重码功能' : '3. Dup Code'}</th>\n          <th>{language === 'zh' ? '4. PCB防反' : '4. Anti-Reverse'}</th>\n          <th>{language === 'zh' ? '5. AB条码一致' : '5. A/B Barcode'}</th>\n          <th>{language === 'zh' ? '6. 镭雕顺序' : '6. Sequence'}</th>\n          <th>{language === 'zh' ? '7. 镭雕位置' : '7. Position'}</th>\n\n          <th>{language === 'zh' ? '提交人' : 'Submitted By'}</th>\n          <th>{language === 'zh' ? '工程师' : 'Engineer'}</th>\n          <th>{language === 'zh' ? '工程师审核时间' : 'ENG Review Time'}</th>\n          <th>{language === 'zh' ? '组长审批' : 'GL Approval'}</th>\n          <th>{language === 'zh' ? '组长审批时间' : 'GL Review Time'}</th>"
  );
  
  // Replace rows
  laserReport = laserReport.replace("<td>{row.model_name || ''}</td>", "<td>{row.program_name || ''}</td>");
  laserReport = laserReport.replace("<td>{row.model_code || ''}</td>", `
              <td style={{ textAlign: 'center' }}>{renderBool(row.prog_name_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.laser_param_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.duplicate_code_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.pcb_anti_reverse_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.ab_barcode_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.laser_sequence_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.laser_position_check)}</td>
              <td>{row.submitted_by || ''}</td>
  `);
  
  // Engineer columns
  laserReport = laserReport.replace("<td>{getEngineerDisplay(row.designated_engineer_id)}</td>", "<td>{getEngineerDisplay(row.designated_engineer_id)}</td>\n              <td>{row.approval_status !== 'ENG_PENDING' ? formatDateTime(row.updated_at) : ''}</td>\n              <td>{row.group_leader_signature || ''}</td>\n              <td>{row.approval_status === 'APPROVED' ? formatDateTime(row.updated_at) : ''}</td>");

  // Fix Delete button to say 'laser_changeover'
  laserReport = laserReport.replace("onDelete(row.id, 'changeover')", "onDelete(row.id, 'laser_changeover')");

  reports += '\n' + laserReport;
}

fs.writeFileSync('client/src/components/Reports.js', reports, 'utf8');

// Patch PendingModule.js
let pending = fs.readFileSync('client/src/components/PendingModule.js', 'utf8');

pending = pending.replace(
  "const [changeovers, setChangeovers] = useState([]);",
  "const [changeovers, setChangeovers] = useState([]);\n  const [laserChangeovers, setLaserChangeovers] = useState([]);"
);

pending = pending.replace(
  "const [checklistsRes, checkpointsRes, changeoverRes] = await Promise.all([\n          apiService.getPendingChecklists(),\n          apiService.getPendingCheckpoints(),\n          apiService.getPendingChangeoverChecksheets()\n        ]);",
  "const [checklistsRes, checkpointsRes, changeoverRes, laserRes] = await Promise.all([\n          apiService.getPendingChecklists(),\n          apiService.getPendingCheckpoints(),\n          apiService.getPendingChangeoverChecksheets(),\n          apiService.getPendingLaserChangeovers()\n        ]);"
);

pending = pending.replace(
  "setChangeovers(changeoverRes.data.data || []);",
  "setChangeovers(changeoverRes.data.data || []);\n        setLaserChangeovers(laserRes.data.data || []);"
);

// Active Tab
pending = pending.replace(
  /<button\s*className={`pending-tab-btn \$\{activeTab === 'changeover' \? 'active' : ''\}`}\s*onClick=\{.*?<\/button>/s,
  `$&
          <button 
            className={\`pending-tab-btn \${activeTab === 'laser_changeover' ? 'active' : ''}\`}
            onClick={() => setActiveTab('laser_changeover')}
          >
            ⚡ Laser Changeovers
            {laserChangeovers.length > 0 && <span className="tab-badge">{laserChangeovers.length}</span>}
          </button>`
);

// Review permissions
pending = pending.replace(
  "isEngineer ? (",
  "(isEngineer || (isGroupLeader && selectedItem?.type === 'laser_changeover')) ? ("
);

// Laser Table (Copy from changeover and adapt)
const coTableMatch = pending.match(/activeTab === 'changeover' \? \([\s\S]*?\)\n\s*\) : null/);
if (coTableMatch) {
  let laserTable = coTableMatch[0].replace(/changeovers\.map/g, "laserChangeovers.map");
  laserTable = laserTable.replace(/changeovers\.length/g, "laserChangeovers.length");
  laserTable = laserTable.replace(/activeTab === 'changeover'/g, "activeTab === 'laser_changeover'");
  laserTable = laserTable.replace(/'changeover'\)/g, "'laser_changeover')");
  
  laserTable = laserTable.replace("<th>{language === 'zh' ? '机型名称' : 'Model Name'}</th>", "<th>Program Name</th>");
  laserTable = laserTable.replace("<th>{language === 'zh' ? '机种代码' : 'Model Code'}</th>", "");
  
  laserTable = laserTable.replace("<td>{item.model_name}</td>", "<td>{item.program_name}</td>");
  laserTable = laserTable.replace("<td>{item.model_code}</td>", "");
  
  // Insert it BEFORE the null
  pending = pending.replace(") : null", ") : " + laserTable);
}

fs.writeFileSync('client/src/components/PendingModule.js', pending, 'utf8');
console.log('Patched correctly');
