import React, { useState } from 'react';
import apiService from '../services/api';
import './FunctionCheckpoint.css';

export default function FunctionCheckpoint() {
  const [formData, setFormData] = useState({
    line: '',
    group_name: '',
    date: new Date().toISOString().split('T')[0],
    shift: 'Day',
    responsible_person: '',
    time: '',
    laser_barcode_before_bot: false,
    laser_barcode_before_top: false,
    laser_barcode_after_bot: false,
    laser_barcode_after_top: false,
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
    password_function_pre_aoi_before_bot: false,
    password_function_pre_aoi_before_top: false,
    password_function_pre_aoi_after_bot: false,
    password_function_pre_aoi_after_top: false,
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
    { label: 'SPI Barcode Detection', prefix: 'spi_barcode', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'SPI MES Detection', prefix: 'spi_mes', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'Pre-AOI Barcode Detection', prefix: 'pre_aoi_barcode', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'Post-AOI Barcode Detection', prefix: 'post_aoi_barcode', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'Password Function at Pre-AOI', prefix: 'password_function_pre_aoi', positions: ['before_bot', 'before_top', 'after_bot', 'after_top'] },
    { label: 'SPI FOV', prefix: 'spi_fov', positions: ['before', 'after'] },
    { label: 'Pre-AOI FOV', prefix: 'pre_aoi_fov', positions: ['before', 'after'] },
    { label: 'Post-AOI FOV', prefix: 'post_aoi_fov', positions: ['before', 'after'] },
    { label: 'Pre-AOI SPC', prefix: 'pre_aoi_spc', positions: ['before', 'after'] }
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
    setLoading(true);
    try {
      await apiService.createCheckpoint(formData);
      setMessage('✓ Checkpoint created successfully!');
      setTimeout(() => setMessage(''), 3000);
      setFormData({
        ...formData,
        line: '',
        group_name: '',
        date: new Date().toISOString().split('T')[0],
        responsible_person: '',
        time: ''
      });
    } catch (error) {
      setMessage('✗ Error creating checkpoint: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkpoint-container">
      <div className="checkpoint-header">
        <h1>AOI Daily Function Checkpoint</h1>
        <p>Enable/Disable equipment function checks</p>
      </div>

      <form onSubmit={handleSubmit} className="checkpoint-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid-6">
            <div className="form-group">
              <label>Line *</label>
              <input type="text" name="line" value={formData.line} onChange={handleInputChange} placeholder="e.g., 401" required />
            </div>
            <div className="form-group">
              <label>Group *</label>
              <input type="text" name="group_name" value={formData.group_name} onChange={handleInputChange} placeholder="e.g., Group A" required />
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Shift *</label>
              <select name="shift" value={formData.shift} onChange={handleInputChange} required>
                <option>Day</option>
                <option>Night</option>
                <option>Evening</option>
              </select>
            </div>
            <div className="form-group">
              <label>Responsible Person</label>
              <input
                type="text"
                name="responsible_person"
                value={formData.responsible_person}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
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
            <thead><tr><th>Function</th><th>Before · Bottom</th><th>Before · Top</th><th>After · Bottom</th><th>After · Top</th></tr></thead>
            <tbody>
              {checkpointGroups.filter(group => group.positions.length === 4).map(group => (
                <tr key={group.prefix}>
                  <th scope="row">{group.label}</th>
                  {group.positions.map(position => {
                    const field = `${group.prefix}_${position}`;
                    return <td key={position}><label className="mini-check"><input type="checkbox" name={field} checked={formData[field]} onChange={handleInputChange} /><span aria-hidden="true"></span></label></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <table className="check-table check-table-simple">
            <thead><tr><th>Function</th><th>Before</th><th>After</th></tr></thead>
            <tbody>
              {checkpointGroups.filter(group => group.positions.length === 2).map(group => (
                <tr key={group.prefix}>
                  <th scope="row">{group.label}</th>
                  {group.positions.map(position => {
                    const field = `${group.prefix}_${position}`;
                    return <td key={position}><label className="mini-check"><input type="checkbox" name={field} checked={formData[field]} onChange={handleInputChange} /><span aria-hidden="true"></span></label></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Submitting...' : 'Submit Checkpoint'}
          </button>
          {message && <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>{message}</div>}
        </div>
      </form>
    </div>
  );
}
