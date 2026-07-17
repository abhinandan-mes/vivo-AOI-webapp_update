import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import ConfirmModal from './ConfirmModal';
import './PendingModule.css';

export default function PendingModule({ currentUser }) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'checkpoint'
  const [checklists, setChecklists] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [engineers, setEngineers] = useState([]);

  // Review Drawer state
  const [selectedItem, setSelectedItem] = useState(null); // checklist or checkpoint record
  const [reviewData, setReviewData] = useState({});
  const [engineerRemarks, setEngineerRemarks] = useState('');
  
  // Modals state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: () => {}
  });

  const isEngineer = currentUser?.role === 'engineer';
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';

  const getEngineerDisplay = (id) => {
    if (!id) return language === 'zh' ? '系统自动' : 'System (Automatic)';
    if (id === 'System (Automatic)') return language === 'zh' ? '系统自动' : 'System (Automatic)';
    const eng = engineers.find(e => e.username === id);
    return eng ? `${eng.full_name} (${eng.username})` : id;
  };

  // Fetch pending records & engineers list
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [resChecklists, resCheckpoints, resEngs] = await Promise.all([
        apiService.getPendingChecklists(),
        apiService.getPendingCheckpoints(),
        apiService.getEngineers()
      ]);
      setChecklists(resChecklists.data.data || []);
      setCheckpoints(resCheckpoints.data.data || []);
      setEngineers(resEngs.data.data || []);
    } catch (err) {
      console.error('Error fetching pending items:', err);
      setError(err.message || 'Failed to fetch pending items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenReview = (item, type) => {
    setSelectedItem({ ...item, type });
    setReviewData({ ...item });
    setEngineerRemarks(item.engineer_remarks || '');
  };

  const handleCloseReview = () => {
    setSelectedItem(null);
    setReviewData({});
    setEngineerRemarks('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleApprovalAction = (action) => {
    if (action === 'disapprove' && !engineerRemarks.trim()) {
      setConfirmModal({
        isOpen: true,
        title: language === 'zh' ? '输入备注' : 'Remarks Required',
        message: language === 'zh' 
          ? '请在驳回前输入工程师备注信息。' 
          : 'Please enter engineer remarks before disapproving.',
        type: 'warning',
        confirmText: 'OK',
        cancelText: t('cancel'),
        onConfirm: () => setConfirmModal(prev => ({ ...prev, isOpen: false }))
      });
      return;
    }

    const title = action === 'approve'
      ? (language === 'zh' ? '确认批准' : 'Confirm Approval')
      : (language === 'zh' ? '确认驳回' : 'Confirm Disapproval');

    const message = action === 'approve'
      ? (language === 'zh' ? '您确认要批准此检查表吗？' : 'Are you sure you want to approve this checksheet?')
      : (language === 'zh' ? '您确认要驳回此检查表至技术员端修改吗？' : 'Are you sure you want to disapprove this checksheet and send it back to the technician?');

    setConfirmModal({
      isOpen: true,
      title,
      message,
      type: action === 'approve' ? 'info' : 'danger',
      confirmText: action === 'approve' ? t('yes') : t('no'),
      cancelText: t('cancel'),
      onConfirm: () => submitReview(action)
    });
  };

  const submitReview = async (action) => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
    setLoading(true);
    try {
      const payload = {
        ...reviewData,
        action,
        engineer_remarks: engineerRemarks
      };

      if (selectedItem.type === 'checklist') {
        await apiService.updateChecklist(selectedItem.id, payload);
      } else {
        await apiService.updateCheckpoint(selectedItem.id, payload);
      }
      
      handleCloseReview();
      await fetchData();
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.message || 'Failed to submit review.');
      setLoading(false);
    }
  };

  const handleResubmit = () => {
    setConfirmModal({
      isOpen: true,
      title: language === 'zh' ? '确认重新提交' : 'Confirm Resubmission',
      message: language === 'zh' ? '您确认要重新提交此数据至工程师审核吗？' : 'Are you sure you want to resubmit this checksheet to the engineer?',
      type: 'info',
      confirmText: t('yes'),
      cancelText: t('cancel'),
      onConfirm: () => submitResubmit()
    });
  };

  const submitResubmit = async () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
    setLoading(true);
    try {
      if (selectedItem.type === 'checklist') {
        await apiService.updateChecklist(selectedItem.id, reviewData);
      } else {
        await apiService.updateCheckpoint(selectedItem.id, reviewData);
      }
      handleCloseReview();
      await fetchData();
    } catch (err) {
      console.error('Error resubmitting:', err);
      setError(err.message || 'Failed to resubmit checksheet.');
      setLoading(false);
    }
  };

  const checkpointGroups = [
    { label: 'Laser Barcode Detection', prefix: 'laser_barcode', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'Laser PCB Text Detection', prefix: 'laser_pcb_text', positions: ['before', 'after'] },
    { label: 'SPI Barcode Detection', prefix: 'spi_barcode', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'SPI MES Detection', prefix: 'spi_mes', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'Pre-AOI Barcode Detection', prefix: 'pre_aoi_barcode', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'Post-AOI Barcode Detection', prefix: 'post_aoi_barcode', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'SPI FOV', prefix: 'spi_fov', positions: ['before', 'after'] },
    { label: 'Pre-AOI FOV', prefix: 'pre_aoi_fov', positions: ['before', 'after'] },
    { label: 'Password Function at Pre-AOI', prefix: 'password_function_pre_aoi', positions: ['before', 'after'] },
    { label: 'Pre-AOI SPC', prefix: 'pre_aoi_spc', positions: ['before', 'after'] },
    { label: 'Post-AOI FOV', prefix: 'post_aoi_fov', positions: ['before', 'after'] }
  ];

  return (
    <div className="pending-container">
      <div className="pending-header-section">
        <h1>{language === 'zh' ? '待处理任务' : 'Pending Tasks'}</h1>
        <p>{language === 'zh' ? '查看及审批等待您处理的保养检查表或功能检测。' : 'Review and approve pending checklists or function checkpoints.'}</p>
      </div>

      {error && <div className="pending-error-banner">{error}</div>}

      <div className="pending-tabs">
        <button 
          className={`pending-tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('checklist')}
        >
          📄 {t('rep_toggle_checklist')}
          {checklists.length > 0 && <span className="tab-badge">{checklists.length}</span>}
        </button>
        <button 
          className={`pending-tab-btn ${activeTab === 'checkpoint' ? 'active' : ''}`}
          onClick={() => setActiveTab('checkpoint')}
        >
          ⚙️ {t('rep_toggle_checkpoint')}
          {checkpoints.length > 0 && <span className="tab-badge">{checkpoints.length}</span>}
        </button>
      </div>

      {loading ? (
        <div className="pending-loading-spinner">{t('loading')}</div>
      ) : (
        <div className="pending-list-section">
          {activeTab === 'checklist' ? (
            checklists.length === 0 ? (
              <div className="pending-empty-state">
                <span className="empty-icon">✓</span>
                <p>{language === 'zh' ? '暂无待处理检查表！' : 'No pending technician checklists found!'}</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="pending-table">
                  <thead>
                    <tr>
                      <th>{t('date')}</th>
                      <th>{t('line')}</th>
                      <th>{t('shift')}</th>
                      <th>{t('group')}</th>
                      <th>{language === 'zh' ? '提交人员' : 'Submitted By'}</th>
                      <th>{language === 'zh' ? '指定工程师' : 'Designated Engineer'}</th>
                      <th>{language === 'zh' ? '流程状态' : 'Approval Status'}</th>
                      <th>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checklists.map(item => (
                      <tr key={item.id}>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td><span className="line-tag">{item.line}</span></td>
                        <td>{item.shift}</td>
                        <td>{item.group_name}</td>
                        <td>{item.submitted_by}</td>
                        <td>{getEngineerDisplay(item.designated_engineer_id)}</td>
                        <td>
                          <span className={`status-pill ${item.approval_status}`}>
                            {item.approval_status === 'ENG_PENDING' ? (language === 'zh' ? '等待工程师审批' : 'Pending Engineer') : (language === 'zh' ? '工程师已驳回' : 'Rejected')}
                          </span>
                        </td>
                        <td>
                          {isEngineer ? (
                            <button className="pending-action-btn review" onClick={() => handleOpenReview(item, 'checklist')}>
                              🔍 {language === 'zh' ? '审核' : 'Review'}
                            </button>
                          ) : isAdmin ? (
                            <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.8rem' }}>{language === 'zh' ? '仅供查看' : 'View Only'}</span>
                          ) : (
                            <button className="pending-action-btn edit" onClick={() => handleOpenReview(item, 'checklist')}>
                              ✏️ {language === 'zh' ? '修改重提' : 'Edit & Resubmit'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            checkpoints.length === 0 ? (
              <div className="pending-empty-state">
                <span className="empty-icon">✓</span>
                <p>{language === 'zh' ? '暂无待处理功能检查表！' : 'No pending daily checksheet records found!'}</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="pending-table">
                  <thead>
                    <tr>
                      <th>{t('date')}</th>
                      <th>{t('line')}</th>
                      <th>{t('shift')}</th>
                      <th>{t('group')}</th>
                      <th>{language === 'zh' ? '提交人员' : 'Submitted By'}</th>
                      <th>{language === 'zh' ? '指定工程师' : 'Designated Engineer'}</th>
                      <th>{language === 'zh' ? '流程状态' : 'Approval Status'}</th>
                      <th>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkpoints.map(item => (
                      <tr key={item.id}>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td><span className="line-tag">{item.line}</span></td>
                        <td>{item.shift}</td>
                        <td>{item.group_name}</td>
                        <td>{item.submitted_by}</td>
                        <td>{getEngineerDisplay(item.designated_engineer_id)}</td>
                        <td>
                          <span className={`status-pill ${item.approval_status}`}>
                            {item.approval_status === 'ENG_PENDING' ? (language === 'zh' ? '等待工程师审批' : 'Pending Engineer') : (language === 'zh' ? '工程师已驳回' : 'Rejected')}
                          </span>
                        </td>
                        <td>
                          {isEngineer ? (
                            <button className="pending-action-btn review" onClick={() => handleOpenReview(item, 'checkpoint')}>
                              🔍 {language === 'zh' ? '审核' : 'Review'}
                            </button>
                          ) : isAdmin ? (
                            <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.8rem' }}>{language === 'zh' ? '仅供查看' : 'View Only'}</span>
                          ) : (
                            <button className="pending-action-btn edit" onClick={() => handleOpenReview(item, 'checkpoint')}>
                              ✏️ {language === 'zh' ? '修改重提' : 'Edit & Resubmit'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      )}

      {/* Review & Resubmit Drawer Overlay */}
      {selectedItem && (
        <div className="pending-drawer-overlay" onClick={handleCloseReview}>
          <div className="pending-drawer-content" onClick={e => e.stopPropagation()}>
            <div className="drawer-header" style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
              <div className="drawer-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                <h2>
                  {selectedItem.type === 'checklist' ? t('rep_toggle_checklist') : t('rep_toggle_checkpoint')} 
                  {language === 'zh' ? ' - 待办处理' : ' - Review Form'}
                </h2>
                <button className="close-drawer-btn" onClick={handleCloseReview}>✕</button>
              </div>
            </div>

            <div className="drawer-body" style={{ background: '#f8fafc', padding: '2rem 1rem' }}>
              <div className="drawer-body-card" style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(15,23,42,0.03)', boxSizing: 'border-box' }}>
              {selectedItem.approval_status === 'DISAPPROVED' && (
                <div className="disapproved-alert-banner">
                  <h4>⚠️ {language === 'zh' ? '工程师退回批注' : 'Engineer Rejection Remark'}:</h4>
                  <p>{selectedItem.engineer_remarks}</p>
                </div>
              )}

              {/* Basic Info Read-only */}
              <div className="drawer-basic-info-grid">
                <div><strong>{t('line')}:</strong> {reviewData.line}</div>
                <div><strong>{t('group')}:</strong> {reviewData.group_name}</div>
                <div><strong>{t('date')}:</strong> {new Date(reviewData.date).toLocaleDateString()}</div>
                <div><strong>{t('shift')}:</strong> {reviewData.shift}</div>
                <div><strong>{language === 'zh' ? '提交人员' : 'Submitted By'}:</strong> {reviewData.submitted_by}</div>
                <div>
                  <strong>{language === 'zh' ? '状态' : 'Status'}:</strong>{' '}
                  <select
                    name="status"
                    value={reviewData.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setReviewData(prev => ({
                        ...prev,
                        status: newStatus
                      }));
                    }}
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      background: '#fff',
                      cursor: 'pointer',
                      color: reviewData.status === 'Line Stop' ? '#ef4444' : '#10b981'
                    }}
                  >
                    <option value="Production">{language === 'zh' ? '已提交(生产)' : 'Production'}</option>
                    <option value="Line Stop">{language === 'zh' ? '已提交(停线)' : 'Line Stop'}</option>
                  </select>
                </div>
              </div>

              {/* Form Content Rendering */}
              <div className="drawer-form-contents-section">
                {reviewData.status === 'Line Stop' ? (
                  <div style={{
                    background: '#fffef2',
                    border: '1px solid #fef3c7',
                    borderRadius: '16px',
                    padding: '2.5rem 2rem',
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: '#b45309'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#92400e' }}>
                      {language === 'zh' ? '线别处于停线状态' : 'Line Status is Set to Line Stop'}
                    </h3>
                    <p style={{ fontSize: '0.9rem', margin: '0 0 1.5rem 0', color: '#b45309', opacity: 0.9 }}>
                      {language === 'zh' 
                        ? '此点检表当前以“停线”状态提交，已隐藏所有详细点检项。如果您需要将其变更为正常生产状态并编辑点检内容，请点击下方按钮。' 
                        : 'This checksheet is currently submitted under "Line Stop" status, and detailed check fields are hidden. If you need to change the status to Production and fill out the checksheet, click the button below.'}
                    </p>
                    <button 
                      type="button"
                      className="drawer-btn resubmit" 
                      style={{ background: '#d97706', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.2)' }}
                      onClick={() => setReviewData(prev => ({ ...prev, status: 'Production' }))}
                    >
                      🔄 {language === 'zh' ? '变更为正常生产状态' : 'Change Status to Production'}
                    </button>
                  </div>
                ) : (
                  selectedItem.type === 'checklist' ? (
                    /* Checklist Form Fields */
                    <div className="checklist-fields-editor">
                    <div className="form-group-full">
                      <label>{language === 'zh' ? 'Pre-AOI 完整程序名' : 'Pre-AOI Full Program Name'}</label>
                      <input 
                        type="text" 
                        name="pre_aoi_program_full_name"
                        value={reviewData.pre_aoi_program_full_name || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-half">
                      <label>{language === 'zh' ? '钢网编号 B面' : 'Stencil Serial No. B-Side'}</label>
                      <input 
                        type="text" 
                        name="stencil_serial_no_b_side"
                        value={reviewData.stencil_serial_no_b_side || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-half">
                      <label>{language === 'zh' ? '钢网编号 A面' : 'Stencil Serial No. A-Side'}</label>
                      <input 
                        type="text" 
                        name="stencil_serial_no_a_side"
                        value={reviewData.stencil_serial_no_a_side || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-third">
                      <label>Barcode Read A Laser</label>
                      <select name="barcode_read_a_layer" value={reviewData.barcode_read_a_layer || ''} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group-third">
                      <label>Barcode Read A SPI</label>
                      <select name="barcode_read_a_spi" value={reviewData.barcode_read_a_spi || ''} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group-third">
                      <label>Barcode Read A Pre-AOI</label>
                      <select name="barcode_read_a_pre_aoi" value={reviewData.barcode_read_a_pre_aoi || ''} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group-third">
                      <label>Barcode Read B Laser</label>
                      <select name="barcode_read_b_layer" value={reviewData.barcode_read_b_layer || ''} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group-third">
                      <label>Barcode Read B SPI</label>
                      <select name="barcode_read_b_spi" value={reviewData.barcode_read_b_spi || ''} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group-third">
                      <label>Barcode Read B Pre-AOI</label>
                      <select name="barcode_read_b_pre_aoi" value={reviewData.barcode_read_b_pre_aoi || ''} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group-half">
                      <label>Workorder Info Pre-AOI</label>
                      <input type="text" name="workorder_info_pre_aoi" value={reviewData.workorder_info_pre_aoi || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-group-half">
                      <label>Workorder Info Post-AOI</label>
                      <input type="text" name="workorder_info_post_aoi" value={reviewData.workorder_info_post_aoi || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-group-full">
                      <label>AOI Scan Tools Workorder Traceability</label>
                      <input type="text" name="aoi_scan_tools_workorder_traceability" value={reviewData.aoi_scan_tools_workorder_traceability || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-group-half">
                      <label>{language === 'zh' ? '确认签字 (Confirmation)' : 'Confirmation'}</label>
                      <select name="confirmation" value={reviewData.confirmation || ''} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="form-group-half">
                      <label>{language === 'zh' ? '指定工程师' : 'Designated Engineer'}</label>
                      <select name="designated_engineer_id" value={reviewData.designated_engineer_id || ''} onChange={handleInputChange}>
                        {engineers.map(eng => (
                          <option key={eng.username} value={eng.username}>{eng.full_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group-full">
                      <label>{language === 'zh' ? '技术员备注' : 'Technician Remarks'}</label>
                      <input type="text" name="remarks" value={reviewData.remarks || ''} onChange={handleInputChange} />
                    </div>
                  </div>
                ) : (
                  /* Checkpoints Form Fields */
                  <div className="checkpoint-checkboxes-editor">
                    <div className="checkpoint-editor-grid">
                      {checkpointGroups.map((group) => (
                        <div key={group.label} className="checkpoint-editor-card">
                          <h4>{group.label}</h4>
                          <div className="checkboxes-row">
                            {group.positions.map((pos) => {
                              const key = `${group.prefix}_${pos}`;
                              return (
                                <label key={key} className="checkpoint-editor-checkbox-label">
                                  <input
                                    type="checkbox"
                                    name={key}
                                    checked={!!reviewData[key]}
                                    onChange={handleInputChange}
                                  />
                                  <span>{pos.replace('_', ' ')}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="form-group-half" style={{ marginTop: '1rem' }}>
                      <label>{language === 'zh' ? '责任人' : 'Responsible Person'}</label>
                      <input type="text" name="responsible_person" value={reviewData.responsible_person || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-group-half" style={{ marginTop: '1rem' }}>
                      <label>{language === 'zh' ? '检测时间' : 'Check Time'}</label>
                      <input type="time" name="time" value={reviewData.time || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-group-full" style={{ marginTop: '1rem' }}>
                      <label>{language === 'zh' ? '指定工程师' : 'Designated Engineer'}</label>
                      <select name="designated_engineer_id" value={reviewData.designated_engineer_id || ''} onChange={handleInputChange}>
                        {engineers.map(eng => (
                          <option key={eng.username} value={eng.username}>{eng.full_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group-full" style={{ marginTop: '1rem' }}>
                      <label>{language === 'zh' ? '技术员备注' : 'Technician Remarks'}</label>
                      <input type="text" name="remarks" value={reviewData.remarks || ''} onChange={handleInputChange} />
                    </div>
                  </div>
                )
                )}
              </div>

              {/* Engineer Remarks Block */}
              {(isEngineer || isAdmin) && (
                <div className="engineer-remarks-section" style={{ marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                  <div className="form-group-full">
                    <label style={{ fontWeight: 700, color: '#0f172a' }}>
                      {language === 'zh' ? '工程师审批备注 *' : 'Engineer Approval/Disapproval Remarks *'}
                    </label>
                    <textarea
                      placeholder={language === 'zh' ? '在此处输入审批 or 驳回备注（驳回为必选项）...' : 'Enter approval or rejection remarks (mandatory for disapproval)...'}
                      value={engineerRemarks}
                      onChange={(e) => setEngineerRemarks(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '0.8rem',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              )}
              </div>
            </div>

            <div className="drawer-footer" style={{ background: '#fff', borderTop: '1px solid #e2e8f0' }}>
              <div className="drawer-footer-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                <button className="drawer-btn close" onClick={handleCloseReview}>
                  {t('cancel')}
                </button>
                
                {isEngineer || isAdmin ? (
                  <div className="engineer-action-buttons">
                    <button className="drawer-btn disapprove" onClick={() => handleApprovalAction('disapprove')}>
                      ❌ {language === 'zh' ? '驳回 (Disapprove)' : 'Disapprove'}
                    </button>
                    <button className="drawer-btn approve" onClick={() => handleApprovalAction('approve')}>
                      ✓ {language === 'zh' ? '批准 (Approve)' : 'Approve'}
                    </button>
                  </div>
                ) : (
                  <button className="drawer-btn resubmit" onClick={handleResubmit}>
                    🚀 {language === 'zh' ? '重新提交' : 'Resubmit Checksheet'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        type={confirmModal.type}
      />
    </div>
  );
}
