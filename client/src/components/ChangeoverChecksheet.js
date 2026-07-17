import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './FunctionCheckpoint.css'; // Reuse CSS to keep the exact same UI/UX design
import { useLanguage } from '../contexts/LanguageContext';
import ConfirmModal from './ConfirmModal';

// Fallback — all 25 lines if API fails
const ALL_LINE_OPTIONS = Array.from({ length: 25 }, (_, index) => String(401 + index));
const groupOptions = ['A', 'B', 'C'];

const getShiftAndDate = (now = new Date()) => {
  const hours = now.getHours();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  
  const pad = num => String(num).padStart(2, '0');
  
  if (hours >= 9 && hours < 21) {
    // Day Shift: 9 AM to 8:59 PM
    return {
      shift: 'Day',
      date: `${year}-${pad(month + 1)}-${pad(day)}`
    };
  } else if (hours >= 21) {
    // Night Shift: 9 PM to 11:59 PM
    return {
      shift: 'Night',
      date: `${year}-${pad(month + 1)}-${pad(day)}`
    };
  } else {
    // Night Shift: 12 AM to 8:59 AM (belongs to previous calendar day)
    const prevDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return {
      shift: 'Night',
      date: `${prevDate.getFullYear()}-${pad(prevDate.getMonth() + 1)}-${pad(prevDate.getDate())}`
    };
  }
};

