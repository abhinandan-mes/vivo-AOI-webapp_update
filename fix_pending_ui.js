const fs = require('fs');
const file = 'client/src/components/PendingModule.js';
let content = fs.readFileSync(file, 'utf8');

const targetTable = content.match(/<table className="reports-table">[\s\S]*?<\/table>/)[0];

const newTable = `<table className="pending-table">
                    <thead>
                      <tr>
                        <th>{language === 'zh' ? '日期' : 'Date'}</th>
                        <th>{language === 'zh' ? '线体' : 'Line'}</th>
                        <th>{language === 'zh' ? '班组' : 'Group'}</th>
                        <th>{language === 'zh' ? '班别' : 'Shift'}</th>
                        <th>{language === 'zh' ? '程序名称' : 'Program Name'}</th>
                        <th>{language === 'zh' ? '提交人' : 'Submitted By'}</th>
                        <th>{language === 'zh' ? '审批状态' : 'Approval Status'}</th>
                        <th>{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {laserChangeovers.map((item) => (
                        <tr key={item.id}>
                          <td>{formatDate(item.date)}</td>
                          <td><span className="line-tag">{item.line}</span></td>
                          <td><span className="shift-tag">{item.group_name}</span></td>
                          <td>{item.shift === 'Day' ? t('day') : (item.shift === 'Night' ? t('night') : item.shift)}</td>
                          <td>{item.program_name}</td>
                          <td>{item.submitted_by}</td>
                          <td>
                            {(() => {
                              if (item.approval_status === 'ENG_PENDING') {
                                return <span className="status-mark" style={{ minWidth: '95px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontWeight: 700 }}>
                                  ⏳ {language === 'zh' ? '待审核' : 'Review'}
                                </span>;
                              }
                              if (item.approval_status === 'GRP_LDR_PENDING') {
                                return <span className="status-mark" style={{ minWidth: '95px', background: '#e0e7ff', color: '#4338ca', border: '1px solid #c7d2fe', fontWeight: 700 }}>
                                  ⏳ {language === 'zh' ? '组长待审' : 'GL Review'}
                                </span>;
                              }
                              if (item.approval_status === 'DISAPPROVED' || item.approval_status === 'REJECTED') {
                                return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                                  ❌ {language === 'zh' ? '已驳回' : 'Rejected'}
                                </span>;
                              }
                              return <span className="status-mark checked" style={{ minWidth: '95px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
                                ✅ {language === 'zh' ? '已通过' : 'Approved'}
                              </span>;
                            })()}
                          </td>
                          <td>
                            {(isEngineer || isGroupLeader) ? (
                              <button className="pending-action-btn review" onClick={() => handleOpenReview(item, 'laser_changeover')}>
                                🔍 {language === 'zh' ? '审核' : 'Review'}
                              </button>
                            ) : isAdmin ? (
                              <button className="pending-action-btn view" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }} onClick={() => handleOpenReview(item, 'laser_changeover')}>
                                👁️ {language === 'zh' ? '查看' : 'View'}
                              </button>
                            ) : (
                              <button className="pending-action-btn edit" onClick={() => handleOpenReview(item, 'laser_changeover')}>
                                ✍️ {language === 'zh' ? '修改提交' : 'Edit & Resubmit'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>`;

content = content.replace(targetTable, newTable);
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed Laser Changeover Pending Table UI');
