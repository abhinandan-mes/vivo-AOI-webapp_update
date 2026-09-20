const fs = require('fs');
let txt = fs.readFileSync('client/src/components/Reports.js', 'utf8');

const oldReportStart = txt.indexOf('function LaserChangeoverReport(');
if (oldReportStart === -1) process.exit(1);

txt = txt.substring(0, oldReportStart);

const newComponent = \unction LaserChangeoverReport({ rows, laserChangeoverColumns, t, language, formatDate, formatDateTime, isSuperAdmin, onDelete, getEngineerDisplay, selectedRows, onSelectRow, onSelectAll }) {
  const [expandedRow, setExpandedRow] = React.useState(null);
  
  const toggleRow = id => {
    setExpandedRow(prev => prev === id ? null : id);
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
              checked={selectedRows.length === rows.length && rows.length > 0}
              aria-label="Select all"
            />
          </th>
          {laserChangeoverColumns.map(([label]) => <th key={label}>{label}</th>)}
          {isSuperAdmin && <th style={{ width: '60px', textAlign: 'center' }}>{t('actions')}</th>}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={isSuperAdmin ? laserChangeoverColumns.length + 2 : laserChangeoverColumns.length + 1} className="no-data-cell" style={{ textAlign: 'center', padding: '2rem' }}>
              {t('rep_no_data')}
            </td>
          </tr>
        ) : (
          rows.map(row => {
            const isExpanded = expandedRow === row.id;
            const totalColSpan = laserChangeoverColumns.length + (isSuperAdmin ? 2 : 1);

            const renderCheckBadge = (value, fieldName) => {
              const isOk = value === true || value === 'true';
              return (
                <span className={\\\status-badge-inline \\\\\\} title={fieldName}>
                  {isOk ? '√' : '\\\\'}
                </span>
              );
            };

            const mainRow = (
              <tr key={row.id} className={isExpanded ? 'expanded' : ''} onClick={(e) => {
                if (e.target.type === 'checkbox') return;
                toggleRow(row.id);
              }}>
                <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    className="row-checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => onSelectRow(row.id)}
                  />
                </td>
                <td style={{ fontWeight: 600 }}>{formatDate(row.date)}</td>
                <td><span className="line-tag">{row.line || '—'}</span></td>
                <td><span className="shift-tag">{row.group_name || '—'}</span></td>
                <td>{row.shift === 'Day' ? t('day') : (row.shift === 'Night' ? t('night') : row.shift)}</td>
                <td>
                  {(() => {
                    if (row.status === 'Not Filled') {
                      return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                        {language === 'zh' ? '未提交' : 'Not Filled'}
                      </span>;
                    }
                    if (row.approval_status === 'ENG_PENDING') {
                      return <span className="status-mark" style={{ minWidth: '95px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontWeight: 700 }}>
                        ⏳ {language === 'zh' ? '待审核' : 'Review'}
                      </span>;
                    }
                    if (row.approval_status === 'GRP_LDR_PENDING') {
                      return <span className="status-mark" style={{ minWidth: '95px', background: '#e0e7ff', color: '#4338ca', border: '1px solid #c7d2fe', fontWeight: 700 }}>
                        ⏳ {language === 'zh' ? '组长待审' : 'GL Review'}
                      </span>;
                    }
                    if (row.approval_status === 'DISAPPROVED' || row.approval_status === 'REJECTED') {
                      return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                        ❌ {language === 'zh' ? '已驳回' : 'Rejected'}
                      </span>;
                    }
                    return <span className="status-mark checked" style={{ minWidth: '95px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
                      ✅ {language === 'zh' ? '已通过' : 'Approved'}
                    </span>;
                  })()}
                </td>
                <td>{row.program_name || '—'}</td>
                <td>{getEngineerDisplay(row.designated_engineer_id)}</td>
                <td>{formatDateTime(row.created_at)}</td>
                <td>{row.submitted_by || '—'}</td>
                
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
            );

            const detailRow = (
              <tr key={\\\\\\-details\\\} className="expanded-row-details">
                <td colSpan={totalColSpan} style={{ background: '#f8fafc', padding: '2rem', borderBottom: '1px solid #e2e8f0', boxShadow: 'inset 0 4px 6px -4px rgba(0,0,0,0.05)' }}>
                  <div className="expansion-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'left', background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
                    <div>
                      <strong style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                        {language === 'zh' ? '技术员备注' : 'Technician Remarks'}
                      </strong>
                      <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                        {row.remarks || '—'}
                      </span>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                        {language === 'zh' ? '工程师审核备注' : 'Engineer Remarks'}
                      </strong>
                      <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                        {row.engineer_remarks || '—'}
                      </span>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                        {language === 'zh' ? '组长签字' : 'Group Leader Signature'}
                      </strong>
                      <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                        {row.group_leader_signature || '—'}
                      </span>
                    </div>
                    
                    <div style={{ gridColumn: 'span 3', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                      <strong style={{ display: 'block', color: '#0f172a', fontSize: '0.9rem', marginBottom: '1.25rem', fontWeight: 700 }}>
                        {language === 'zh' ? '📋 镭雕换线检查项目' : '📋 Laser Changeover Check Items'}
                      </strong>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                        {[
                          [language === 'zh' ? '1. 程序名称' : '1. Prog Name', 'prog_name_check'],
                          [language === 'zh' ? '2. 镭雕参数' : '2. Laser Param', 'laser_param_check'],
                          [language === 'zh' ? '3. 重码功能' : '3. Dup Code', 'duplicate_code_check'],
                          [language === 'zh' ? '4. PCB防反' : '4. Anti-Reverse', 'pcb_anti_reverse_check'],
                          [language === 'zh' ? '5. AB条码一致' : '5. A/B Barcode', 'ab_barcode_check'],
                          [language === 'zh' ? '6. 镭雕顺序' : '6. Sequence', 'laser_sequence_check'],
                          [language === 'zh' ? '7. 镭雕位置' : '7. Position', 'laser_position_check']
                        ].map(([label, key]) => (
                          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}>{label}</span>
                            {renderCheckBadge(row[key], label)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );

            return isExpanded ? [mainRow, detailRow] : mainRow;
          })
        )}
      </tbody>
    </table>
  );
}
\;

txt += newComponent;
fs.writeFileSync('client/src/components/Reports.js', txt, 'utf8');