export default function ChangeoverChecksheet({ currentUser }) {
  const { t, language } = useLanguage();
  const initialShiftAndDate = getShiftAndDate();
  const [formData, setFormData] = useState({
    line: '',
    group_name: '',
    date: initialShiftAndDate.date,
    shift: initialShiftAndDate.shift,
    model_name: '',
    model_code: '',
    designated_engineer_id: '',
    remarks: '',
    status: 'Production',
    
    // SPI
    spi_steel_stencil_suffix_match: '',
    spi_program_subpanel_serial_match: '',
    spi_recheck_pcab_polarity: '',
    spi_confirm_parameter_settings: '',
    spi_read_barcode_on: '',

    // Pre-AOI
    pre_aoi_eco_checklists: '',
    pre_aoi_program_model_modify: '',
    pre_aoi_vi_program_new_materia: '',
    pre_aoi_limit_defective_alarm: '',
    pre_aoi_test_program_bare_pcba: '',
    pre_aoi_bot_program_serial_number: '',
    pre_aoi_read_barcode_on: '',
    pre_aoi_confirm_materials_mounted: '',
    pre_aoi_delete_all_zones: '',

    // Post-AOI
    post_aoi_equipment_model: '',
    post_aoi_eco_checklists: '',
    post_aoi_program_model_modify: '',
    post_aoi_recheck_chips_standard_models: '',
    post_aoi_scan_board_picture: '',
    post_aoi_limit_defective_alarm: '',
    post_aoi_confirm_polarity_shield: '',
    post_aoi_bot_program_serial_number: '',
    post_aoi_registered_standard_models_times: '',

    // Others
    others_adjust_widths: '',
    others_add_test_standard_pcb_barcode: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [installedLines, setInstalledLines] = useState(ALL_LINE_OPTIONS);
  const [linesLoading, setLinesLoading] = useState(true);
  const [engineers, setEngineers] = useState([]);

  // Fetch installed lines & active engineers from backend
  useEffect(() => {
    apiService.getInstalledLines()
      .then(res => {
        const data = res.data.data || [];
        setInstalledLines(data.length > 0 ? data : ALL_LINE_OPTIONS);
      })
      .catch(() => setInstalledLines(ALL_LINE_OPTIONS))
      .finally(() => setLinesLoading(false));

    apiService.getEngineers()
      .then(res => {
        setEngineers(res.data.data || []);
      })
      .catch(err => console.error('Error loading engineers:', err));
  }, []);

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

  const resultOptions = ['✔️', '❌', 'N/A'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = formData.line && formData.group_name && formData.shift && formData.date && formData.designated_engineer_id && formData.model_name;
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
      // Create new apiService method inline call (assuming apiService has this configured, we'll need to add it to api.js)
      await apiService.createChangeoverChecksheet(payload);
      setShowSuccessModal(true);
      const currentShiftAndDate = getShiftAndDate();
      setFormData({
        line: '',
        group_name: '',
        date: currentShiftAndDate.date,
        shift: currentShiftAndDate.shift,
        model_name: '',
        model_code: '',
        designated_engineer_id: '',
        remarks: '',
        status: 'Production',
        
        // SPI
        spi_steel_stencil_suffix_match: '',
        spi_program_subpanel_serial_match: '',
        spi_recheck_pcab_polarity: '',
        spi_confirm_parameter_settings: '',
        spi_read_barcode_on: '',

        // Pre-AOI
        pre_aoi_eco_checklists: '',
        pre_aoi_program_model_modify: '',
        pre_aoi_vi_program_new_materia: '',
        pre_aoi_limit_defective_alarm: '',
        pre_aoi_test_program_bare_pcba: '',
        pre_aoi_bot_program_serial_number: '',
        pre_aoi_read_barcode_on: '',
        pre_aoi_confirm_materials_mounted: '',
        pre_aoi_delete_all_zones: '',

        // Post-AOI
        post_aoi_equipment_model: '',
        post_aoi_eco_checklists: '',
        post_aoi_program_model_modify: '',
        post_aoi_recheck_chips_standard_models: '',
        post_aoi_scan_board_picture: '',
        post_aoi_limit_defective_alarm: '',
        post_aoi_confirm_polarity_shield: '',
        post_aoi_bot_program_serial_number: '',
        post_aoi_registered_standard_models_times: '',

        // Others
        others_adjust_widths: '',
        others_add_test_standard_pcb_barcode: ''
      });
    } catch (error) {
      setMessage('✗ ' + (language === 'zh' ? '错误' : 'Error') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const areAllCheckItemsFilled = changeoverGroups.every(group =>
    group.items.every(item => formData[item.name] && formData[item.name].trim() !== '')
  );
  
  const hasCross = Object.values(formData).includes('❌');
  const isFormValid = formData.line && formData.group_name && formData.shift && formData.date && formData.model_name && formData.model_code && formData.designated_engineer_id && areAllCheckItemsFilled && (!hasCross || formData.remarks.trim() !== '');
  const isInspector = currentUser?.role === 'inspector';

  return (
    <div className="checkpoint-container">
      {isInspector && (
        <div className="readonly-banner" role="status">
          <span>⚠️</span>
          <span>
            {currentUser?.language === 'zh'
              ? '只读模式：检验员只能查看数据，无法填写或提交。'
              : 'Read-Only Mode: Inspectors can only view checksheet data and cannot fill or submit checks.'}
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
               <label htmlFor="date-input">{t('cp_date_req')} ({language === 'zh' ? '自动' : 'Auto'})</label>
               <input
                 id="date-input"
                 type="date"
                 name="date"
                 value={formData.date}
                 onChange={handleInputChange}
                 required
                 disabled
               />
             </div>
             <div className="form-group">
               <label htmlFor="shift-select">{t('cp_shift_req')} ({language === 'zh' ? '自动' : 'Auto'})</label>
               <select 
                 id="shift-select" 
                 name="shift" 
                 value={formData.shift} 
                 onChange={handleInputChange} 
                 required
                 disabled
               >
                 <option value="Day">{language === 'zh' ? '白班 (Day Shift)' : 'Day Shift'}</option>
                 <option value="Night">{language === 'zh' ? '晚班 (Night Shift)' : 'Night Shift'}</option>
               </select>
             </div>
             <div className="form-group" style={{ gridColumn: 'span 1' }}>
               <label>{language === 'zh' ? '机种名称 (Model Name) *' : 'Model Name *'}</label>
               <input
                 type="text"
                 name="model_name"
                 value={formData.model_name}
                 onChange={handleInputChange}
                 required
                 placeholder={language === 'zh' ? '输入机种名称...' : 'Enter model name...'}
               />
             </div>
             <div className="form-group" style={{ gridColumn: 'span 1' }}>
               <label>{language === 'zh' ? '机种代码 (Model Code) *' : 'Model Code *'}</label>
               <input
                 type="number"
                 name="model_code"
                 value={formData.model_code}
                 onChange={handleInputChange}
                 required
                 placeholder={language === 'zh' ? '输入机种代码' : 'Enter model code (numbers only)...'}
               />
             </div>
             <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label htmlFor="designated_engineer_id">{language === 'zh' ? '指定工程师 *' : 'Designated Engineer *'}</label>
                <select 
                  id="designated_engineer_id" 
                  name="designated_engineer_id" 
                  value={formData.designated_engineer_id} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="">{language === 'zh' ? '请选择工程师...' : 'Select Engineer (Please select)...'}</option>
                  {engineers.map(eng => (
                    <option key={eng.username} value={eng.username}>{eng.full_name}</option>
                  ))}
                </select>
              </div>
          </div>
          </div>

          <div className="form-section">
            <h2>{language === 'zh' ? '检查项目 (Check Items)' : 'Check Items'}</h2>
            <div className="changeover-info-banner" style={{ background: '#e0f2fe', color: '#0369a1', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
              <strong>Recording Way:</strong> "✔️" for Yes, "❌" for No, "N/A" for Not applicable. If there are abnormalities, feedback to leader to settle abnormalities.
            </div>

            {changeoverGroups.map((group, gIndex) => (
              <div key={gIndex} className="changeover-group-block" style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>{group.groupTitle}</h3>
                <div className="changeover-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {group.items.map((item, iIndex) => (
                    <div key={iIndex} className="changeover-item-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                      <div className="item-label" style={{ flex: 1, paddingRight: '20px', color: '#334155', lineHeight: '1.5' }}>
                        {item.label}
                      </div>
                      <div className="item-input" style={{ width: '150px' }}>
                        {item.type === 'text' ? (
                          <input 
                            type="text" 
                            name={item.name} 
                            value={formData[item.name]} 
                            onChange={handleInputChange}
                            placeholder="Enter Model"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            required
                          />
                        ) : (
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
                              color: formData[item.name] === '❌' ? '#ef4444' : formData[item.name] === '✔️' ? '#22c55e' : '#334155',
                              cursor: 'pointer'
                            }}
                            required
                          >
                            <option value="" disabled>{language === 'zh' ? '请选择' : 'Select...'}</option>
                            {resultOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <h2>{language === 'zh' ? '确认与备注 (Confirmation & Remarks)' : 'Confirmation & Remarks'}</h2>
            <div className="form-grid-6">
              <div className="form-group" style={{ gridColumn: 'span 6' }}>
                <label htmlFor="remarks">
                  {language === 'zh' ? '备注 (Remarks)' : 'Remarks'}
                  {hasCross && <span style={{ color: '#ef4444', marginLeft: '5px' }}>* (Required because '❌' was selected)</span>}
                </label>
                <input
                  id="remarks"
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder={hasCross ? (language === 'zh' ? '请输入原因...' : 'Please enter reason...') : (language === 'zh' ? '备注...' : 'Remarks...')}
                  required={hasCross}
                  style={{ borderColor: hasCross && !formData.remarks.trim() ? '#ef4444' : '#cbd5e1' }}
                />
              </div>
            </div>
          </div>
          <div className="changeover-notes" style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>{language === 'zh' ? '填写说明 (Notes)' : 'Notes'}</h4>
            <ol style={{ margin: 0, paddingLeft: '20px' }}>
              <li>The AOI changeover and change side checklists are accurately filled by the AOI technicians of the equipment application group during transferring new program.</li>
              <li>Recording way of the checklist: "✔️" for normal operation, "❌", "N/A" for no operation, and if there are abnormalities in line production, feedback to leader of AOI technician to settle abnormalities.</li>
              <li>Due to the difference of the equipment, changeover and change side checklists are filled out according to the type of the equipment by AOI technician, mark with "N/A" for no operation. SPI does not enable the code reading function when the auxiliary board line produces the X-board.</li>
              <li>The check items of trial-production can be provisionally adjusted upon actual situations.</li>
              <li>The new model program is filled in according to turnaround time. The process change is based on the records checklist.</li>
            </ol>
          </div>
        </fieldset>

        {message && (
          <div className={`message-banner ${message.startsWith('✓') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading || isInspector || !isFormValid}>
            {loading ? t('loading') : t('submit')}
          </button>
        </div>
      </form>

      {showConfirmModal && (
        <ConfirmModal
          isOpen={showConfirmModal}
          title={language === 'zh' ? '确认提交换线记录表' : 'Confirm Changeover Submission'}
          message={language === 'zh' 
            ? `您确定要提交 ${formData.date} - ${formData.shift} 班次 - ${formData.line} 线的换线记录表吗？将发送给工程师审批。`
            : `Are you sure you want to submit the Changeover Checksheet for Line ${formData.line} (${formData.shift} Shift) on ${formData.date}? It will be sent to the designated engineer for approval.`
          }
          onConfirm={executeSubmit}
          onCancel={() => setShowConfirmModal(false)}
          confirmText={language === 'zh' ? '确定提交' : 'Yes, Submit'}
          cancelText={t('cancel')}
          type="primary"
        />
      )}

      {showSuccessModal && (
        <ConfirmModal
          isOpen={showSuccessModal}
          title={language === 'zh' ? '提交成功' : 'Submission Successful'}
          message={language === 'zh' 
            ? `换线记录表已成功提交并进入待审批队列！`
            : `The Changeover Checksheet has been successfully submitted and is awaiting engineer approval.`
          }
          onConfirm={() => setShowSuccessModal(false)}
          confirmText={language === 'zh' ? '关闭' : 'Close'}
          hideCancel={true}
          type="success"
        />
      )}
    </div>
  );
}
