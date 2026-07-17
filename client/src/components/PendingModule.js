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
  const [changeovers, setChangeovers] = useState([]);
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
      const [resChecklists, resCheckpoints, resChangeovers, resEngs] = await Promise.all([
        apiService.getPendingChecklists(),
        apiService.getPendingCheckpoints(),
        apiService.getPendingChangeoverChecksheets(),
        apiService.getEngineers()
      ]);
      setChecklists(resChecklists.data.data || []);
      setCheckpoints(resCheckpoints.data.data || []);
      setChangeovers(resChangeovers.data.data || []);
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
      } else if (selectedItem.type === 'checkpoint') {
        await apiService.updateCheckpoint(selectedItem.id, payload);
      } else {
        await apiService.updateChangeoverChecksheet(selectedItem.id, payload);
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

  const changeoverGroups = [
    {
      groupTitle: language === 'zh' ? 'SPI 位置 (SPI Location)' : 'SPI Location',
      items: [
        { name: 'spi_steel_stencil_suffix_match', label: '1. Whether suffixed number of steel stencil of SPI program is corresponding to the currently used steel stencil and matches with production instruction or not.' },
        { name: 'spi_program_subpanel_serial_match', label: '2. Whether the program sub-panel serial number is consistent with the PCBA board number or not.' },
        { name: 'spi_recheck_pcab_polarity', label: '3. Whether recheck PCAB 180° polarity or not. (XP operation system PC use the edge of board fiducials, Window7 operation system use sub-panel fiducials and character of vendor board.)' },
        { name: 'spi_confirm_parameter_settings', label: '4. Whether confirm parameter settings of each component type are consistent with guidance file or not.' },
        { name: 'spi_read_barcode_on', label: '5. check top and bottom side of Parmi spi whether the function of reading barcode is on or not' }
      ]
    },
    {
      groupTitle: language === 'zh' ? '炉前AOI 位置 (Pre AOI Location)' : 'Pre AOI Location',
      items: [
        { name: 'pre_aoi_eco_checklists', label: '6. Whether confirm the contents of ECO checklists in the AOI program or not.' },
        { name: 'pre_aoi_program_model_modify', label: '7. Whether confirm program model of production instructions to modify or not.' },
        { name: 'pre_aoi_vi_program_new_materia', label: '8. When VI program has new materia, confirm whether software can run normally, related settings and options during testing normally or not.' },
        { name: 'pre_aoi_limit_defective_alarm', label: '9. Whether limit defective alarm of the AOI settings or not.' },
        { name: 'pre_aoi_test_program_bare_pcba', label: '10. Whether confirm the test program with a bare PCBA in Pre-AOI, focusing on the yellow covered materials, and pink non-standard materials or not.' },
        { name: 'pre_aoi_bot_program_serial_number', label: '11. Whether confirm the sub-panel of Bot program serial number, barcode is consistent with the bare PCBA serial number and move one sub-panel fiducial into edge of PCBA fiducial to prevent wrong 180°polarity or not.' },
        { name: 'pre_aoi_read_barcode_on', label: '12. check top and bottom side of pre aoi whether the function of reading barcode is on or not' },
        { name: 'pre_aoi_confirm_materials_mounted', label: '13a. Whether confirm materials including the TF card, SD, SIM card slot, earphone slot, battery connector, N board and metal cushions are mounted in front of Pre-AOI before changeover new program, whether confirm new part number is missing or skipped.' },
        { name: 'pre_aoi_delete_all_zones', label: '13b. Whether confirm to delete all zones first and then optimize testing zone again during changing over new program. whether confirm to focus on optimizing the damaged models of glass IC and JEDEC zone. whether confirm to optimize damaged models and solder extend models of the SD, SIM slot lead foot or not.' }
      ]
    },
    {
      groupTitle: language === 'zh' ? '炉后AOI 位置 (Post-AOI Location)' : 'Post-AOI Location',
      items: [
        { name: 'post_aoi_equipment_model', label: '14. Whether confirm the types of post AOI inspection equipment or not. (Fill in the model of the AOI equipment)', type: 'text' },
        { name: 'post_aoi_eco_checklists', label: '15. Whether confirm the contents of ECO checklists in the AOI program or not.' },
        { name: 'post_aoi_program_model_modify', label: '16. Whether confirm program model of production instructions to modify or not.' },
        { name: 'post_aoi_recheck_chips_standard_models', label: '17. Whether recheck chips, BTB connector, Filter, ANT, shield cover, RF connector and ANT connector standard models or not.' },
        { name: 'post_aoi_scan_board_picture', label: '18. Whether confirm to scan current board picture or not. blue frame(non-standard components), pink frame (protective components), cyan frame(skipped components)' },
        { name: 'post_aoi_limit_defective_alarm', label: '19. Whether limit defective alarm of the AOI settings or not.' },
        { name: 'post_aoi_confirm_polarity_shield', label: '20. Whether confirm requirements for the polarity of the symmetric shield cover in operation instruction or not.' },
        { name: 'post_aoi_bot_program_serial_number', label: '21. Whether confirm the sub-panel of Bot program serial number is consistent with the bare PCBA serial number and move one sub-panel fiducial into edge of PCBA fiducial to prevent wrong 180° polarity or not.' },
        { name: 'post_aoi_registered_standard_models_times', label: '22. Whether confirm registered standard models times is less than or equal to 70 by using ALD620, out of range to clear non-use models or not.' }
      ]
    },
    {
      groupTitle: language === 'zh' ? '其他 (Others)' : 'Others',
      items: [
        { name: 'others_adjust_widths', label: '23. Whether confirm to adjust widths of all equipment of the SPI, AOI, loader or not.' },
        { name: 'others_add_test_standard_pcb_barcode', label: '24. If model pcb has PCB barcode, must add test standard of reading barcode to track PCB barcode precisely' }
      ]
    }
  ];

  const resultOptions = ['√', '/', '\\', 'N/A'];

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
        <button 
          className={`pending-tab-btn ${activeTab === 'changeover' ? 'active' : ''}`}
          onClick={() => setActiveTab('changeover')}
        >
          ⇄ {language === 'zh' ? '换线记录表' : 'Changeover Checks'}
          {changeovers.length > 0 && <span className="tab-badge">{changeovers.length}</span>}
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
                            <button className="pending-action-btn view" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }} onClick={() => handleOpenReview(item, 'checklist')}>
                              👁️ {language === 'zh' ? '查看' : 'View'}
                            </button>
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
                            <button className="pending-action-btn view" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }} onClick={() => handleOpenReview(item, 'checkpoint')}>
                              👁️ {language === 'zh' ? '查看' : 'View'}
                            </button>
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
          ) : (
            changeovers.length === 0 ? (
              <div className="pending-empty-state">
                <span className="empty-icon">✓</span>
                <p>{language === 'zh' ? '暂无待处理换线记录表！' : 'No pending changeover checksheet records found!'}</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="pending-table">
                  <thead>
                    <tr>
                      <th>{t('date')}</th>
                      <th>{t('line')}</th>
                      <th>{t('shift')}</th>
                      <th>{language === 'zh' ? '机种名称' : 'Model Name'}</th>
                      <th>{language === 'zh' ? '提交人员' : 'Submitted By'}</th>
                      <th>{language === 'zh' ? '指定工程师' : 'Designated Engineer'}</th>
                      <th>{language === 'zh' ? '流程状态' : 'Approval Status'}</th>
                      <th>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {changeovers.map(item => (
                      <tr key={item.id}>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td><span className="line-tag">{item.line}</span></td>
                        <td>{item.shift}</td>
                        <td>{item.model_name}</td>
                        <td>{item.submitted_by}</td>
                        <td>{getEngineerDisplay(item.designated_engineer_id)}</td>
                        <td>
                          <span className={`status-pill ${item.approval_status}`}>
                            {item.approval_status === 'ENG_PENDING' ? (language === 'zh' ? '等待工程师审批' : 'Pending Engineer') : (language === 'zh' ? '工程师已驳回' : 'Rejected')}
                          </span>
                        </td>
                        <td>
                          {isEngineer ? (
                            <button className="pending-action-btn review" onClick={() => handleOpenReview(item, 'changeover')}>
                              🔍 {language === 'zh' ? '审核' : 'Review'}
                            </button>
                          ) : isAdmin ? (
                            <button className="pending-action-btn view" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }} onClick={() => handleOpenReview(item, 'changeover')}>
                              👁️ {language === 'zh' ? '查看' : 'View'}
                            </button>
                          ) : (
                            <button className="pending-action-btn edit" onClick={() => handleOpenReview(item, 'changeover')}>
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
                ) : (
                  /* Changeover Form Fields */
                  <div className="changeover-editor">
                    <div className="form-group-full">
                      <label>{language === 'zh' ? '机种名称' : 'Model Name'}</label>
                      <input type="text" name="model_name" value={reviewData.model_name || ''} onChange={handleInputChange} />
                    </div>
                    {changeoverGroups.map((group, gIndex) => (
                      <div key={gIndex} style={{ marginTop: '1.5rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
                        <h4 style={{ color: '#334155', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1rem' }}>{group.groupTitle}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {group.items.map((item, iIndex) => (
                            <div key={iIndex} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ flex: 1, paddingRight: '1rem', fontSize: '0.9rem', color: '#475569' }}>
                                {item.label}
                              </div>
                              <div style={{ width: '150px' }}>
                                {item.type === 'text' ? (
                                  <input 
                                    type="text" 
                                    name={item.name} 
                                    value={reviewData[item.name] || ''} 
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                  />
                                ) : (
                                  <select 
                                    name={item.name} 
                                    value={reviewData[item.name] || ''} 
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                  >
                                    {resultOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                  </select>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
                      disabled={isAdmin && !isEngineer}
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '0.8rem',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        outline: 'none',
                        background: (isAdmin && !isEngineer) ? '#f8fafc' : '#fff'
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
                
                {isEngineer ? (
                  <div className="engineer-action-buttons">
                    <button className="drawer-btn disapprove" onClick={() => handleApprovalAction('disapprove')}>
                      ❌ {language === 'zh' ? '驳回 (Disapprove)' : 'Disapprove'}
                    </button>
                    <button className="drawer-btn approve" onClick={() => handleApprovalAction('approve')}>
                      ✓ {language === 'zh' ? '批准 (Approve)' : 'Approve'}
                    </button>
                  </div>
                ) : isAdmin ? (
                  <div className="engineer-action-buttons">
                    <span style={{ color: '#94a3b8', fontStyle: 'italic', marginRight: '1rem', fontWeight: 600 }}>
                      {language === 'zh' ? '管理员仅供查看，无法审批' : 'Admins can view but cannot approve.'}
                    </span>
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
