import React, { useState } from 'react';
import apiService from '../services/api';
import './TechnicianChecklist.css';

export default function TechnicianChecklist() {
  const [formData, setFormData] = useState({
    line: '',
    group_name: '',
    date: new Date().toISOString().split('T')[0],
    shift: 'Day',
    pre_aoi_program_full_name: '',
    stencil_serial_no: '',
    barcode_read_a_layer: '',
    barcode_read_a_spi: '',
    barcode_read_b_layer: '',
    barcode_read_b_spi: '',
    workorder_info_pre_aoi: '',
    workorder_info_post_aoi: '',
    aoi_scan_tools_workorder_traceability: '',
    confirmation: 'Yes'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.createChecklist(formData);
      setMessage('✓ Checklist submitted successfully!');
      setTimeout(() => setMessage(''), 3000);
      setFormData({
        line: '',
        group_name: '',
        date: new Date().toISOString().split('T')[0],
        shift: 'Day',
        pre_aoi_program_full_name: '',
        stencil_serial_no: '',
        barcode_read_a_layer: '',
        barcode_read_a_spi: '',
        barcode_read_b_layer: '',
        barcode_read_b_spi: '',
        workorder_info_pre_aoi: '',
        workorder_info_post_aoi: '',
        aoi_scan_tools_workorder_traceability: '',
        confirmation: 'Yes'
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
              <input
                type="text"
                name="line"
                value={formData.line}
                onChange={handleInputChange}
                placeholder="e.g., 401, 402"
                required
              />
            </div>
            <div className="form-group">
              <label>Group *</label>
              <input
                type="text"
                name="group_name"
                value={formData.group_name}
                onChange={handleInputChange}
                placeholder="e.g., Group A"
                required
              />
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
          </div>
        </div>

        <div className="form-section">
          <h2>Program & Setup Information</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Pre-AOI Program Full Name</label>
              <input
                type="text"
                name="pre_aoi_program_full_name"
                value={formData.pre_aoi_program_full_name}
                onChange={handleInputChange}
                placeholder="Enter program name"
              />
            </div>
            <div className="form-group">
              <label>Stencil Serial No.</label>
              <input
                type="text"
                name="stencil_serial_no"
                value={formData.stencil_serial_no}
                onChange={handleInputChange}
                placeholder="e.g., SJ234SJ12345"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Barcode Read Information</h2>
          <div className="barcode-section">
            <div className="barcode-column">
              <h3>Layer A</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Read at Layer</label>
                  <input
                    type="text"
                    name="barcode_read_a_layer"
                    value={formData.barcode_read_a_layer}
                    onChange={handleInputChange}
                    placeholder="e.g., A, B"
                  />
                </div>
                <div className="form-group">
                  <label>Read at SPI</label>
                  <input
                    type="text"
                    name="barcode_read_a_spi"
                    value={formData.barcode_read_a_spi}
                    onChange={handleInputChange}
                    placeholder="e.g., SJ3160"
                  />
                </div>
              </div>
            </div>
            <div className="barcode-column">
              <h3>Layer B</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Read at Layer</label>
                  <input
                    type="text"
                    name="barcode_read_b_layer"
                    value={formData.barcode_read_b_layer}
                    onChange={handleInputChange}
                    placeholder="e.g., A, B"
                  />
                </div>
                <div className="form-group">
                  <label>Read at SPI</label>
                  <input
                    type="text"
                    name="barcode_read_b_spi"
                    value={formData.barcode_read_b_spi}
                    onChange={handleInputChange}
                    placeholder="e.g., SJ3160"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Workorder Information</h2>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Pre-AOI</label>
              <input
                type="text"
                name="workorder_info_pre_aoi"
                value={formData.workorder_info_pre_aoi}
                onChange={handleInputChange}
                placeholder="Enter pre-AOI workorder info"
              />
            </div>
            <div className="form-group">
              <label>Post-AOI</label>
              <input
                type="text"
                name="workorder_info_post_aoi"
                value={formData.workorder_info_post_aoi}
                onChange={handleInputChange}
                placeholder="Enter post-AOI workorder info"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>AOI Scan Tools</h2>
          <div className="form-group">
            <label>Workorder Traceability</label>
            <textarea
              name="aoi_scan_tools_workorder_traceability"
              value={formData.aoi_scan_tools_workorder_traceability}
              onChange={handleInputChange}
              placeholder="Enter AOI scan tools and workorder traceability information"
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <h2>Confirmation</h2>
          <div className="form-group">
            <label>All Information Correct? *</label>
            <select name="confirmation" value={formData.confirmation} onChange={handleInputChange} required>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Submitting...' : 'Submit Checklist'}
          </button>
          {message && <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>{message}</div>}
        </div>
      </form>
    </div>
  );
}
