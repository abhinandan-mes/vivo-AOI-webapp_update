import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import apiService from '../services/api';
import './FunctionCheckpoint.css'; 

const ALL_LINE_OPTIONS = Array.from({ length: 25 }, (_, index) => String(401 + index));
const groupOptions = ['A', 'B', 'C'];

const getShiftAndDate = (now = new Date()) => {
  const hours = now.getHours();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  
  const pad = num => String(num).padStart(2, '0');
  
  if (hours >= 9 && hours < 21) {
    return { shift: 'Day', date: `${year}-${pad(month + 1)}-${pad(day)}` };
  } else if (hours >= 21) {
    return { shift: 'Night', date: `${year}-${pad(month + 1)}-${pad(day)}` };
  } else {
    const prevDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return { shift: 'Night', date: `${prevDate.getFullYear()}-${pad(prevDate.getMonth() + 1)}-${pad(prevDate.getDate())}` };
  }
};

export default function LaserChangeoverChecksheet({ currentUser }) {
  const { t, language } = useLanguage();
  const initialTime = getShiftAndDate();
  
  const [formData, setFormData] = useState({
    line: '',
    group_name: '',
    program_name: '',
    date: initialTime.date,
    shift: initialTime.shift,
    designated_engineer_id: '',
    remarks: '',

    prog_name_check: '',
    laser_param_check: '',
    duplicate_code_check: '',
    pcb_anti_reverse_check: '',
    ab_barcode_check: '',
    laser_sequence_check: '',
    laser_position_check: ''
  });

  const [installedLines, setInstalledLines] = useState(ALL_LINE_OPTIONS);
  const [linesLoading, setLinesLoading] = useState(true);
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiService.getInstalledLines()
      .then(res => {
        const data = res.data.data || [];
        if (data.length > 0) {
          setInstalledLines(data.map(d => d.line_name));
        }
      })
      .catch(err => console.error('Error fetching lines:', err))
      .finally(() => setLinesLoading(false));

    apiService.getEngineers()
      .then(res => {
        setEngineers(res.data.data || []);
      })
      .catch(err => console.error('Error fetching engineers:', err));
  }, []);

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
    setMessage('');

    try {
      const payload = {
        line: formData.line,
        group_name: formData.group_name,
        program_name: formData.program_name,
        date: formData.date,
        shift: formData.shift,
        designated_engineer_id: formData.designated_engineer_id,
        remarks: formData.remarks,
        submitted_by: currentUser?.full_name || currentUser?.username || 'Unknown',

        prog_name_check: formData.prog_name_check === 'true',
        laser_param_check: formData.laser_param_check === 'true',
        duplicate_code_check: formData.duplicate_code_check === 'true',
        pcb_anti_reverse_check: formData.pcb_anti_reverse_check === 'true',
        ab_barcode_check: formData.ab_barcode_check === 'true',
        laser_sequence_check: formData.laser_sequence_check === 'true',
        laser_position_check: formData.laser_position_check === 'true'
      };
      
      await apiService.createLaserChangeover(payload);
      
      setMessage(language === 'zh' ? '提交成功！表单已流转至工程师审批。' : 'Form submitted successfully! Waiting for Engineer approval.');
      setFormData(prev => ({
        ...prev,
        program_name: '',
        remarks: '',
        prog_name_check: '',
        laser_param_check: '',
        duplicate_code_check: '',
        pcb_anti_reverse_check: '',
        ab_barcode_check: '',
        laser_sequence_check: '',
        laser_position_check: ''
      }));
    } catch (err) {
      setMessage((language === 'zh' ? '错误' : 'Error') + ': ' + (err.message || 'Error submitting form'));
    } finally {
      setLoading(false);
    }
  };

  const resultOptions = [
    { label: '✓ (OK)', value: 'true' },
    { label: '❌ (NG)', value: 'false' }
  ];

  const checkItems = [
    { name: 'prog_name_check', label: language === 'zh' ? '1. 程序名称确认 (与生产机型一致)' : '1. Program Name Confirmation' },
    { name: 'laser_param_check', label: language === 'zh' ? '2. 镭雕参数确认 (轨道宽度, 条码大小, 功率速度等)' : '2. Laser Parameter Confirmation' },
    { name: 'duplicate_code_check', label: language === 'zh' ? '3. 镭雕机重码功能确认 (防呆功能开启)' : '3. Laser Machine Duplicate Code Function' },
    { name: 'pcb_anti_reverse_check', label: language === 'zh' ? '4. PCB防反确认 (优先Mark点防反)' : '4. PCB Anti-Reverse Confirmation' },
    { name: 'ab_barcode_check', label: language === 'zh' ? '5. AB面条码一致确认' : '5. A/B Side Barcode Consistency' },
    { name: 'laser_sequence_check', label: language === 'zh' ? '6. 镭雕顺序确认 (区块号追溯一致)' : '6. Laser Carving Sequence Confirmation' },
    { name: 'laser_position_check', label: language === 'zh' ? '7. 镭雕位置确认 (二维码无偏位)' : '7. Laser Carving Position Confirmation' }
  ];

  const isInspector = currentUser?.role === 'inspector';

  return (
    <div className="checkpoint-container">
      {isInspector && (
        <div className="readonly-banner" role="status">
          <span>⚠️</span>
          <span>
            {language === 'zh'
              ? '只读模式：检验员只能查看数据，无法提交表单。'
              : 'Read-Only Mode: Inspectors can only view checksheet data and cannot submit checks.'}
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
                 <label htmlFor="shift-select">{language === 'zh' ? '班别 (Shift) *' : 'Shift *'}</label>
                 <select
                   id="shift-select"
                   name="shift"
                   value={formData.shift}
                   onChange={handleInputChange}
                   required
                 >
                   <option value="" disabled>{language === 'zh' ? '请选择...' : 'Select...'}</option>
                   <option value="Day">{language === 'zh' ? '白班 (Day Shift)' : 'Day Shift'}</option>
                   <option value="Night">{language === 'zh' ? '夜班 (Night Shift)' : 'Night Shift'}</option>
                 </select>
               </div>

               <div className="form-group" style={{ gridColumn: 'span 1' }}>
                 <label>{language === 'zh' ? '程序名称 (Program Name) *' : 'Program Name *'}</label>
                 <input
                   type="text"
                   name="program_name"
                   value={formData.program_name}
                   onChange={handleInputChange}
                   required
                   placeholder={language === 'zh' ? '输入程序名称...' : 'Enter program name...'}
                 />
               </div>

               <div className="form-group" style={{ gridColumn: 'span 1' }}>
                  <label htmlFor="designated_engineer_id">{language === 'zh' ? '指定工程师 *' : 'Designated Engineer *'}</label>
                  <select 
                    id="designated_engineer_id" 
                    name="designated_engineer_id" 
                    value={formData.designated_engineer_id} 
                    onChange={handleInputChange} 
                    required
                  >
                    <option value="">{language === 'zh' ? '选择工程师...' : 'Select Engineer...'}</option>
                    {engineers.map(eng => (
                      <option key={eng.username} value={eng.username}>{eng.full_name}</option>
                    ))}
                  </select>
                </div>
            </div>
          </div>

          <div className="form-section">
            <h2>{language === 'zh' ? '点检项目 (Check Items)' : 'Check Items'}</h2>
            <div className="changeover-group-block" style={{ marginBottom: '2rem' }}>
              <div className="changeover-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {checkItems.map((item, index) => (
                  <div key={index} className="changeover-item-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                    <div className="item-label" style={{ flex: 1, paddingRight: '20px', color: '#334155', lineHeight: '1.5', fontWeight: '500' }}>
                      {item.label}
                    </div>
                    <div className="item-input" style={{ width: '150px' }}>
                      <select 
                        name={item.name} 
                        value={formData[item.name]} 
                        onChange={handleInputChange}
                        style={{ 
                          width: '100%', 
                          padding: '0.5rem', 
                          borderRadius: '6px', 
                          border: `1px solid ${formData[item.name] === '' ? '#ef4444' : '#cbd5e1'}`, 
                          background: '#fff',
                          outline: 'none',
                          color: formData[item.name] === '' ? '#64748b' : '#0f172a',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        required
                      >
                        <option value="" disabled>{language === 'zh' ? '请选择' : 'Select...'}</option>
                        {resultOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-group-full" style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
                {language === 'zh' ? '备注 (Remarks)' : 'Remarks'}
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                rows="3"
                placeholder={language === 'zh' ? '如有异常请填写备注...' : 'Enter any remarks...'}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
              />
            </div>
            
            {message && (
              <div className={`status-message ${message.includes('成功') || message.includes('success') ? 'success' : 'error'}`} style={{ marginBottom: '1rem', padding: '1rem', borderRadius: '8px', background: message.includes('成功') || message.includes('success') ? '#dcfce7' : '#fee2e2', color: message.includes('成功') || message.includes('success') ? '#166534' : '#991b1b' }}>
                {message}
              </div>
            )}

            {!isInspector && (
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={loading}
                style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 6px rgba(59, 130, 246, 0.2)' }}
              >
                {loading 
                  ? (language === 'zh' ? '提交中...' : 'Submitting...') 
                  : (language === 'zh' ? '提交至工程师审批' : 'Submit for Engineer Review')
                }
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
}
