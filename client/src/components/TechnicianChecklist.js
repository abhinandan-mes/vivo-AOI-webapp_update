import React, { useState } from 'react';
import apiService from '../services/api';
import './TechnicianChecklist.css';

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
    submitted_by: defaultConfirmedBy
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
  const isFormComplete = requiredFields.every(field => String(formData[field] || '').trim() !== '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmation !== 'Yes') {
      setMessage('✗ You must confirm that all information is correct to submit.');
      return;
    }
    const shouldSubmit = window.confirm('Submit this Technician Checklist? Select Cancel to review your entries.');
    if (!shouldSubmit) return;

    setLoading(true);
    try {
      await apiService.createChecklist(formData);
      setMessage('✓ Daily Checklist Submitted Successfully');
      setTimeout(() => setMessage(''), 3000);
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
        submitted_by: currentUser ? `${currentUser.full_name} (${currentUser.username})` : ''
      });
    } catch (error) {
      setMessage('✗ Error submitting checklist: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checklist-container">
      <div className="checklist-header">
        <h1>AOI Technician Daily Checklist</h1>
        <p>Complete your daily AOI technician inspection checklist</p>
      </div>

      <form onSubmit={handleSubmit} className="checklist-form">
        <div className="form-section">
          <h2>Shift Information</h2>
          <div className="form-grid-4">
            <div className="form-group">
              <label>Line * </label>
              <select
                name="line"
                value={formData.line}
                onChange={handleInputChange}
                required
              >
                <option value="">Select line</option>
                {lineOptions.map(line => <option key={line} value={line}>{line}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Group *</label>
              <select
                name="group_name"
                value={formData.group_name}
                onChange={handleInputChange}
                required
              >
                <option value="">Select group</option>
                {groupOptions.map(group => <option key={group} value={group}>{group}</option>)}
              </select>
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
                <option value="" disabled>Select shift</option>
                <option>Day</option>
                <option>Night</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Program & Setup Information</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Pre-AOI Program Full Name *</label>
              <input
                type="text"
                name="pre_aoi_program_full_name"
                value={formData.pre_aoi_program_full_name}
                onChange={handleInputChange}
                placeholder="Enter program name"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>SPI Stencil Information</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Stencil Serial No. - B Side *</label>
              <input
                type="text"
                name="stencil_serial_no_b_side"
                value={formData.stencil_serial_no_b_side}
                onChange={handleInputChange}
                placeholder="e.g., SJ10079"
                required
              />
            </div>
            <div className="form-group">
              <label>Stencil Serial No. - A Side *</label>
              <input
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
          <h2>Barcode Read Information</h2>
          <div className="barcode-section">
            <div className="barcode-column">
              <h3>B Side</h3>
              <div className="form-grid-3">
                <div className="form-group">
                  <label>Read at Laser *</label>
                  <select
                    name="barcode_read_a_layer"
                    value={formData.barcode_read_a_layer}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select</option>
                    {yesNoOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Read at SPI *</label>
                  <select
                    name="barcode_read_a_spi"
                    value={formData.barcode_read_a_spi}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select</option>
                    {yesNoOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Read at Pre-AOI *</label>
                  <select
                    name="barcode_read_a_pre_aoi"
                    value={formData.barcode_read_a_pre_aoi}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select</option>
                    {yesNoOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="barcode-column">
              <h3>A Side</h3>
              <div className="form-grid-3">
                <div className="form-group">
                  <label>Read at Laser *</label>
                  <select
                    name="barcode_read_b_layer"
                    value={formData.barcode_read_b_layer}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select</option>
                    {yesNoOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Read at SPI *</label>
                  <select
                    name="barcode_read_b_spi"
                    value={formData.barcode_read_b_spi}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select</option>
                    {yesNoOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Read at Pre-AOI *</label>
                  <select
                    name="barcode_read_b_pre_aoi"
                    value={formData.barcode_read_b_pre_aoi}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select</option>
                    {yesNoOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Workorder Information</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Pre-AOI *</label>
              <input
                type="text"
                name="workorder_info_pre_aoi"
                value={formData.workorder_info_pre_aoi}
                onChange={handleInputChange}
                placeholder="Enter pre-AOI workorder info"
                required
              />
            </div>
            <div className="form-group">
              <label>Post-AOI *</label>
              <input
                type="text"
                name="workorder_info_post_aoi"
                value={formData.workorder_info_post_aoi}
                onChange={handleInputChange}
                placeholder="Enter post-AOI workorder info"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>AOI Scan Tools</h2>
          <div className="form-group">
            <label>Workorder Traceability *</label>
            <textarea
              name="aoi_scan_tools_workorder_traceability"
              value={formData.aoi_scan_tools_workorder_traceability}
              onChange={handleInputChange}
              placeholder="Enter AOI scan tools and workorder traceability information"
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <h2>Confirmation</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label>All Information Correct? *</label>
              <select name="confirmation" value={formData.confirmation} onChange={handleInputChange} required>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Submitted By</label>
              <input
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

        <div className="form-actions">
          <button type="submit" disabled={loading || !isFormComplete || formData.confirmation !== 'Yes'} className="btn-submit">
            {loading ? 'Submitting...' : 'Submit Checklist'}
          </button>
          {message && <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>{message}</div>}
        </div>
      </form>
    </div>
  );
}
