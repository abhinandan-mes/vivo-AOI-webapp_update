import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './FunctionCheckpoint.css';
import { useLanguage } from '../contexts/LanguageContext';

const lineOptions = Array.from({ length: 25 }, (_, index) => String(401 + index));
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
    pre_aoi_spc_after: false
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shouldSubmit = window.confirm(t('cp_confirm_submit'));
    if (!shouldSubmit) return;

    const payload = {
      ...formData,
      submitted_by: currentUser ? `${currentUser.full_name} (${currentUser.username})` : ''
    };

    const isFormValid = formData.line && formData.group_name && formData.shift && formData.date;
    if (!isFormValid) return;

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
        time: ''
      });
    } catch (error) {
      setMessage('✗ ' + t('error') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.line && formData.group_name && formData.shift && formData.date;

  return (
    <div className="checkpoint-container">
      <div className="checkpoint-header">
        <h1>{t('cp_title')}</h1>
        <p>{t('cp_desc')}</p>
      </div>

      <form onSubmit={handleSubmit} className="checkpoint-form">
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
        </div>

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

        <div className="form-actions">
          <button type="submit" disabled={loading || !isFormValid} className="btn-submit">
            {loading ? t('cp_btn_submitting') : t('cp_btn_submit')}
          </button>
          {message && <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>{message}</div>}
        </div>
      </form>
    </div>
  );
}
