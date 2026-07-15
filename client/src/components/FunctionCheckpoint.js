import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './FunctionCheckpoint.css';
import { useLanguage } from '../contexts/LanguageContext';

// Fallback — all 25 lines if API fails
const ALL_LINE_OPTIONS = Array.from({ length: 25 }, (_, index) => String(401 + index));
const groupOptions = ['A', 'B', 'C'];

export default function FunctionCheckpoint({ currentUser }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    line: '',
    group_name: '',
    date: new Date().toISOString().split('T')[0],
    shift: '',
    responsible_person: '',
    time: '',
    laser_barcode_before_bot: false,
    laser_barcode_before_top: false,
    laser_barcode_after_bot: false,
    laser_barcode_after_top: false,
    laser_pcb_text_before: false,
    laser_pcb_text_after: false,
    spi_barcode_before_bot: false,
    spi_barcode_before_top: false,
    spi_barcode_after_bot: false,
    spi_barcode_after_top: false,
    spi_mes_before_bot: false,
    spi_mes_before_top: false,
    spi_mes_after_bot: false,
    spi_mes_after_top: false,
    pre_aoi_barcode_before_bot: false,
    pre_aoi_barcode_before_top: false,
    pre_aoi_barcode_after_bot: false,
    pre_aoi_barcode_after_top: false,
    post_aoi_barcode_before_bot: false,
    post_aoi_barcode_before_top: false,
    post_aoi_barcode_after_bot: false,
    post_aoi_barcode_after_top: false,
    password_function_pre_aoi_before: false,
    password_function_pre_aoi_after: false,
    spi_fov_before: false,
    spi_fov_after: false,
    pre_aoi_fov_before: false,
    pre_aoi_fov_after: false,
    post_aoi_fov_before: false,
    post_aoi_fov_after: false,
    pre_aoi_spc_before: false,
    pre_aoi_spc_after: false,
    status: 'Production'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [installedLines, setInstalledLines] = useState(ALL_LINE_OPTIONS);
  const [linesLoading, setLinesLoading] = useState(true);

  // Fetch installed lines from backend
  useEffect(() => {
    apiService.getInstalledLines()
      .then(res => {
        const data = res.data.data || [];
        setInstalledLines(data.length > 0 ? data : ALL_LINE_OPTIONS);
      })
      .catch(() => setInstalledLines(ALL_LINE_OPTIONS))
      .finally(() => setLinesLoading(false));
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = formData.line && formData.group_name && formData.shift && formData.date;
    if (!isFormValid) return;
    setShowConfirmModal(true);
  };

  const executeSubmit = async () => {
    setShowConfirmModal(false);

    const payload = {
      ...formData,
      submitted_by: currentUser ? `${currentUser.full_name} (${currentUser.username})` : '',
      status: formData.status
    };

    setLoading(true);
    try {
      await apiService.createCheckpoint(payload);
      setMessage(t('cp_msg_success'));
      setTimeout(() => {
        setMessage('');
        navigate('/reports');
      }, 1500);
      setFormData({
        ...formData,
        line: '',
        group_name: '',
        date: new Date().toISOString().split('T')[0],
        shift: '',
        responsible_person: '',
        time: '',
        status: 'Production'
      });
    } catch (error) {
      setMessage('✗ ' + t('error') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.line && formData.group_name && formData.shift && formData.date;

  const isInspector = currentUser?.role === 'inspector';

  return (
    <div className="checkpoint-container">
      <div className="checkpoint-header">
        <h1>{t('cp_title')}</h1>
        <p>{t('cp_desc')}</p>
      </div>

      {isInspector && (
        <div className="readonly-banner" role="status">
          <span>⚠️</span>
          <span>
            {currentUser?.language === 'zh'
              ? '只读模式：检验员只能查看数据，无法填写或提交每日功能检查。'
              : 'Read-Only Mode: Inspectors can only view checksheet data and cannot fill or submit daily function checks.'}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="checkpoint-form">
        <fieldset disabled={isInspector} style={{ border: 'none', padding: 0, margin: 0, display: 'contents' }}>
          <div className="form-section">
            <h2>{t('cp_basic_info')}</h2>
          <div className="form-grid-6">
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
                {linesLoading
                  ? <option disabled>Loading...</option>
                  : installedLines.map(line => <option key={line} value={line}>{line}</option>)
                }
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
            <div className="form-group">
              <label htmlFor="resp-person-input">{t('cp_resp_person')}</label>
              <input
                id="resp-person-input"
                type="text"
                name="responsible_person"
                value={formData.responsible_person}
                onChange={handleInputChange}
                placeholder={t('cp_resp_person_placeholder')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time-input">{t('cp_time')}</label>
              <input
                id="time-input"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
              />
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

        <div className="check-table-wrap">
          <table className="check-table">
            <thead>
              <tr>
                <th>{t('cp_th_function')}</th>
                <th>{t('cp_th_before_bot')}</th>
                <th>{t('cp_th_before_top')}</th>
                <th>{t('cp_th_after_bot')}</th>
                <th>{t('cp_th_after_top')}</th>
              </tr>
            </thead>
            <tbody>
              {checkpointGroups.filter(group => group.positions.length === 4).map(group => (
                <tr key={group.prefix}>
                  <th scope="row">{t('label_' + group.prefix)}</th>
                  {group.positions.map(position => {
                    const field = `${group.prefix}_${position}`;
                    return (
                      <td key={position}>
                        <label className="mini-check">
                          <input 
                            type="checkbox" 
                            name={field} 
                            checked={formData[field]} 
                            onChange={handleInputChange} 
                            aria-label={`${t('label_' + group.prefix)} - ${t('cp_th_' + position)}`}
                          />
                          <span aria-hidden="true"></span>
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <table className="check-table check-table-simple">
            <thead>
              <tr>
                <th>{t('cp_th_function')}</th>
                <th>{t('cp_th_before')}</th>
                <th>{t('cp_th_after')}</th>
              </tr>
            </thead>
            <tbody>
              {checkpointGroups.filter(group => group.positions.length === 2).map(group => (
                <tr key={group.prefix}>
                  <th scope="row">{t('label_' + group.prefix)}</th>
                  {group.positions.map(position => {
                    const field = `${group.prefix}_${position}`;
                    return (
                      <td key={position}>
                        <label className="mini-check">
                          <input 
                            type="checkbox" 
                            name={field} 
                            checked={formData[field]} 
                            onChange={handleInputChange} 
                            aria-label={`${t('label_' + group.prefix)} - ${t('cp_th_' + position)}`}
                          />
                          <span aria-hidden="true"></span>
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </>
        ) : (
          <div className="form-section linestop-info-section" style={{ textAlign: 'center', padding: '3rem 2rem', background: '#fff' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛑</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
              {t('cl_status_linestop') === '停线状态' ? '线别处于停线状态' : 'Line is Stopped'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto' }}>
              {t('cl_status_linestop') === '停线状态'
                ? '当前线别处于停线模式下。您无需填写任何点检内容，可以直接提交点检表。' 
                : 'The selected line is currently in stopped status. No checksheet inputs are required, you may submit directly.'}
            </p>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading || !isFormValid} className="btn-submit">
            {loading ? t('cp_btn_submitting') : t('cp_btn_submit')}
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
              <h2>{t('cl_status_linestop') === '停线状态' ? '核对点检表信息' : 'Confirm Checkpoint Details'}</h2>
              <p>{t('cl_status_linestop') === '停线状态' ? '请核对以下点检信息，确认无误后提交' : 'Please verify the following settings before final submission'}</p>
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
              ⚠️ {t('cl_status_linestop') === '停线状态' 
                ? '确认提交后，此点检表将被锁定，无法再修改或编辑。' 
                : 'Warning: Once submitted, this checksheet is locked and cannot be edited.'}
            </div>

            <div className="confirm-modal-actions">
              <button 
                type="button" 
                className="confirm-btn-cancel" 
                onClick={() => setShowConfirmModal(false)}
              >
                {t('cl_status_linestop') === '停线状态' ? '取消 / 返回核对' : 'Cancel & Edit'}
              </button>
              <button 
                type="button" 
                className={`confirm-btn-submit-active ${formData.status === 'Line Stop' ? 'linestop-theme' : ''}`}
                onClick={executeSubmit}
              >
                {t('cl_status_linestop') === '停线状态' ? '确认提交' : 'Confirm Submission'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
