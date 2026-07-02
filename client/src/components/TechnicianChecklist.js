import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './TechnicianChecklist.css';
import { useLanguage } from '../contexts/LanguageContext';

const lineOptions = Array.from({ length: 25 }, (_, index) => String(401 + index));
const groupOptions = ['A', 'B', 'C'];
const yesNoOptions = ['Yes', 'No'];
const requiredFields = [
  'line',
  'group_name',
  'date',
  'shift',
  'pre_aoi_program_full_name',
  'stencil_serial_no_b_side',
  'stencil_serial_no_a_side',
  'barcode_read_a_layer',
  'barcode_read_a_spi',
  'barcode_read_a_pre_aoi',
  'barcode_read_b_layer',
  'barcode_read_b_spi',
  'barcode_read_b_pre_aoi',
  'workorder_info_pre_aoi',
  'workorder_info_post_aoi',
  'aoi_scan_tools_workorder_traceability',
  'confirmation',
  'submitted_by'
];

export default function TechnicianChecklist({ currentUser }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const defaultConfirmedBy = currentUser ? `${currentUser.full_name} (${currentUser.username})` : '';
  const [formData, setFormData] = useState({
    line: '',
    group_name: '',
    date: new Date().toISOString().split('T')[0],
    shift: '',
    pre_aoi_program_full_name: '',
    stencil_serial_no_b_side: '',
    stencil_serial_no_a_side: '',
    barcode_read_a_layer: '',
    barcode_read_a_spi: '',
    barcode_read_a_pre_aoi: '',
    barcode_read_b_layer: '',
    barcode_read_b_spi: '',
    barcode_read_b_pre_aoi: '',
    workorder_info_pre_aoi: '',
    workorder_info_post_aoi: '',
    aoi_scan_tools_workorder_traceability: '',
    confirmation: 'Yes',
    submitted_by: defaultConfirmedBy,
    status: 'Production'
  });

  React.useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        submitted_by: `${currentUser.full_name} (${currentUser.username})`
      }));
    }
  }, [currentUser]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isFormComplete = React.useMemo(() => {
    const basicFields = ['line', 'group_name', 'date', 'shift', 'submitted_by'];
    if (formData.status === 'Line Stop') {
      return basicFields.every(field => String(formData[field] || '').trim() !== '');
    }
    return requiredFields.every(field => String(formData[field] || '').trim() !== '');
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.status === 'Production' && formData.confirmation !== 'Yes') {
      setMessage(t('cl_msg_confirm_lock'));
      return;
    }
    setShowConfirmModal(true);
  };

  const executeSubmit = async () => {
    setShowConfirmModal(false);
    setLoading(true);
    try {
      await apiService.createChecklist(formData);
      setMessage(t('cl_msg_success'));
      setTimeout(() => {
        setMessage('');
        navigate('/reports');
      }, 1500);
      setFormData({
        line: '',
        group_name: '',
        date: new Date().toISOString().split('T')[0],
        shift: '',
        pre_aoi_program_full_name: '',
        stencil_serial_no_b_side: '',
        stencil_serial_no_a_side: '',
        barcode_read_a_layer: '',
        barcode_read_a_spi: '',
        barcode_read_a_pre_aoi: '',
        barcode_read_b_layer: '',
        barcode_read_b_spi: '',
        barcode_read_b_pre_aoi: '',
        workorder_info_pre_aoi: '',
        workorder_info_post_aoi: '',
        aoi_scan_tools_workorder_traceability: '',
        confirmation: 'Yes',
        submitted_by: currentUser ? `${currentUser.full_name} (${currentUser.username})` : '',
        status: 'Production'
      });
    } catch (error) {
      setMessage('✗ ' + t('error') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const isInspector = currentUser?.role === 'inspector';

  return (
    <div className="checklist-container">
      <div className="checklist-header">
        <h1>{t('cl_title')}</h1>
        <p>{t('cl_desc')}</p>
      </div>

      {isInspector && (
        <div className="readonly-banner" role="status">
          <span>⚠️</span>
          <span>
            {language === 'zh'
              ? '只读模式：检验员只能查看数据，无法填写或提交技术员检查表。'
              : 'Read-Only Mode: Inspectors can only view checksheet data and cannot fill or submit technician checklists.'}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="checklist-form">
        <fieldset disabled={isInspector} style={{ border: 'none', padding: 0, margin: 0, display: 'contents' }}>
          <div className="form-section">
            <h2>{language === 'zh' ? '班次信息' : 'Shift Information'}</h2>
          <div className="form-grid-4">
            <div className="form-group">
              <label htmlFor="line-select">{t('cp_line_req')}</label>
              <select
                id="line-select"
                name="line"
                value={formData.line}
                onChange={handleInputChange}
                required
              >
                <option value="">{t('cp_line_placeholder')}</option>
                {lineOptions.map(line => <option key={line} value={line}>{line}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="group-select">{t('cp_group_req')}</label>
              <select
                id="group-select"
                name="group_name"
                value={formData.group_name}
                onChange={handleInputChange}
                required
              >
                <option value="">{t('cp_group_placeholder')}</option>
                {groupOptions.map(group => <option key={group} value={group}>{group}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date-input">{t('cp_date_req')}</label>
              <input
                id="date-input"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="shift-select">{t('cp_shift_req')}</label>
              <select 
                id="shift-select" 
                name="shift" 
                value={formData.shift} 
                onChange={handleInputChange} 
                required
              >
                <option value="" disabled>{t('cp_shift_placeholder')}</option>
                <option value="Day">{t('day')}</option>
                <option value="Night">{t('night')}</option>
              </select>
            </div>
          </div>
          {formData.line && (
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.55rem', display: 'block' }}>
                {t('cl_line_status')}
              </label>
              <div className="status-segmented-control" style={{ display: 'inline-flex', background: '#f1f5f9', padding: '0.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  className={`toggle-btn ${formData.status === 'Production' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, status: 'Production' }))}
                  style={{ border: 'none', background: formData.status === 'Production' ? '#fff' : 'transparent', color: formData.status === 'Production' ? '#415fff' : '#64748b', padding: '0.55rem 1.25rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: formData.status === 'Production' ? '0 4px 10px rgba(15, 23, 42, 0.05)' : 'none' }}
                >
                  ⚙️ {t('cl_status_production')}
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${formData.status === 'Line Stop' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, status: 'Line Stop' }))}
                  style={{ border: 'none', background: formData.status === 'Line Stop' ? '#fff' : 'transparent', color: formData.status === 'Line Stop' ? '#ef4444' : '#64748b', padding: '0.55rem 1.25rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: formData.status === 'Line Stop' ? '0 4px 10px rgba(15, 23, 42, 0.05)' : 'none' }}
                >
                  🛑 {t('cl_status_linestop')}
                </button>
              </div>
            </div>
          )}
        </div>

        {formData.status === 'Production' ? (
          <>

        <div className="form-section">
          <h2>{language === 'zh' ? '程序与设置信息' : 'Program & Setup Information'}</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="program-input">{t('cl_pre_aoi_prog')} *</label>
              <input
                id="program-input"
                type="text"
                name="pre_aoi_program_full_name"
                value={formData.pre_aoi_program_full_name}
                onChange={handleInputChange}
                placeholder={t('cl_pre_aoi_prog_placeholder')}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>{language === 'zh' ? 'SPI 钢网信息' : 'SPI Stencil Information'}</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="stencil-b-input">{t('cl_stencil_b')} *</label>
              <input
                id="stencil-b-input"
                type="text"
                name="stencil_serial_no_b_side"
                value={formData.stencil_serial_no_b_side}
                onChange={handleInputChange}
                placeholder="e.g., SJ10079"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="stencil-a-input">{t('cl_stencil_a')} *</label>
              <input
                id="stencil-a-input"
                type="text"
                name="stencil_serial_no_a_side"
                value={formData.stencil_serial_no_a_side}
                onChange={handleInputChange}
                placeholder="e.g., SJ10079"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>{language === 'zh' ? '条码读取状态' : 'Barcode Read Information'}</h2>
          <div className="barcode-section">
            <div className="barcode-column">
              <h3>{language === 'zh' ? 'B面 (B Side)' : 'B Side'}</h3>
              <div className="form-grid-3">
                <div className="form-group">
                  <label htmlFor="barcode-read-a-layer">{t('cl_read_layer')}</label>
                  <select
                    id="barcode-read-a-layer"
                    name="barcode_read_a_layer"
                    value={formData.barcode_read_a_layer}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>{t('cl_read_placeholder')}</option>
                    {yesNoOptions.map(option => (
                      <option key={option} value={option}>{option === 'Yes' ? t('yes') : t('no')}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="barcode-read-a-spi">{t('cl_read_spi')}</label>
                  <select
                    id="barcode-read-a-spi"
                    name="barcode_read_a_spi"
                    value={formData.barcode_read_a_spi}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>{t('cl_read_placeholder')}</option>
                    {yesNoOptions.map(option => (
                      <option key={option} value={option}>{option === 'Yes' ? t('yes') : t('no')}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="barcode-read-a-pre-aoi">{t('cl_read_pre_aoi')}</label>
                  <select
                    id="barcode-read-a-pre-aoi"
                    name="barcode_read_a_pre_aoi"
                    value={formData.barcode_read_a_pre_aoi}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>{t('cl_read_placeholder')}</option>
                    {yesNoOptions.map(option => (
                      <option key={option} value={option}>{option === 'Yes' ? t('yes') : t('no')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="barcode-column">
              <h3>{language === 'zh' ? 'A面 (A Side)' : 'A Side'}</h3>
              <div className="form-grid-3">
                <div className="form-group">
                  <label htmlFor="barcode-read-b-layer">{t('cl_read_layer')}</label>
                  <select
                    id="barcode-read-b-layer"
                    name="barcode_read_b_layer"
                    value={formData.barcode_read_b_layer}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>{t('cl_read_placeholder')}</option>
                    {yesNoOptions.map(option => (
                      <option key={option} value={option}>{option === 'Yes' ? t('yes') : t('no')}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="barcode-read-b-spi">{t('cl_read_spi')}</label>
                  <select
                    id="barcode-read-b-spi"
                    name="barcode_read_b_spi"
                    value={formData.barcode_read_b_spi}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>{t('cl_read_placeholder')}</option>
                    {yesNoOptions.map(option => (
                      <option key={option} value={option}>{option === 'Yes' ? t('yes') : t('no')}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="barcode-read-b-pre-aoi">{t('cl_read_pre_aoi')}</label>
                  <select
                    id="barcode-read-b-pre-aoi"
                    name="barcode_read_b_pre_aoi"
                    value={formData.barcode_read_b_pre_aoi}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>{t('cl_read_placeholder')}</option>
                    {yesNoOptions.map(option => (
                      <option key={option} value={option}>{option === 'Yes' ? t('yes') : t('no')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>{t('cl_wo_info')}</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="wo-pre-input">{t('cl_wo_pre')}</label>
              <input
                id="wo-pre-input"
                type="text"
                name="workorder_info_pre_aoi"
                value={formData.workorder_info_pre_aoi}
                onChange={handleInputChange}
                placeholder={t('cl_wo_pre_placeholder')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="wo-post-input">{t('cl_wo_post')}</label>
              <input
                id="wo-post-input"
                type="text"
                name="workorder_info_post_aoi"
                value={formData.workorder_info_post_aoi}
                onChange={handleInputChange}
                placeholder={t('cl_wo_post_placeholder')}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>{t('cl_scan_tools')}</h2>
          <div className="form-group">
            <label htmlFor="traceability-textarea">{t('cl_traceability')}</label>
            <textarea
              id="traceability-textarea"
              name="aoi_scan_tools_workorder_traceability"
              value={formData.aoi_scan_tools_workorder_traceability}
              onChange={handleInputChange}
              placeholder={t('cl_traceability_placeholder')}
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <h2>{t('cl_confirmation')}</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="confirmation-select">{t('cl_confirm_correct')}</label>
              <select 
                id="confirmation-select"
                name="confirmation" 
                value={formData.confirmation} 
                onChange={handleInputChange} 
                required
              >
                <option value="Yes">{t('yes')}</option>
                <option value="No">{t('no')}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="submitted-by-input">{t('cl_submitted_by')}</label>
              <input
                id="submitted-by-input"
                type="text"
                name="submitted_by"
                value={formData.submitted_by}
                readOnly
                className="read-only-input"
                style={{ background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>
        </div>
          </>
        ) : (
          <div className="form-section linestop-info-section" style={{ textAlign: 'center', padding: '3rem 2rem', background: '#fff' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛑</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
              {language === 'zh' ? '线别处于停线状态' : 'Line is Stopped'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto' }}>
              {language === 'zh' 
                ? '当前线别处于停线模式下。您无需填写任何点检内容，可以直接提交点检表。' 
                : 'The selected line is currently in stopped status. No checksheet inputs are required, you may submit directly.'}
            </p>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading || !isFormComplete || (formData.status === 'Production' && formData.confirmation !== 'Yes')} className="btn-submit">
            {loading ? t('cl_btn_submitting') : t('cl_btn_submit')}
          </button>
          {message && <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>{message}</div>}
        </div>
        </fieldset>
      </form>

      {showConfirmModal && (
        <div className="global-modal-overlay">
          <div className="inactivity-modal submit-confirm-modal">
            <div className="confirm-modal-icon-wrapper">
              <div className={`confirm-modal-icon ${formData.status === 'Line Stop' ? 'linestop-icon' : ''}`}>
                {formData.status === 'Line Stop' ? '🛑' : '📄'}
              </div>
            </div>
            
            <div className="confirm-modal-header">
              <h2>{language === 'zh' ? '核对检查表信息' : 'Confirm Checklist Details'}</h2>
              <p>{language === 'zh' ? '请核对以下点检信息，确认无误后提交' : 'Please verify the following settings before final submission'}</p>
            </div>

            <div className="confirm-details-table">
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{t('line')}</span>
                <span className="confirm-detail-value">{formData.line}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{t('group')}</span>
                <span className="confirm-detail-value">{formData.group_name}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{t('date')}</span>
                <span className="confirm-detail-value">{formData.date}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{t('shift')}</span>
                <span className="confirm-detail-value">
                  {formData.shift === 'Day' ? t('day') : (formData.shift === 'Night' ? t('night') : '—')}
                </span>
              </div>
              <div className="confirm-detail-item" style={{ gridColumn: 'span 2' }}>
                <span className="confirm-detail-label">{t('cl_line_status')}</span>
                <span className={`confirm-detail-value ${formData.status === 'Line Stop' ? 'linestop' : 'production'}`}>
                  {formData.status === 'Line Stop' ? `🛑 ${t('cl_status_linestop')}` : `⚙️ ${t('cl_status_production')}`}
                </span>
              </div>
            </div>

            <div className="confirm-warning-box">
              ⚠️ {language === 'zh' 
                ? '确认提交后，此点检表将被锁定，无法再修改或编辑。' 
                : 'Warning: Once submitted, this checksheet is locked and cannot be edited.'}
            </div>

            <div className="confirm-modal-actions">
              <button 
                type="button" 
                className="confirm-btn-cancel" 
                onClick={() => setShowConfirmModal(false)}
              >
                {language === 'zh' ? '取消 / 返回核对' : 'Cancel & Edit'}
              </button>
              <button 
                type="button" 
                className={`confirm-btn-submit-active ${formData.status === 'Line Stop' ? 'linestop-theme' : ''}`}
                onClick={executeSubmit}
              >
                {language === 'zh' ? '确认提交' : 'Confirm Submission'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
