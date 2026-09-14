import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import apiService from '../services/api';
import './TechnicianChecklist.css';

const LaserChangeoverChecksheet = ({ currentUser }) => {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    line: '',
    program_name: '',
    date: new Date().toISOString().split('T')[0],
    shift: 'Day',
    prog_name_check: false,
    laser_param_check: false,
    duplicate_code_check: false,
    pcb_anti_reverse_check: false,
    ab_barcode_check: false,
    laser_sequence_check: false,
    laser_position_check: false,
  });

  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchLines();
  }, []);

  const fetchLines = async () => {
    try {
      const res = await apiService.getInstalledLines();
      if (res.data && res.data.lines) {
        setLines(res.data.lines);
        if (res.data.lines.length > 0) {
          setFormData(prev => ({ ...prev, line: res.data.lines[0].line_name }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch lines:', err);
    }
  };

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
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.line || !formData.program_name) {
      setErrorMsg(language === 'zh' ? '请填写所有必填字段' : 'Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        submitted_by: currentUser?.full_name || currentUser?.username
      };
      
      await apiService.createLaserChangeover(payload);
      
      setSuccessMsg(language === 'zh' ? '表单提交成功！已流转至工程师审批。' : 'Form submitted successfully! Waiting for Engineer approval.');
      setFormData(prev => ({
        ...prev,
        program_name: '',
        prog_name_check: false,
        laser_param_check: false,
        duplicate_code_check: false,
        pcb_anti_reverse_check: false,
        ab_barcode_check: false,
        laser_sequence_check: false,
        laser_position_check: false,
      }));
    } catch (err) {
      setErrorMsg(err.message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checklist-container">
      {successMsg && <div className="alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert-error">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="checklist-form">
        <div className="form-row">
          <div className="form-group">
            <label>{language === 'zh' ? '线体号 (Line)' : 'Line'}</label>
            <select name="line" value={formData.line} onChange={handleInputChange} required>
              <option value="">{language === 'zh' ? '-- 选择线体 --' : '-- Select Line --'}</option>
              {lines.map((l, i) => (
                <option key={i} value={l.line_name}>{l.line_name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>{language === 'zh' ? '程序名称 (Program Name)' : 'Program Name'}</label>
            <input type="text" name="program_name" value={formData.program_name} onChange={handleInputChange} required placeholder="Program name..." />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{language === 'zh' ? '转机日期 (Date)' : 'Date'}</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>{language === 'zh' ? '班别 (Shift)' : 'Shift'}</label>
            <select name="shift" value={formData.shift} onChange={handleInputChange}>
              <option value="Day">Day</option>
              <option value="Night">Night</option>
            </select>
          </div>
        </div>

        <div className="checkbox-section">
          <h3>{language === 'zh' ? '点检项目 (Check Items)' : 'Check Items'}</h3>
          
          <label className="checkbox-label">
            <input type="checkbox" name="prog_name_check" checked={formData.prog_name_check} onChange={handleInputChange} />
            {language === 'zh' ? '1. 程序名称确认 (与生产机型一致)' : '1. Program Name Confirmation'}
          </label>
          
          <label className="checkbox-label">
            <input type="checkbox" name="laser_param_check" checked={formData.laser_param_check} onChange={handleInputChange} />
            {language === 'zh' ? '2. 镭雕参数确认 (轨道宽度, 条码大小, 功率速度等)' : '2. Laser Parameter Confirmation'}
          </label>
          
          <label className="checkbox-label">
            <input type="checkbox" name="duplicate_code_check" checked={formData.duplicate_code_check} onChange={handleInputChange} />
            {language === 'zh' ? '3. 镭雕机重码功能确认 (防呆功能开启)' : '3. Laser Machine Duplicate Code Function'}
          </label>
          
          <label className="checkbox-label">
            <input type="checkbox" name="pcb_anti_reverse_check" checked={formData.pcb_anti_reverse_check} onChange={handleInputChange} />
            {language === 'zh' ? '4. PCB防反确认 (优先Mark点防反)' : '4. PCB Anti-Reverse Confirmation'}
          </label>
          
          <label className="checkbox-label">
            <input type="checkbox" name="ab_barcode_check" checked={formData.ab_barcode_check} onChange={handleInputChange} />
            {language === 'zh' ? '5. AB面条码一致确认' : '5. A/B Side Barcode Consistency'}
          </label>

          <label className="checkbox-label">
            <input type="checkbox" name="laser_sequence_check" checked={formData.laser_sequence_check} onChange={handleInputChange} />
            {language === 'zh' ? '6. 镭雕顺序确认 (区块号追溯一致)' : '6. Laser Carving Sequence Confirmation'}
          </label>

          <label className="checkbox-label">
            <input type="checkbox" name="laser_position_check" checked={formData.laser_position_check} onChange={handleInputChange} />
            {language === 'zh' ? '7. 镭雕位置确认 (二维码无偏位)' : '7. Laser Carving Position Confirmation'}
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (language === 'zh' ? '提交中...' : 'Submitting...') : (language === 'zh' ? '提交至工程师复核' : 'Submit for Engineer Review')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LaserChangeoverChecksheet;
