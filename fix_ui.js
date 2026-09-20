const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

// We will find the function LaserChangeoverReport and completely replace it
const startIndex = content.indexOf('function LaserChangeoverReport');
if (startIndex === -1) {
  console.log("NOT FOUND");
  process.exit(1);
}

const replacement = `function LaserChangeoverReport({ rows, t, language, formatDate, formatDateTime, isSuperAdmin, onDelete, getEngineerDisplay, selectedRows, onSelectRow, onSelectAll }) {
  const allSelected = rows.length > 0 && selectedRows.length === rows.length;
  
  const renderBool = (val) => {
    if (val === true || val === 'true') return <span className="status-badge-inline ok" title="Passed">✔️</span>;
    if (val === false || val === 'false') return <span className="status-badge-inline fail" title="Failed">❌</span>;
    return <span style={{ color: '#9ca3af' }}>—</span>;
  };

  return (
    <table className="report-table" style={{ minWidth: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '40px', textAlign: 'center' }}>
            <input 
              type="checkbox" 
              className="row-checkbox"
              onChange={(e) => onSelectAll(e.target.checked, rows)}
              checked={allSelected}
              aria-label="Select all"
            />
          </th>
          <th>{language === 'zh' ? '日期' : 'Date'}</th>
          <th>{language === 'zh' ? '线体' : 'Line'}</th>
          <th>{language === 'zh' ? '班组' : 'Group'}</th>
          <th>{language === 'zh' ? '班别' : 'Shift'}</th>
          <th>{language === 'zh' ? '状态' : 'Status'}</th>
          <th>{language === 'zh' ? '程序名称' : 'Program Name'}</th>
          
          <th>{language === 'zh' ? '1. 程序名称' : '1. Prog Name'}</th>
          <th>{language === 'zh' ? '2. 镭雕参数' : '2. Laser Param'}</th>
          <th>{language === 'zh' ? '3. 重码功能' : '3. Dup Code'}</th>
          <th>{language === 'zh' ? '4. PCB防反' : '4. Anti-Reverse'}</th>
          <th>{language === 'zh' ? '5. AB条码一致' : '5. A/B Barcode'}</th>
          <th>{language === 'zh' ? '6. 镭雕顺序' : '6. Sequence'}</th>
          <th>{language === 'zh' ? '7. 镭雕位置' : '7. Position'}</th>

          <th>{language === 'zh' ? '提交人' : 'Submitted By'}</th>
          <th>{language === 'zh' ? '工程师' : 'Engineer'}</th>
          <th>{language === 'zh' ? '工程师审核' : 'ENG Review Time'}</th>
          <th>{language === 'zh' ? '组长审批' : 'GL Approval'}</th>
          <th>{language === 'zh' ? '组长审批时间' : 'GL Review Time'}</th>
          
          {isSuperAdmin && <th style={{ width: '60px', textAlign: 'center' }}>{t('actions')}</th>}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={isSuperAdmin ? 20 : 19} className="no-data-cell" style={{ textAlign: 'center', padding: '2rem' }}>
              {t('rep_no_data')}
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id}>
              <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  className="row-checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={(e) => onSelectRow(row.id, e.target.checked)}
                />
              </td>
              <td style={{ fontWeight: 600 }}>{formatDate(row.date)}</td>
              <td><span className="line-tag">{row.line || '—'}</span></td>
              <td><span className="shift-tag">{row.group_name || '—'}</span></td>
              <td>{row.shift === 'Day' ? t('day') : (row.shift === 'Night' ? t('night') : row.shift)}</td>
              <td>
                {(() => {
                  if (row.approval_status === 'ENG_PENDING') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontWeight: 700 }}>⏳ {language === 'zh' ? '待审核' : 'Review'}</span>;
                  }
                  if (row.approval_status === 'GRP_LDR_PENDING') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#e0e7ff', color: '#4338ca', border: '1px solid #c7d2fe', fontWeight: 700 }}>⏳ {language === 'zh' ? '组长待审' : 'GL Review'}</span>;
                  }
                  if (row.approval_status === 'DISAPPROVED' || row.approval_status === 'REJECTED') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>❌ {language === 'zh' ? '已驳回' : 'Rejected'}</span>;
                  }
                  return <span className="status-mark checked" style={{ minWidth: '95px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>✅ {language === 'zh' ? '已通过' : 'Approved'}</span>;
                })()}
              </td>
              <td>{row.program_name || '—'}</td>
              
              <td style={{ textAlign: 'center' }}>{renderBool(row.prog_name_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.laser_param_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.duplicate_code_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.pcb_anti_reverse_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.ab_barcode_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.laser_sequence_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.laser_position_check)}</td>

              <td>{row.submitted_by || '—'}</td>
              <td>{getEngineerDisplay(row.designated_engineer_id)}</td>
              <td>{row.approval_status !== 'ENG_PENDING' ? formatDateTime(row.updated_at) : '—'}</td>
              <td>{row.group_leader_signature || '—'}</td>
              <td>{row.approval_status === 'APPROVED' ? formatDateTime(row.updated_at) : '—'}</td>

              {isSuperAdmin && (
                <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                  <button 
                    type="button"
                    className="btn-delete-report-row" 
                    onClick={() => onDelete(row.id, 'laser_changeover')}
                    title={language === 'zh' ? '删除记录' : 'Delete Record'}
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}`;

content = content.substring(0, startIndex) + replacement;
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed UI');
