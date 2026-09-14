import React, { useEffect, useMemo, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import apiService from '../services/api';
import './Reports.css';
import { useLanguage } from '../contexts/LanguageContext';

const checkpointGroups = [
  { label: 'Laser Barcode Detection', prefix: 'laser_barcode', positions: [
      { key: 'before_bot', short: 'Before B', label: 'Before Bottom' },
      { key: 'before_top', short: 'Before T', label: 'Before Top' },
      { key: 'after_bot', short: 'After B', label: 'After Bottom' },
      { key: 'after_top', short: 'After T', label: 'After Top' }
    ]
  },
  { label: 'Laser PCB Text Detection', prefix: 'laser_pcb_text', positions: [
      { key: 'before', short: 'Before', label: 'Before' },
      { key: 'after', short: 'After', label: 'After' }
    ]
  },
  { label: 'SPI Barcode Detection', prefix: 'spi_barcode', positions: [
      { key: 'before_bot', short: 'Before B', label: 'Before Bottom' },
      { key: 'before_top', short: 'Before T', label: 'Before Top' },
      { key: 'after_bot', short: 'After B', label: 'After Bottom' },
      { key: 'after_top', short: 'After T', label: 'After Top' }
    ]
  },
  { label: 'SPI MES Detection', prefix: 'spi_mes', positions: [
      { key: 'before_bot', short: 'Before B', label: 'Before Bottom' },
      { key: 'before_top', short: 'Before T', label: 'Before Top' },
      { key: 'after_bot', short: 'After B', label: 'After Bottom' },
      { key: 'after_top', short: 'After T', label: 'After Top' }
    ]
  },
  { label: 'Pre-AOI Barcode Detection', prefix: 'pre_aoi_barcode', positions: [
      { key: 'before_bot', short: 'Before B', label: 'Before Bottom' },
      { key: 'before_top', short: 'Before T', label: 'Before Top' },
      { key: 'after_bot', short: 'After B', label: 'After Bottom' },
      { key: 'after_top', short: 'After T', label: 'After Top' }
    ]
  },
  { label: 'Post-AOI Barcode Detection', prefix: 'post_aoi_barcode', positions: [
      { key: 'before_bot', short: 'Before B', label: 'Before Bottom' },
      { key: 'before_top', short: 'Before T', label: 'Before Top' },
      { key: 'after_bot', short: 'After B', label: 'After Bottom' },
      { key: 'after_top', short: 'After T', label: 'After Top' }
    ]
  },
  { label: 'SPI FOV', prefix: 'spi_fov', positions: [
      { key: 'before', short: 'Before', label: 'Before' },
      { key: 'after', short: 'After', label: 'After' }
    ]
  },
  { label: 'Pre-AOI FOV', prefix: 'pre_aoi_fov', positions: [
      { key: 'before', short: 'Before', label: 'Before' },
      { key: 'after', short: 'After', label: 'After' }
    ]
  },
  { label: 'Password Function at Pre-AOI', prefix: 'password_function_pre_aoi', positions: [
      { key: 'before', short: 'Before', label: 'Before' },
      { key: 'after', short: 'After', label: 'After' }
    ]
  },
  { label: 'Pre-AOI SPC', prefix: 'pre_aoi_spc', positions: [
      { key: 'before', short: 'Before', label: 'Before' },
      { key: 'after', short: 'After', label: 'After' }
    ]
  },
  { label: 'Post-AOI FOV', prefix: 'post_aoi_fov', positions: [
      { key: 'before', short: 'Before', label: 'Before' },
      { key: 'after', short: 'After', label: 'After' }
    ]
  }
];

const text = value => value === null || value === undefined || value === '' ? 'â€”' : value;
const dateKey = value => {
  if (!value) return '';
  if (value instanceof Date) {
    const pad = number => String(number).padStart(2, '0');
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
  }
  if (typeof value === 'string') {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  const pad = number => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const escapeHtml = value => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const shiftOptions = ['Day', 'Night'];
const hasShiftStarted = (dateStr, shift) => {
  const now = new Date();
  const todayStr = dateKey(now);
  
  if (dateStr < todayStr) return true;
  if (dateStr > todayStr) return false;
  
  const currentHour = now.getHours();
  if (shift === 'Day') {
    return currentHour >= 9;
  } else {
    return currentHour >= 21;
  }
};
const groupOptions = ['A', 'B', 'C'];

export default function Reports({ currentUser }) {
  const { t, language } = useLanguage();
  const [reportType, setReportType] = useState('checklist');
  const [checklists, setChecklists] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);
  const [changeovers, setChangeovers] = useState([]);
  const [laserChangeovers, setLaserChangeovers] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(() => {
    const todayStr = dateKey(new Date());
    return { from: todayStr, to: todayStr, line: '', shift: '', group: '', status: '', sort: 'latest' };
  });
  const [showExport, setShowExport] = useState(false);
  const [exportConfirm, setExportConfirm] = useState({ show: false, format: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    // Clear selection when filters change
    setSelectedRows([]);
  }, [filters, reportType]);

  const handleSelectRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredRows.length && filteredRows.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredRows.map(row => row.id));
    }
  };

  const checkpointColumns = useMemo(() => {
    return checkpointGroups.flatMap(group => group.positions.map(position => ({
      key: `${group.prefix}_${position.key}`,
      label: `${t('label_' + group.prefix)} - ${t('cp_th_' + position.key)}`
    })));
  }, [t]);

  const checklistColumns = useMemo(() => [
    [t('date'), 'date'],
    [t('line'), 'line'],
    [t('group'), 'group_name'],
    [t('shift'), 'shift'],
    [t('rep_th_status'), 'status'],
    [t('rep_th_submitted_at'), 'created_at'],
    [t('rep_th_submitted_by'), 'submitted_by'],
    [t('rep_th_program'), 'pre_aoi_program_full_name'],
    [t('rep_th_stencil_b'), 'stencil_serial_no_b_side'],
    [t('rep_th_stencil_a'), 'stencil_serial_no_a_side'],
    [t('rep_th_b_laser'), 'barcode_read_a_layer'],
    [t('rep_th_b_spi'), 'barcode_read_a_spi'],
    [t('rep_th_b_pre_aoi'), 'barcode_read_a_pre_aoi'],
    [t('rep_th_a_laser'), 'barcode_read_b_layer'],
    [t('rep_th_a_spi'), 'barcode_read_b_spi'],
    [t('rep_th_a_pre_aoi'), 'barcode_read_b_pre_aoi'],
    [t('rep_th_pre_wo'), 'workorder_info_pre_aoi'],
    [t('rep_th_post_wo'), 'workorder_info_post_aoi'],
    [t('rep_th_traceability'), 'aoi_scan_tools_workorder_traceability'],
    [t('rep_th_confirmed'), 'confirmation']
  ], [t]);

  // All 25 lines â€” used as fallback and for the full list
  const allLineOptions = useMemo(() => Array.from({ length: 25 }, (_, index) => String(401 + index)), []);

  // Line installation statuses fetched from backend
  const [lineStatuses, setLineStatuses] = useState([]);
  useEffect(() => {
    apiService.getAllLines()
      .then(res => setLineStatuses(res.data.data || []))
      .catch(() => setLineStatuses([]));
  }, []);

  // Derived: installed lines for pending/submitted counts
  const lineOptions = useMemo(() => {
    if (lineStatuses.length === 0) return allLineOptions;
    return lineStatuses.filter(l => l.is_installed).map(l => l.line);
  }, [lineStatuses, allLineOptions]);

  // Lines marked as Not Installed
  const notInstalledLines = useMemo(() => {
    if (lineStatuses.length === 0) return [];
    return lineStatuses.filter(l => !l.is_installed).map(l => l.line);
  }, [lineStatuses]);

  const formatDate = value => {
    if (!value) return 'â€”';
    let dateStr = '';
    if (typeof value === 'string') {
      const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (match) {
        dateStr = `${match[1]}-${match[2]}-${match[3]}`;
      }
    }
    if (!dateStr) {
      const dateObj = new Date(value);
      if (isNaN(dateObj.getTime())) return 'â€”';
      const pad = number => String(number).padStart(2, '0');
      dateStr = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}`;
    }
    const [year, month, day] = dateStr.split('-');
    if (language === 'zh') {
      return `${year}/${parseInt(month)}/${parseInt(day)}`;
    }
    return `${day}-${month}-${year}`;
  };

  const formatDateTime = value => {
    if (!value) return 'â€”';
    return new Date(value).toLocaleString(language === 'zh' ? 'zh-CN' : undefined);
  };

  const getEngineerDisplay = (id) => {
    if (!id) return language === 'zh' ? 'ç³»ç»Ÿè‡ªåŠ¨' : 'System (Automatic)';
    if (id === 'System (Automatic)') return language === 'zh' ? 'ç³»ç»Ÿè‡ªåŠ¨' : 'System (Automatic)';
    const eng = engineers.find(e => e.username === id);
    return eng ? `${eng.full_name} (${eng.username})` : id;
  };

  const changeoverColumns = useMemo(() => [
    [t('date'), 'date'],
    [t('line'), 'line'],
    [t('group'), 'group_name'],
    [t('shift'), 'shift'],
    [language === 'zh' ? 'æ¢çº¿ç±»åž‹' : 'Changeover Type', 'changeover_type'],
    [language === 'zh' ? 'æ–‡æ¡£çŠ¶æ€' : 'Doc Status', 'approval_status'],
    [language === 'zh' ? 'æœºç§åç§°' : 'Model Name', 'model_name'],
    [language === 'zh' ? 'æœºç§ä»£ç ' : 'Model Code', 'model_code'],
    [t('rep_designated_engineer'), 'designated_engineer_id'],
    [t('rep_th_submitted_at'), 'created_at'],
    [t('rep_th_submitted_by'), 'submitted_by']
  ], [language, t]);

  const reportTitle = reportType => 
    reportType === 'checkpoint' ? t('rep_toggle_checkpoint') : 
    reportType === 'changeover' ? (language === 'zh' ? 'æ¢çº¿è®°å½•è¡¨' : 'Changeover Checksheet') : 
    t('rep_toggle_checklist');

  const reportFileName = reportType => 
    reportType === 'checkpoint' ? 'daily-function-checks' : 
    reportType === 'changeover' ? 'changeover-checksheets' :
    reportType === 'laser_changeover' ? 'laser-changeover-checksheets' : 
    'technician-checklists';
  
  const getExportColumns = reportType => {
    if (reportType === 'checkpoint') {
      return [
        [t('date'), 'date'],
        [t('line'), 'line'],
        [t('group'), 'group_name'],
        [t('shift'), 'shift'],
        [t('rep_th_status'), 'status'],
        [t('rep_th_resp_person'), 'responsible_person'],
        [t('rep_th_time'), 'time'],
        [t('rep_th_submitted_by'), 'submitted_by'],
        [t('rep_th_submitted_at'), 'created_at'],
        ...checkpointColumns.map(column => [column.label, column.key])
      ];
    } else if (reportType === 'laser_changeover') {
      const detailColumns = [
        [language === 'zh' ? '1. ç¨‹åºåç§°' : '1. Program Name Confirmation', 'prog_name_check'],
        [language === 'zh' ? '2. é•­é›•å‚æ•°' : '2. Laser Parameter Confirmation', 'laser_param_check'],
        [language === 'zh' ? '3. é‡ç åŠŸèƒ½' : '3. Laser Machine Duplicate Code Function', 'duplicate_code_check'],
        [language === 'zh' ? '4. PCBé˜²å' : '4. PCB Anti-Reverse Confirmation', 'pcb_anti_reverse_check'],
        [language === 'zh' ? '5. ABé¢æ¡ç ' : '5. A/B Side Barcode Consistency', 'ab_barcode_check'],
        [language === 'zh' ? '6. é•­é›•é¡ºåº' : '6. Laser Carving Sequence Confirmation', 'laser_sequence_check'],
        [language === 'zh' ? '7. é•­é›•ä½ç½®' : '7. Laser Carving Position Confirmation', 'laser_position_check']
      ];
      return [
        [language === 'zh' ? 'çº¿ä½“å·' : 'Line', 'line'],
        [language === 'zh' ? 'ç­ç»„' : 'Group', 'group_name'],
        [language === 'zh' ? 'æ—¥æœŸ' : 'Date', 'date'],
        [language === 'zh' ? 'ç­åˆ«' : 'Shift', 'shift'],
        [language === 'zh' ? 'ç¨‹åºåç§°' : 'Program Name', 'program_name'],
        ...detailColumns
      ];
    } else if (reportType === 'changeover') {
      const detailColumns = [
        [language === 'zh' ? '1. SPIé’¢ç½‘åŽç¼€ä¸€è‡´' : '1. SPI Stencil Match', 'spi_steel_stencil_suffix_match'],
        [language === 'zh' ? '2. ç¨‹åºå°æ¿åºå·ä¸€è‡´' : '2. Sub-panel Serial Match', 'spi_program_subpanel_serial_match'],
        [language === 'zh' ? '3. å¤æŸ¥180åº¦æžæ€§' : '3. Recheck PCAB Polarity', 'spi_recheck_pcab_polarity'],
        [language === 'zh' ? '4. å‚æ•°è®¾ç½®ä¸€è‡´' : '4. Parameter Settings', 'spi_confirm_parameter_settings'],
        [language === 'zh' ? '5. è¯»ç åŠŸèƒ½å¼€å¯' : '5. Read Barcode On', 'spi_read_barcode_on'],
        [language === 'zh' ? '6. ECOæ£€æŸ¥è¡¨å†…å®¹' : '6. ECO Checklists', 'pre_aoi_eco_checklists'],
        [language === 'zh' ? '7. ä¿®æ”¹ç¨‹åºæœºç§' : '7. Modify Program Model', 'pre_aoi_program_model_modify'],
        [language === 'zh' ? '8. VIæ–°æ–™æµ‹è¯•' : '8. VI New Materia Test', 'pre_aoi_vi_program_new_materia'],
        [language === 'zh' ? '9. é™åˆ¶ä¸è‰¯æŠ¥è­¦' : '9. Limit Defective Alarm', 'pre_aoi_limit_defective_alarm'],
        [language === 'zh' ? '10. è£¸æ¿æµ‹è¯•ç¨‹åº' : '10. Bare PCBA Test Program', 'pre_aoi_test_program_bare_pcba'],
        [language === 'zh' ? '11. Botç¨‹åºåºå·ä¸€è‡´' : '11. Bot Program Serial Match', 'pre_aoi_bot_program_serial_number'],
        [language === 'zh' ? '12. ç‚‰å‰è¯»ç åŠŸèƒ½å¼€å¯' : '12. Pre-AOI Read Barcode', 'pre_aoi_read_barcode_on'],
        [language === 'zh' ? '13a. ç¡®è®¤ç‰©æ–™å·²è´´è£…' : '13a. Confirm Materials Mounted', 'pre_aoi_confirm_materials_mounted'],
        [language === 'zh' ? '13b. åˆ é™¤å¹¶é‡æ–°ä¼˜åŒ–' : '13b. Delete & Optimize Zones', 'pre_aoi_delete_all_zones'],
        [language === 'zh' ? '14. ç‚‰åŽAOIè®¾å¤‡æœºç§' : '14. Post-AOI Equipment Model', 'post_aoi_equipment_model'],
        [language === 'zh' ? '15. ECOæ£€æŸ¥è¡¨å†…å®¹' : '15. Post-AOI ECO Checklists', 'post_aoi_eco_checklists'],
        [language === 'zh' ? '16. ä¿®æ”¹ç¨‹åºæœºç§' : '16. Post-AOI Modify Program', 'post_aoi_program_model_modify'],
        [language === 'zh' ? '17. å¤æŸ¥æ ‡å‡†ä»¶' : '17. Recheck Standard Models', 'post_aoi_recheck_chips_standard_models'],
        [language === 'zh' ? '18. æ‰«æå½“å‰ç”»æ¿' : '18. Scan Board Picture', 'post_aoi_scan_board_picture'],
        [language === 'zh' ? '19. é™åˆ¶ä¸è‰¯æŠ¥è­¦' : '19. Post-AOI Defective Alarm', 'post_aoi_limit_defective_alarm'],
        [language === 'zh' ? '20. å¯¹ç§°å±è”½ç½©æžæ€§' : '20. Shield Polarity', 'post_aoi_confirm_polarity_shield'],
        [language === 'zh' ? '21. Botç¨‹åºåºå·ä¸€è‡´' : '21. Post-AOI Bot Serial Match', 'post_aoi_bot_program_serial_number'],
        [language === 'zh' ? '22. ALD620æ¬¡æ•°é™åˆ¶' : '22. Registered Standard Times', 'post_aoi_registered_standard_models_times'],
        [language === 'zh' ? '23. è°ƒæ•´è®¾å¤‡å®½åº¦' : '23. Adjust Widths', 'others_adjust_widths'],
        [language === 'zh' ? '24. å¢žåŠ æµ‹è¯•æ ‡å‡†æ¡ç ' : '24. Add Test Standard Barcode', 'others_add_test_standard_pcb_barcode'],
        [t('rep_remarks'), 'remarks']
      ];
      return [...changeoverColumns, ...detailColumns];
    } else {
      return checklistColumns;
    }
  };

  const isCheckpointColumn = key => checkpointColumns.some(column => column.key === key);

  const exportValue = (row, key, reportType) => {
    if (key === 'date') return dateKey(row[key]);
    if (key === 'created_at') return row[key] ? new Date(row[key]).toLocaleString(language === 'zh' ? 'zh-CN' : undefined) : '';
    if (reportType === 'checkpoint' && isCheckpointColumn(key)) return row[key] ? t('yes') : t('no');
    
    // Localize options values
    if (key === 'status') {
      if (row[key] === 'Line Stop') return t('cl_status_linestop');
      if (row[key] === 'Not Filled') return language === 'zh' ? 'æœªæäº¤' : 'Not Filled';
      if (row[key] === 'Line Not Installed') return language === 'zh' ? 'æœªå®‰è£…' : 'Line Not Installed';
      return t('cl_status_production');
    }
    if (key === 'shift') {
      return row[key] === 'Day' ? t('day') : (row[key] === 'Night' ? t('night') : row[key]);
    }
    if (key === 'confirmation') {
      return row[key] === 'Yes' ? t('yes') : (row[key] === 'No' ? t('no') : row[key]);
    }
    if (key.startsWith('barcode_read_')) {
      return row[key] === 'Yes' ? t('yes') : (row[key] === 'No' ? t('no') : row[key]);
    }
    if (reportType === 'changeover') {
      const val = row[key];
      if (val === true || val === 'true') return 'True';
      if (val === false || val === 'false') return 'False';
      if (val === 'Yes' || val === 'âˆš') return 'âˆš';
      if (val === 'No' || val === '\\') return 'Ã—';
      if (!val && val !== 0) return 'â€”';
    }
    return row[key] ?? '';
  };

  const isSuperAdmin = currentUser?.role === 'super_admin';

  const loadData = () => {
    setLoading(true);
    setError('');
    Promise.all([
      apiService.getAllChecklists(),
      apiService.getAllCheckpoints(),
      apiService.getAllChangeoverChecksheets(),
        apiService.getLaserChangeoverReports(),
        apiService.getEngineers()
    ])
      .then(([checklistRes, checkpointRes, changeoverRes, laserRes, engineersRes]) => {
        setChecklists(checklistRes.data.data || []);
        setCheckpoints(checkpointRes.data.data || []);
        setChangeovers(changeoverRes.data.data || []);
          setLaserChangeovers(laserRes.data.data || []);
          setEngineers(engineersRes.data.data || []);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [reportType]);

  const handleDeleteClick = (id, type) => {
    setDeleteConfirm({ id, type });
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;
    const { id, type } = deleteConfirm;

    try {
      setLoading(true);
      if (type === 'checkpoint') {
        await apiService.deleteCheckpoint(id);
      } else if (type === 'laser_changeover') {
          await apiService.deleteLaserChangeover(id);
        } else if (type === 'changeover') {
        await apiService.deleteChangeoverChecksheet(id);
      } else {
        await apiService.deleteChecklist(id);
      }
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to delete record');
      setLoading(false);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const rows = useMemo(() => {
    const data = reportType === 'checkpoint' ? checkpoints : reportType === 'changeover' ? changeovers : reportType === 'laser_changeover' ? laserChangeovers : checklists;
    
    const completeRows = [];

    if (reportType === 'changeover' || reportType === 'laser_changeover') {
        // Changeovers don't happen on every line every day, so we do NOT pad with "Not Filled" rows.
      completeRows.push(...data);
    } else {
      // Find all unique dates in the dataset
      const uniqueDates = Array.from(new Set(data.map(d => dateKey(d.date))));
      if (uniqueDates.length === 0) {
        uniqueDates.push(dateKey(new Date()));
      }
      
      uniqueDates.forEach(dateStr => {
        const recordsForDate = data.filter(d => dateKey(d.date) === dateStr);
        
        allLineOptions.forEach(line => {
          const isInstalled = !notInstalledLines.includes(line);
          if (!isInstalled) return;
          
          shiftOptions.forEach(shift => {
            const actualRecord = recordsForDate.find(r => String(r.line) === line && r.shift === shift);
            if (actualRecord) {
              completeRows.push(actualRecord);
            } else {
              if (hasShiftStarted(dateStr, shift)) {
                completeRows.push({
                  id: `dummy-${dateStr}-${line}-${shift}`,
                  date: dateStr,
                  line: line,
                  shift: shift,
                  group_name: 'â€”',
                  status: 'Not Filled',
                  submitted_by: 'â€”',
                  created_at: null,
                });
              }
            }
          });
        });
      });
    }

    return completeRows.sort((a, b) => {
      if (filters.sort === 'latest') {
        // Sort by created_at descending (latest first)
        // Dummy rows have created_at = null, they should appear at the end or we can just sort by date then created_at
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
        
        if (timeB !== timeA) return timeB - timeA;
        
        // Fallback: Date descending
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateB !== dateA) return dateB - dateA;
        
        // Fallback: Line ascending
        const lineCompare = String(a.line).localeCompare(String(b.line));
        if (lineCompare !== 0) return lineCompare;
        
        return String(a.shift).localeCompare(String(b.shift));
      } else {
        // 'line_asc' logic
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        if (timeB !== timeA) return timeB - timeA;
        
        // then by line ascending
        const lineCompare = String(a.line).localeCompare(String(b.line));
        if (lineCompare !== 0) return lineCompare;
        
        // then by shift ascending (Day, then Night)
        return String(a.shift).localeCompare(String(b.shift));
      }
    });
  }, [reportType, checklists, checkpoints, changeovers, laserChangeovers, allLineOptions, notInstalledLines, filters.sort]);

  const filteredRows = useMemo(() => rows.filter(row => {
    const date = dateKey(row.date);
    return (!filters.from || date >= filters.from)
      && (!filters.to || date <= filters.to)
      && (!filters.line || row.line === filters.line)
      && (!filters.shift || row.shift === filters.shift)
      && (!filters.group || row.group_name === filters.group)
      && (!filters.status || (
        filters.status === 'Pending Review' ? row.approval_status === 'ENG_PENDING' :
        filters.status === 'Disapproved' ? row.approval_status === 'DISAPPROVED' :
        row.status === filters.status
      ));
  }), [rows, filters]);

  // Summary metrics date & shift selection states
  const getCurrentShift = (now = new Date()) => {
    const hours = now.getHours();
    return (hours >= 9 && hours < 21) ? 'Day' : 'Night';
  };

  const [techSummaryDate, setTechSummaryDate] = useState(() => dateKey(new Date()));
  const [techSummaryShift, setTechSummaryShift] = useState(() => getCurrentShift());
  const [funcSummaryDate, setFuncSummaryDate] = useState(() => dateKey(new Date()));
  const [funcSummaryShift, setFuncSummaryShift] = useState(() => getCurrentShift());

  // Technician Checklist Today / Selected Date
  const techTodaySubmissions = useMemo(() => {
    return checklists.filter(r => dateKey(r.date) === techSummaryDate && r.shift === techSummaryShift);
  }, [checklists, techSummaryDate, techSummaryShift]);

  const techTodayDoneLines = useMemo(() => {
    return Array.from(new Set(techTodaySubmissions.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [techTodaySubmissions, lineOptions]);

  const techTodayPendingLines = useMemo(() => {
    return lineOptions.filter(l => !techTodayDoneLines.includes(l));
  }, [lineOptions, techTodayDoneLines]);

  const techPendingReviewLines = useMemo(() => {
    const pending = techTodaySubmissions.filter(r => r.approval_status === 'ENG_PENDING');
    return Array.from(new Set(pending.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [techTodaySubmissions, lineOptions]);

  const techApprovedLines = useMemo(() => {
    const approved = techTodaySubmissions.filter(r => r.approval_status === 'APPROVED');
    return Array.from(new Set(approved.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [techTodaySubmissions, lineOptions]);



  // Daily Function Check Today / Selected Date
  const funcTodaySubmissions = useMemo(() => {
    return checkpoints.filter(r => dateKey(r.date) === funcSummaryDate && r.shift === funcSummaryShift);
  }, [checkpoints, funcSummaryDate, funcSummaryShift]);

  const funcTodayDoneLines = useMemo(() => {
    return Array.from(new Set(funcTodaySubmissions.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [funcTodaySubmissions, lineOptions]);

  const funcTodayPendingLines = useMemo(() => {
    return lineOptions.filter(l => !funcTodayDoneLines.includes(l));
  }, [lineOptions, funcTodayDoneLines]);

  const funcPendingReviewLines = useMemo(() => {
    const pending = funcTodaySubmissions.filter(r => r.approval_status === 'ENG_PENDING');
    return Array.from(new Set(pending.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [funcTodaySubmissions, lineOptions]);

  const funcApprovedLines = useMemo(() => {
    const approved = funcTodaySubmissions.filter(r => r.approval_status === 'APPROVED');
    return Array.from(new Set(approved.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [funcTodaySubmissions, lineOptions]);



  const updateFilter = event => {
    const { name, value } = event.target;
    setFilters(current => {
      const next = { ...current, [name]: value };
      if (name === 'from' && next.to && next.to < value) {
        next.to = value;
      }
      if (name === 'to' && next.from && value < next.from) {
        next.to = next.from;
      }
      return next;
    });
  };

  const downloadCsv = () => {
    const columns = getExportColumns(reportType);
    const escape = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const csvRows = [columns.map(([label]) => escape(label)).join(',')];
    const dataToExport = selectedRows.length > 0 ? filteredRows.filter(r => selectedRows.includes(r.id)) : filteredRows;
    
    dataToExport.forEach(row => {
      csvRows.push(columns.map(([, key]) => {
        return escape(exportValue(row, key, reportType));
      }).join(','));
    });
    const blob = new Blob([`\uFEFF${csvRows.join('\n')}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportFileName(reportType)}-${dateKey(new Date())}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    const columns = getExportColumns(reportType);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const title = reportTitle(reportType);
    const generatedDate = new Date().toLocaleString(language === 'zh' ? 'zh-CN' : undefined);
    
    const dataToExport = selectedRows.length > 0 ? filteredRows.filter(r => selectedRows.includes(r.id)) : filteredRows;
    
    const tableRows = dataToExport.map(row => `
      <tr>${columns.map(([, key]) => `<td>${escapeHtml(exportValue(row, key, reportType) || 'â€”')}</td>`).join('')}</tr>
    `).join('');

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${escapeHtml(title)}</title>
          <style>
            @page { size: landscape; margin: 12mm; }
            body { color: #0f172a; font-family: Arial, sans-serif; margin: 0; }
            h1 { font-size: 18px; margin: 0 0 4px; }
            p { color: #475569; font-size: 11px; margin: 0 0 12px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #cbd5e1; font-size: 8px; padding: 4px; text-align: left; vertical-align: top; }
            th { background: #f1f5f9; color: #334155; }
          </style>
        </head>
        <body>
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h1>${escapeHtml(title)}</h1>
              <p>${language === 'zh' ? 'ç”ŸæˆäºŽ' : 'Generated'} ${escapeHtml(generatedDate)} Â· ${filteredRows.length} ${language === 'zh' ? 'æ¡è®°å½•' : `record${filteredRows.length === 1 ? '' : 's'}`}</p>
            </div>
            <div style="font-size: 10px; font-weight: bold; color: #334155;">
              Doc No. - INWJZ1-42026050500004
            </div>
          </div>
          <table>
            <thead><tr>${columns.map(([label]) => `<th>${escapeHtml(label)}</th>`).join('')}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };

  const triggerExport = (format) => {
    setShowExport(false);
    if (format === 'csv' || format === 'pdf') {
      setExportConfirm({ show: true, format });
    }
  };

  const executeExport = () => {
    const format = exportConfirm.format;
    setExportConfirm({ show: false, format: '' });
    if (format === 'csv') downloadCsv();
    if (format === 'pdf') exportPdf();
  };

  const renderSummaryCard = (title, submittedLines, pendingReviewLines, approvedLines, notFilledLines, notInstLines, colorThemeClass, dateValue, onDateChange, shiftValue, onShiftChange) => {
    const totalLines = lineOptions.length;
    const progressPercent = totalLines > 0 ? Math.round((submittedLines.length / totalLines) * 100) : 0;
    
    return (
      <div className={`summary-card ${colorThemeClass}`}>
        <div className="summary-card-header">
          <h3>{title}</h3>
          <div className="summary-controls" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input 
              type="date"
              className="summary-date-picker"
              value={dateValue}
              onChange={(e) => onDateChange(e.target.value)}
              max={dateKey(new Date())}
              aria-label={`${title} date`}
            />
            <select
              className="summary-shift-select"
              value={shiftValue}
              onChange={(e) => onShiftChange(e.target.value)}
              aria-label={`${title} shift`}
              style={{
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: '#fff',
                cursor: 'pointer',
                outline: 'none',
                color: '#334155'
              }}
            >
              <option value="Day">{t('day')}</option>
              <option value="Night">{t('night')}</option>
            </select>
          </div>
        </div>
        
        <div className="summary-card-body">
          <div className="summary-metric-row" style={{ gap: '1rem' }}>
            <div className="summary-metric-item">
              <span className="metric-label submitted">{language === 'zh' ? 'å·²æäº¤' : 'Submitted'}</span>
              <span className="metric-value submitted">{submittedLines.length} <small>/ {totalLines}</small></span>
            </div>
            <div className="summary-metric-item">
              <span className="metric-label pending-review">{language === 'zh' ? 'å¾…å®¡æ ¸' : 'Pending Review'}</span>
              <span className="metric-value pending-review">{pendingReviewLines.length} <small>/ {submittedLines.length}</small></span>
            </div>
            <div className="summary-metric-item">
              <span className="metric-label approved">{language === 'zh' ? 'å·²æ‰¹å‡†' : 'Approved'}</span>
              <span className="metric-value approved">{approvedLines.length} <small>/ {submittedLines.length}</small></span>
            </div>
            <div className="summary-metric-item">
              <span className="metric-label notfilled">{language === 'zh' ? 'æœªæäº¤' : 'Not Filled'}</span>
              <span className="metric-value notfilled">{notFilledLines.length} <small>/ {totalLines}</small></span>
            </div>
            <div className="summary-progress-ring-container">
              <svg className="progress-ring" width="56" height="56">
                <circle className="progress-ring-bg" stroke="#f1f5f9" strokeWidth="5" fill="transparent" r="22" cx="28" cy="28"/>
                <circle 
                  className="progress-ring-fill" 
                  stroke={colorThemeClass === 'tech-theme' ? '#415fff' : '#0ea5e9'} 
                  strokeWidth="5" 
                  fill="transparent" 
                  r="22" 
                  cx="28" 
                  cy="28"
                  style={{ 
                    strokeDasharray: `${2 * Math.PI * 22}`, 
                    strokeDashoffset: `${2 * Math.PI * 22 * (1 - progressPercent / 100)}` 
                  }}
                />
              </svg>
              <span className="progress-percent">{progressPercent}%</span>
            </div>
          </div>
          
          <div className="summary-line-breakdown">
            <div className="line-breakdown-group">
              <span className="breakdown-label submitted">
                {language === 'zh' ? 'å·²æäº¤:' : 'Submitted:'}
              </span>
              <div className="line-chips-container">
                {submittedLines.length > 0 ? (
                  submittedLines.map(line => (
                    <span key={line} className="line-chip submitted">{line}</span>
                  ))
                ) : (
                  <span className="empty-chips-label">{t('rep_summary_empty')}</span>
                )}
              </div>
            </div>

            <div className="line-breakdown-group">
              <span className="breakdown-label pending-review">
                {language === 'zh' ? 'å¾…å®¡æ ¸:' : 'Pending Review:'}
              </span>
              <div className="line-chips-container">
                {pendingReviewLines.length > 0 ? (
                  pendingReviewLines.map(line => (
                    <span key={line} className="line-chip pending-review">{line}</span>
                  ))
                ) : (
                  <span className="empty-chips-label">{t('rep_summary_empty')}</span>
                )}
              </div>
            </div>

            <div className="line-breakdown-group">
              <span className="breakdown-label approved">
                {language === 'zh' ? 'å·²æ‰¹å‡†:' : 'Approved:'}
              </span>
              <div className="line-chips-container">
                {approvedLines.length > 0 ? (
                  approvedLines.map(line => (
                    <span key={line} className="line-chip approved">{line}</span>
                  ))
                ) : (
                  <span className="empty-chips-label">{t('rep_summary_empty')}</span>
                )}
              </div>
            </div>

            <div className="line-breakdown-group">
              <span className="breakdown-label notfilled">
                {language === 'zh' ? 'æœªæäº¤:' : 'Not Filled:'}
              </span>
              <div className="line-chips-container">
                {notFilledLines.length > 0 ? (
                  notFilledLines.map(line => (
                     <span key={line} className="line-chip notfilled">{line}</span>
                  ))
                ) : (
                  <span className="empty-chips-label">{t('rep_summary_empty')}</span>
                )}
              </div>
            </div>
 
            {notInstLines && notInstLines.length > 0 && (
              <div className="line-breakdown-group">
                <span className="breakdown-label not-installed-label">
                  {language === 'zh' ? 'æœªå®‰è£…:' : 'Not Installed:'}
                </span>
                <div className="line-chips-container">
                  {notInstLines.map(line => (
                    <span key={line} className="line-chip not-installed-chip">{line}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => key !== 'sort' && value !== '');

  return (
    <section className="reports-container">
      <div className="reports-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>{t('rep_title')}</h1>
          <p>{language === 'zh' ? 'å­˜å‚¨åœ¨ç³»ç»ŸåŽå°çš„è¯¦ç»†ç‚¹æ£€æ£€éªŒè®°å½•ã€‚' : 'Detailed records stored in the backend.'}</p>
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b', textAlign: 'right', marginTop: '6px' }}>
          Doc No. - INWJZ1-42026050500004
        </div>
      </div>

      {/* â”€â”€ Summary Dashboard Panel â”€â”€ */}
      <div className="reports-summary-dashboard">
        {renderSummaryCard(t('rep_summary_checklist'), techTodayDoneLines, techPendingReviewLines, techApprovedLines, techTodayPendingLines, notInstalledLines, 'tech-theme', techSummaryDate, setTechSummaryDate, techSummaryShift, setTechSummaryShift)}
        {renderSummaryCard(t('rep_summary_checkpoint'), funcTodayDoneLines, funcPendingReviewLines, funcApprovedLines, funcTodayPendingLines, notInstalledLines, 'func-theme', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}
      </div>

      <div className="report-segmented-toggle">
        <button
          type="button"
          className={`toggle-btn ${reportType === 'checklist' ? 'active' : ''}`}
          onClick={() => setReportType('checklist')}
        >
          {t('rep_toggle_checklist')}
        </button>
        <button
          type="button"
          className={`toggle-btn ${reportType === 'checkpoint' ? 'active' : ''}`}
          onClick={() => setReportType('checkpoint')}
        >
          {t('rep_toggle_checkpoint')}
        </button>
        <button
          type="button"
          className={`toggle-btn ${reportType === 'changeover' ? 'active' : ''}`}
          onClick={() => setReportType('changeover')}
        >
          {language === 'zh' ? 'æ¢çº¿è®°å½•è¡¨' : 'Changeover Checksheet'}
        </button>
        <button
          type="button"
          className={`toggle-btn ${reportType === 'laser_changeover' ? 'active' : ''}`}
          onClick={() => setReportType('laser_changeover')}
        >
          {language === 'zh' ? 'é•­é›•æ¢çº¿' : 'Laser Changeover'}
        </button>
      </div>

      <div className="report-filters">
        <label>{t('rep_filter_from')}<input type="date" name="from" value={filters.from} max={filters.to || undefined} onChange={updateFilter} /></label>
        <label>{t('rep_filter_to')}<input type="date" name="to" value={filters.to} min={filters.from || undefined} onChange={updateFilter} /></label>
        <label>{t('rep_filter_line')}<select name="line" value={filters.line} onChange={updateFilter}><option value="">{language === 'zh' ? 'å…¨éƒ¨çº¿åˆ«' : 'All lines'}</option>{allLineOptions.map(line => <option key={line} value={line}>{line}</option>)}</select></label>
        <label>{t('rep_filter_shift')}<select name="shift" value={filters.shift} onChange={updateFilter}><option value="">{language === 'zh' ? 'å…¨éƒ¨ç­æ¬¡' : 'All shifts'}</option>{shiftOptions.map(shift => <option key={shift} value={shift}>{shift === 'Day' ? t('day') : t('night')}</option>)}</select></label>
        <label>{t('rep_filter_group')}<select name="group" value={filters.group} onChange={updateFilter}><option value="">{language === 'zh' ? 'å…¨éƒ¨ç­ç»„' : 'All groups'}</option>{groupOptions.map(group => <option key={group} value={group}>{group}</option>)}</select></label>
        <label>
          {language === 'zh' ? 'çŠ¶æ€' : 'Status'}
          <select name="status" value={filters.status} onChange={updateFilter}>
            <option value="">{language === 'zh' ? 'å…¨éƒ¨çŠ¶æ€' : 'All statuses'}</option>
            <option value="Production">{language === 'zh' ? 'å·²æäº¤(ç”Ÿäº§)' : 'Production'}</option>
            {reportType !== 'changeover' && <option value="Line Stop">{language === 'zh' ? 'å·²æäº¤(åœçº¿)' : 'Line Stop'}</option>}
            <option value="Pending Review">{language === 'zh' ? 'å¾…å®¡æ ¸' : 'Pending Review'}</option>
            <option value="Disapproved">{language === 'zh' ? 'å·²é©³å›ž' : 'Disapproved'}</option>
            {reportType !== 'changeover' && <option value="Not Filled">{language === 'zh' ? 'æœªæäº¤' : 'Not Filled'}</option>}
          </select>
        </label>
        <label>
          {language === 'zh' ? 'æŽ’åºæ–¹å¼' : 'Sort By'}
          <select name="sort" value={filters.sort} onChange={updateFilter}>
            <option value="latest">{language === 'zh' ? 'æœ€æ–°æäº¤' : 'Latest Submissions'}</option>
            <option value="line_asc">{language === 'zh' ? 'çº¿åˆ«å‡åº' : 'Line Ascending'}</option>
          </select>
        </label>
        {hasActiveFilters && (
          <button className="clear-filters" type="button" onClick={() => setFilters({ from: '', to: '', line: '', shift: '', group: '', status: '', sort: 'latest' })}>
            âœ• {t('clear')}
          </button>
        )}
      </div>

      {!loading && !error && (
        <div className="report-meta-bar">
          <span className="result-count-badge">
            {language === 'zh' 
              ? <span>æ˜¾ç¤ºç¬¬ <strong>{filteredRows.length}</strong> æ¡ï¼Œå…± {rows.length} æ¡è®°å½•</span>
              : <span>Showing <strong>{filteredRows.length}</strong> of {rows.length} entries</span>
            }
          </span>
          <div className="export-header-action">
            <div className="export-dropdown-wrapper" onMouseLeave={() => setShowExport(false)}>
              <button
                type="button"
                className="export-btn-trigger"
                disabled={!filteredRows.length}
                onClick={() => setShowExport(!showExport)}
              >
                <svg className="download-icon" viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: '8px' }}>
                  <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
                </svg>
                {t('rep_btn_export')}
              </button>
              {showExport && (
                <div className="export-dropdown-menu">
                  <button type="button" className="export-menu-item" onClick={() => triggerExport('csv')}>
                    <svg viewBox="0 0 24 24" width="14" height="14" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                    {t('rep_opt_csv')} {selectedRows.length > 0 ? `(${selectedRows.length})` : ''}
                  </button>
                  <button type="button" className="export-menu-item" onClick={() => triggerExport('pdf')}>
                    <svg viewBox="0 0 24 24" width="14" height="14" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V8H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V8H15c.83 0 1.5.67 1.5 1.5v2zm4.5-3H19v1h1.5V11H19v2h-1.5V8H21v1.5zM9 9.5h1v-1H9v1zm5.5 2h1v-2h-1v2zM2 6v14c0 1.1.9 2 2 2h14v-1.5H4V6H2z"/>
                    </svg>
                    {t('rep_opt_pdf')} {selectedRows.length > 0 ? `(${selectedRows.length})` : ''}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {loading && <div className="report-state">{t('rep_loading')}</div>}
      {error && <div className="report-state error">{t('error')}: {error}</div>}
      {!loading && !error && rows.length === 0 && <div className="report-state">{language === 'zh' ? 'æš‚æ— å·²æäº¤çš„æ£€æŸ¥è®°å½•ã€‚' : 'No records have been submitted yet.'}</div>}
      {!loading && !error && rows.length > 0 && filteredRows.length === 0 && <div className="report-state">{t('rep_empty')}</div>}
      {!loading && !error && filteredRows.length > 0 && (
        <div className="report-table-wrap">
          {reportType === 'checkpoint' 
            ? <CheckpointReport rows={filteredRows} checkpointColumns={checkpointColumns} checkpointGroups={checkpointGroups} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} isSuperAdmin={isSuperAdmin} onDelete={handleDeleteClick} getEngineerDisplay={getEngineerDisplay} selectedRows={selectedRows} onSelectRow={handleSelectRow} onSelectAll={handleSelectAll} /> 
            : reportType === 'laser_changeover'
            ? <LaserChangeoverReport rows={filteredRows} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} isSuperAdmin={isSuperAdmin} onDelete={handleDeleteClick} getEngineerDisplay={getEngineerDisplay} selectedRows={selectedRows} onSelectRow={handleSelectRow} onSelectAll={handleSelectAll} />
            : reportType === 'changeover'
            ? <ChangeoverReport rows={filteredRows} changeoverColumns={changeoverColumns} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} isSuperAdmin={isSuperAdmin} onDelete={handleDeleteClick} getEngineerDisplay={getEngineerDisplay} selectedRows={selectedRows} onSelectRow={handleSelectRow} onSelectAll={handleSelectAll} />
            : <ChecklistReport rows={filteredRows} checklistColumns={checklistColumns} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} isSuperAdmin={isSuperAdmin} onDelete={handleDeleteClick} getEngineerDisplay={getEngineerDisplay} selectedRows={selectedRows} onSelectRow={handleSelectRow} onSelectAll={handleSelectAll} />
          }
        </div>
      )}

      {/* Custom Export Confirmation Modal */}
      {exportConfirm.show && (
        <div className="global-modal-overlay">
          <div className="modal-content submit-confirm-modal">
            <div className="confirm-modal-icon-wrapper">
              <div className="confirm-modal-icon">
                ðŸ“¥
              </div>
            </div>
            
            <div className="confirm-modal-header">
              <h2>{language === 'zh' ? 'ç¡®è®¤å¯¼å‡ºæ•°æ®' : 'Confirm Data Export'}</h2>
              <p>{language === 'zh' ? 'è¯·æ ¸å¯¹ä»¥ä¸‹å¯¼å‡ºé…ç½®ï¼Œç¡®è®¤æ— è¯¯åŽä¸‹è½½æ–‡ä»¶' : 'Please verify the following export configurations before downloading'}</p>
            </div>

            <div className="confirm-details-table">
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? 'æŠ¥è¡¨ç±»åž‹' : 'Report Type'}</span>
                <span className="confirm-detail-value">{reportTitle(reportType)}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? 'æ–‡ä»¶æ ¼å¼' : 'File Format'}</span>
                <span className="confirm-detail-value" style={{ fontWeight: 'bold', color: '#415fff' }}>{exportConfirm.format.toUpperCase()}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? 'ç­›é€‰è®°å½•æ•°' : 'Filtered Records'}</span>
                <span className="confirm-detail-value" style={{ color: '#027a48', fontWeight: 600 }}>{filteredRows.length} {language === 'zh' ? 'æ¡' : 'records'}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? 'çº¿åˆ«ç­›é€‰' : 'Line Filter'}</span>
                <span className="confirm-detail-value">{filters.line || (language === 'zh' ? 'å…¨éƒ¨' : 'All')}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? 'ç­æ¬¡ç­›é€‰' : 'Shift Filter'}</span>
                <span className="confirm-detail-value">
                  {filters.shift ? (filters.shift === 'Day' ? t('day') : t('night')) : (language === 'zh' ? 'å…¨éƒ¨' : 'All')}
                </span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? 'ç­ç»„ç­›é€‰' : 'Group Filter'}</span>
                <span className="confirm-detail-value">{filters.group || (language === 'zh' ? 'å…¨éƒ¨' : 'All')}</span>
              </div>
              <div className="confirm-detail-item" style={{ gridColumn: 'span 2' }}>
                <span className="confirm-detail-label">{language === 'zh' ? 'æ—¥æœŸèŒƒå›´' : 'Date Range'}</span>
                <span className="confirm-detail-value" style={{ fontSize: '0.88rem' }}>
                  {filters.from || 'â€”'} {language === 'zh' ? 'è‡³' : 'to'} {filters.to || 'â€”'}
                </span>
              </div>
            </div>

            <div className="confirm-modal-actions">
              <button 
                type="button" 
                className="confirm-btn-cancel" 
                onClick={() => setExportConfirm({ show: false, format: '' })}
              >
                {language === 'zh' ? 'å–æ¶ˆ' : 'Cancel'}
              </button>
              <button 
                type="button" 
                className="confirm-btn-submit-active"
                onClick={executeExport}
              >
                {language === 'zh' ? 'ç¡®è®¤ä¸‹è½½' : 'Download File'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteConfirm}
        title={language === 'zh' ? 'åˆ é™¤è®°å½•' : 'Delete Record'}
        message={
          language === 'zh'
            ? 'æ‚¨ç¡®å®šè¦åˆ é™¤æ­¤æ¡ç‚¹æ£€è®°å½•å—ï¼Ÿæ­¤æ“ä½œå°†æ°¸ä¹…ç§»é™¤è¯¥æ¡æ•°æ®ä¸”æ— æ³•æ’¤é”€ï¼'
            : 'Are you sure you want to delete this record? This action will permanently remove it and cannot be undone!'
        }
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm(null)}
        confirmText={language === 'zh' ? 'ç¡®è®¤åˆ é™¤' : 'Delete'}
        cancelText={language === 'zh' ? 'å–æ¶ˆ' : 'Cancel'}
        type="danger"
      />
    </section>
  );
}

function ChangeoverReport({ rows, changeoverColumns, t, language, formatDate, formatDateTime, isSuperAdmin, onDelete, getEngineerDisplay, selectedRows, onSelectRow, onSelectAll }) {
  const [expandedRow, setExpandedRow] = useState(null);
  
  const toggleRow = id => {
    setExpandedRow(prev => prev === id ? null : id);
  };

  const getFieldLabel = (key) => {
    const col = changeoverColumns.find(c => c[1] === key);
    return col ? col[0] : key;
  };

  const formatValue = (val) => {
    if (val === true || val === 'true') return 'True';
    if (val === false || val === 'false') return 'False';
    if (val === 'Yes' || val === 'âˆš') return 'âˆš';
    if (val === 'No' || val === '\\') return '\\';
    if (!val) return 'â€”';
    return val;
  };

  return (
    <table className="report-table" style={{ minWidth: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '40px', textAlign: 'center' }}>
            <input 
              type="checkbox" 
              className="row-checkbox"
              onChange={onSelectAll}
              checked={selectedRows.length === rows.length && rows.length > 0}
              aria-label="Select all"
            />
          </th>
          {changeoverColumns.map(([label]) => <th key={label}>{label}</th>)}
          {isSuperAdmin && <th style={{ width: '60px', textAlign: 'center' }}>{t('actions')}</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          const isExpanded = expandedRow === row.id;
          const isLineStop = row.status === 'Line Stop';
          const totalColSpan = changeoverColumns.length + (isSuperAdmin ? 2 : 1);

          const renderModifyIndicator = (fields) => {
            if (!row.engineer_modified_fields) return null;
            try {
              const diffs = JSON.parse(row.engineer_modified_fields);
              const hasMod = diffs.some(d => fields.includes(d.field));
              if (hasMod) {
                return <span style={{ marginLeft: '4px', color: '#eab308', fontSize: '0.8rem' }} title={language === 'zh' ? 'å·¥ç¨‹å¸ˆå·²ä¿®æ”¹' : 'Modified by Engineer'}>âœï¸</span>;
              }
            } catch(e) {}
            return null;
          };

          const renderCheckBadge = (value, fieldName) => {
            if (!value) return null;
            const isOk = ['Yes', 'âˆš', 'True'].includes(value);
            return (
              <span className={`status-badge-inline ${isOk ? 'ok' : 'fail'}`} title={fieldName}>
                {isOk ? 'âˆš' : '\\'}
              </span>
            );
          };

          const mainRow = (
            <tr key={row.id} className={isExpanded ? 'expanded' : ''} onClick={(e) => {
              if (e.target.type === 'checkbox') return;
              toggleRow(row.id);
            }}>
              <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  className="row-checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => onSelectRow(row.id)}
                  aria-label="Select row"
                />
              </td>
              <td style={{ fontWeight: 600 }}>{formatDate(row.date)}</td>
              <td><span className="line-tag">{row.line}</span></td>
              <td><span className="shift-tag">{row.group_name}</span></td>
              <td>{row.shift === 'Day' ? t('day') : (row.shift === 'Night' ? t('night') : row.shift)}</td>
              <td>
                <span className="line-tag" style={{ background: '#f3e8ff', color: '#7e22ce', border: '1px solid #d8b4fe' }}>
                  {row.changeover_type || 'â€”'}
                </span>
              </td>
              <td>
                {(() => {
                  if (row.status === 'Not Filled') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                      {language === 'zh' ? 'æœªæäº¤' : 'Not Filled'}
                    </span>;
                  }
                  if (row.approval_status === 'ENG_PENDING') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontWeight: 700 }}>
                      â³ {language === 'zh' ? 'å¾…å®¡æ ¸' : 'Review'}
                    </span>;
                  }
                  if (row.approval_status === 'DISAPPROVED') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                      âŒ {language === 'zh' ? 'è¢«é©³å›ž' : 'Disapproved'}
                    </span>;
                  }
                  return <span className="status-mark checked" style={{ minWidth: '95px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
                    ðŸŸ¢ {language === 'zh' ? 'å·²æ‰¹å‡†' : 'Approved'}
                  </span>;
                })()}
              </td>
              <td>{row.model_name || '-'}</td>
              <td>{row.model_code || '-'}</td>

              {/* Dynamic rendering of the rest of the columns based on changeoverColumns definition */}
              {changeoverColumns.slice(8).map(([label, key]) => {
                // Handle designated engineer
                if (key === 'designated_engineer_id') {
                  return <td key={key}>{getEngineerDisplay(row[key])}</td>;
                }
                
                return (
                  <td key={key}>
                    {row.status === 'Not Filled' || isLineStop ? 'â€”' : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {['Yes', 'No', 'âˆš', '\\', '/', 'N/A'].includes(row[key]) ? (
                          renderCheckBadge(row[key], label)
                        ) : (
                          <span>{key === 'created_at' ? formatDateTime(row[key]) : (row[key] || 'â€”')}</span>
                        )}
                        {renderModifyIndicator([key])}
                      </div>
                    )}
                  </td>
                );
              })}
              
              {isSuperAdmin && (
                <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                  <button 
                    type="button"
                    className="btn-delete-report-row" 
                    onClick={() => onDelete(row.id, 'changeover')}
                    title={language === 'zh' ? 'åˆ é™¤è®°å½•' : 'Delete Record'}
                  >
                    ðŸ—‘ï¸
                  </button>
                </td>
              )}
            </tr>
          );

          if (!isExpanded) return [mainRow];

          const detailRow = (
            <tr key={`${row.id}-details`} className="expanded-row-details">
              <td colSpan={totalColSpan} style={{ background: '#f8fafc', padding: '2rem', borderBottom: '1px solid #e2e8f0', boxShadow: 'inset 0 4px 6px -4px rgba(0,0,0,0.05)' }}>
                <div className="expansion-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'left', background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? 'æŒ‡å®šå·¥ç¨‹å¸ˆ' : 'Designated Engineer'}
                    </strong>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>
                      {getEngineerDisplay(row.designated_engineer_id)}
                    </span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? 'æŠ€æœ¯å‘˜å¤‡æ³¨' : 'Technician Remarks'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                      {row.remarks || 'â€”'}
                    </span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? 'å·¥ç¨‹å¸ˆå®¡æ ¸å¤‡æ³¨' : 'Engineer Remarks'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                      {row.engineer_remarks || 'â€”'}
                    </span>
                  </div>
                  
                  {/* Show the 24 Changeover Check Items */}
                  <div style={{ gridColumn: 'span 3', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                    <strong style={{ display: 'block', color: '#0f172a', fontSize: '0.9rem', marginBottom: '1.25rem', fontWeight: 700 }}>
                      {language === 'zh' ? 'ðŸ“‹ æ¢çº¿æ£€æŸ¥é¡¹ç›®æ˜Žç»†' : 'ðŸ“‹ Changeover Check Items Details'}
                    </strong>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                      {[
                        [language === 'zh' ? '1. SPIé’¢ç½‘åŽç¼€ååŒ¹é…' : '1. SPI Stencil Match', 'spi_steel_stencil_suffix_match'],
                        [language === 'zh' ? '2. SPIç¨‹åºè¿žæ¿æµæ°´å·åŒ¹é…' : '2. SPI Subpanel Match', 'spi_program_subpanel_serial_match'],
                        [language === 'zh' ? '3. SPIå¤æµ‹180åº¦æžæ€§' : '3. SPI Recheck Polarity', 'spi_recheck_pcab_polarity'],
                        [language === 'zh' ? '4. SPIå‚æ•°è®¾ç½®ç¡®è®¤' : '4. SPI Parameter Check', 'spi_confirm_parameter_settings'],
                        [language === 'zh' ? '5. SPIæ‰«ç åŠŸèƒ½å¼€å¯' : '5. SPI Read Barcode', 'spi_read_barcode_on'],
                        [language === 'zh' ? '6. ç‚‰å‰ECOç¡®è®¤' : '6. Pre-AOI ECO', 'pre_aoi_eco_checklists'],
                        [language === 'zh' ? '7. ç‚‰å‰ç¨‹åºæœºç§ç¡®è®¤' : '7. Pre-AOI Program Model', 'pre_aoi_program_model_modify'],
                        [language === 'zh' ? '8. ç‚‰å‰æ–°ç‰©æ–™æµ‹è¯•' : '8. Pre-AOI New Material', 'pre_aoi_vi_program_new_materia'],
                        [language === 'zh' ? '9. ç‚‰å‰è¿žæµæŠ¥è­¦' : '9. Pre-AOI Alarm Limit', 'pre_aoi_limit_defective_alarm'],
                        [language === 'zh' ? '10. ç‚‰å‰è£¸æ¿æµ‹è¯•' : '10. Pre-AOI Bare Board', 'pre_aoi_test_program_bare_pcba'],
                        [language === 'zh' ? '11. ç‚‰å‰BOTè¿žæ¿æµæ°´å·' : '11. Pre-AOI Bot Subpanel', 'pre_aoi_bot_program_serial_number'],
                        [language === 'zh' ? '12. ç‚‰å‰æ‰«ç åŠŸèƒ½å¼€å¯' : '12. Pre-AOI Read Barcode', 'pre_aoi_read_barcode_on'],
                        [language === 'zh' ? '13a. ç‚‰å‰ç‰©æ–™ç¡®è®¤' : '13a. Pre-AOI Mount Confirm', 'pre_aoi_confirm_materials_mounted'],
                        [language === 'zh' ? '13b. ç‚‰å‰åˆ é™¤æ‰€æœ‰æ¡†' : '13b. Pre-AOI Delete Zones', 'pre_aoi_delete_all_zones'],
                        [language === 'zh' ? '14. ç‚‰åŽè®¾å¤‡åž‹å·' : '14. Post-AOI Equipment', 'post_aoi_equipment_model'],
                        [language === 'zh' ? '15. ç‚‰åŽECOç¡®è®¤' : '15. Post-AOI ECO', 'post_aoi_eco_checklists'],
                        [language === 'zh' ? '16. ç‚‰åŽç¨‹åºæœºç§ç¡®è®¤' : '16. Post-AOI Program Model', 'post_aoi_program_model_modify'],
                        [language === 'zh' ? '17. ç‚‰åŽå¤æµ‹èŠ¯ç‰‡/æ ‡å‡†ä»¶' : '17. Post-AOI Recheck Chips', 'post_aoi_recheck_chips_standard_models'],
                        [language === 'zh' ? '18. ç‚‰åŽæ‰«ææ•´æ¿å›¾ç‰‡' : '18. Post-AOI Scan Board', 'post_aoi_scan_board_picture'],
                        [language === 'zh' ? '19. ç‚‰åŽè¿žæµæŠ¥è­¦' : '19. Post-AOI Alarm Limit', 'post_aoi_limit_defective_alarm'],
                        [language === 'zh' ? '20. ç‚‰åŽå±è”½ç½©æžæ€§' : '20. Post-AOI Shield Polarity', 'post_aoi_confirm_polarity_shield'],
                        [language === 'zh' ? '21. ç‚‰åŽBOTè¿žæ¿æµæ°´å·' : '21. Post-AOI Bot Subpanel', 'post_aoi_bot_program_serial_number'],
                        [language === 'zh' ? '22. ç‚‰åŽæ ‡å‡†ä»¶æ¬¡æ•°' : '22. Post-AOI Standard Times', 'post_aoi_registered_standard_models_times'],
                        [language === 'zh' ? '23. è®¾å¤‡å¯¼è½¨å®½åº¦' : '23. Others Width Adjust', 'others_adjust_widths'],
                        [language === 'zh' ? '24. PCBæ‰«ç æ ‡å‡†' : '24. Others PCB Barcode', 'others_add_test_standard_pcb_barcode']
                      ].map(([label, key]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '0.85rem' }}>
                          <span style={{ color: '#475569', fontWeight: 500 }}>{label}</span>
                          <span style={{ fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '6px', background: ['âœ”ï¸', 'Yes', 'True', 'âˆš'].includes(row[key]) ? '#d1fae5' : ['âŒ', 'No', '\\'].includes(row[key]) ? '#fee2e2' : 'transparent', color: ['âœ”ï¸', 'Yes', 'True', 'âˆš'].includes(row[key]) ? '#047857' : ['âŒ', 'No', '\\'].includes(row[key]) ? '#b91c1c' : '#475569' }}>
                            {row[key] || 'â€”'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {row.engineer_modified_fields && (
                    <div style={{ gridColumn: 'span 3', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                      <strong style={{ display: 'block', color: '#b91c1c', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
                        {language === 'zh' ? 'âš ï¸ å·¥ç¨‹å¸ˆä¿®æ”¹å†…å®¹è®°å½•' : 'âš ï¸ Engineer Modification History'}
                      </strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                        {(() => {
                          try {
                            const diffs = JSON.parse(row.engineer_modified_fields);
                            return diffs.map((diff, index) => (
                              <div key={index} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px rgba(15,23,42,0.02)' }}>
                                <span style={{ fontWeight: 700, color: '#0f172a' }}>{getFieldLabel(diff.field)}:</span>
                                <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontStyle: 'italic' }}>{formatValue(diff.from)}</span>
                                <span style={{ color: '#3b82f6', fontWeight: 900 }}>â†’</span>
                                <strong style={{ color: '#16a34a', background: '#f0fdf4', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>{formatValue(diff.to)}</strong>
                              </div>
                            ));
                          } catch(e) {
                            return <span>{row.engineer_modified_fields}</span>;
                          }
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );
          
          return [mainRow, detailRow];
        })}
      </tbody>
    </table>
  );
}

function CheckpointReport({ rows, checkpointColumns, checkpointGroups, t, language, formatDate, formatDateTime, isSuperAdmin, onDelete, getEngineerDisplay, selectedRows, onSelectRow, onSelectAll }) {
  const [expandedRowId, setExpandedRowId] = React.useState(null);
  const totalColSpan = isSuperAdmin ? 8 : 7;

  const renderLineStatus = (status) => {
    if (status === 'Not Filled' || status === 'Line Not Installed') return 'â€”';
    if (status === 'Line Stop') {
      return (
        <span className="status-mark" style={{ minWidth: '85px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
          ðŸ›‘ {language === 'zh' ? 'åœçº¿' : 'Stop'}
        </span>
      );
    }
    return (
      <span className="status-mark checked" style={{ minWidth: '85px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
        ðŸŸ¢ {language === 'zh' ? 'ç”Ÿäº§' : 'Production'}
      </span>
    );
  };

  const getFieldLabel = (field) => {
    const zhLabels = {
      pre_aoi_program_full_name: 'Pre-AOI å®Œæ•´ç¨‹åºå',
      stencil_serial_no_b_side: 'é’¢ç½‘ç¼–å· Bé¢',
      stencil_serial_no_a_side: 'é’¢ç½‘ç¼–å· Aé¢',
      barcode_read_a_layer: 'Aé¢ Laser æ¡ç è¯»å–',
      barcode_read_a_spi: 'Aé¢ SPI æ¡ç è¯»å–',
      barcode_read_a_pre_aoi: 'Aé¢ Pre-AOI æ¡ç è¯»å–',
      barcode_read_b_layer: 'Bé¢ Laser æ¡ç è¯»å–',
      barcode_read_b_spi: 'Bé¢ SPI æ¡ç è¯»å–',
      barcode_read_b_pre_aoi: 'Bé¢ Pre-AOI æ¡ç è¯»å–',
      workorder_info_pre_aoi: 'Pre-AOI å·¥å•ä¿¡æ¯',
      workorder_info_post_aoi: 'Post-AOI å·¥å•ä¿¡æ¯',
      aoi_scan_tools_workorder_traceability: 'æ‰«ç å·¥å…·å·¥å•è¿½æº¯',
      status: 'çº¿åˆ«çŠ¶æ€',
      responsible_person: 'è´£ä»»äºº',
      time: 'æ£€æµ‹æ—¶é—´',
      remarks: 'æŠ€æœ¯å‘˜å¤‡æ³¨',
      designated_engineer_id: 'æŒ‡å®šå·¥ç¨‹å¸ˆ'
    };

    const enLabels = {
      pre_aoi_program_full_name: 'Pre-AOI Program Name',
      stencil_serial_no_b_side: 'Stencil No. B-Side',
      stencil_serial_no_a_side: 'Stencil No. A-Side',
      barcode_read_a_layer: 'A-Side Laser Barcode',
      barcode_read_a_spi: 'A-Side SPI Barcode',
      barcode_read_a_pre_aoi: 'A-Side Pre-AOI Barcode',
      barcode_read_b_layer: 'B-Side Laser Barcode',
      barcode_read_b_spi: 'B-Side SPI Barcode',
      barcode_read_b_pre_aoi: 'B-Side Pre-AOI Barcode',
      workorder_info_pre_aoi: 'Pre-AOI Workorder',
      workorder_info_post_aoi: 'Post-AOI Workorder',
      aoi_scan_tools_workorder_traceability: 'Scan Tool Traceability',
      status: 'Line Status',
      responsible_person: 'Responsible Person',
      time: 'Check Time',
      remarks: 'Technician Remarks',
      designated_engineer_id: 'Designated Engineer'
    };

    if (field.includes('_')) {
      const parts = field.split('_');
      return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }

    return language === 'zh' ? (zhLabels[field] || field) : (enLabels[field] || field);
  };

  const formatValue = (val) => {
    if (val === '' || val === null || val === undefined) return 'â€”';
    if (val === 'Line Stop') return language === 'zh' ? 'åœçº¿' : 'Line Stop';
    if (val === 'Production') return language === 'zh' ? 'ç”Ÿäº§' : 'Production';
    return String(val);
  };

  return <table className="report-table detailed-checkpoint-report" style={{ minWidth: '100%' }}>
    <thead>
      <tr>
        <th style={{ width: '40px', textAlign: 'center' }}>
          <input 
            type="checkbox" 
            className="row-checkbox"
            onChange={onSelectAll}
            checked={selectedRows.length === rows.length && rows.length > 0}
            aria-label="Select all"
          />
        </th>
        <th className="sticky-date">{language === 'zh' ? 'çº¿åˆ«ä¸Žæ—¥æœŸ' : 'Line & Date'}</th>
        <th>{language === 'zh' ? 'çº¿åˆ«çŠ¶æ€' : 'Line Status'}</th>
        <th>{language === 'zh' ? 'æ–‡æ¡£çŠ¶æ€' : 'Doc Status'}</th>
        <th>{language === 'zh' ? 'æäº¤ä¸Žå®¡æ‰¹è®°å½•' : 'Audit Timeline'}</th>
        <th>{language === 'zh' ? 'è´£ä»»äººä¸Žæ£€æµ‹æ—¶é—´' : 'Responsible & Time'}</th>
        <th>{language === 'zh' ? 'åŠŸèƒ½æ£€æµ‹é€šè¿‡çŽ‡' : 'Function Checks'}</th>
        {isSuperAdmin && <th style={{ textAlign: 'center' }}>{language === 'zh' ? 'æ“ä½œ' : 'Actions'}</th>}
      </tr>
    </thead>
    <tbody>{rows.flatMap(row => {
      const isExpanded = expandedRowId === row.id;

      const renderModifyIndicator = (fieldsList) => {
        if (!row.engineer_modified_fields) return null;
        try {
          const mods = JSON.parse(row.engineer_modified_fields);
          const isMod = mods.some(m => fieldsList.includes(m.field));
          if (!isMod) return null;
          return (
            <span 
              title={language === 'zh' ? 'å·¥ç¨‹å¸ˆä¿®æ”¹è¿‡æ­¤é¡¹' : 'Modified by Engineer'} 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                background: '#eff6ff', 
                color: '#2563eb', 
                border: '1px solid #bfdbfe', 
                padding: '0.15rem 0.35rem', 
                borderRadius: '6px', 
                fontSize: '0.68rem', 
                fontWeight: 700,
                marginLeft: '0.4rem',
                lineHeight: 1,
                verticalAlign: 'middle',
                whiteSpace: 'nowrap'
              }}
            >
              âœï¸ {language === 'zh' ? 'å·²ä¿®æ”¹' : 'Edited'}
            </span>
          );
        } catch(e) {
          return null;
        }
      };
      
      const totalChecks = checkpointColumns.length;
      const passedChecks = checkpointColumns.reduce((count, col) => count + (row[col.key] ? 1 : 0), 0);

      const mainRow = (
        <tr 
          key={row.id} 
          onClick={(e) => {
            if (e.target.type === 'checkbox') return;
            if (row.status !== 'Not Filled' && row.status !== 'Line Not Installed') {
              setExpandedRowId(isExpanded ? null : row.id);
            }
          }}
          style={{ cursor: (row.status !== 'Not Filled' && row.status !== 'Line Not Installed') ? 'pointer' : 'default' }}
          className={isExpanded ? 'expanded-parent-row' : ''}
        >
          <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <input 
              type="checkbox" 
              className="row-checkbox"
              checked={selectedRows.includes(row.id)}
              onChange={() => onSelectRow(row.id)}
              aria-label="Select row"
            />
          </td>
          <td className="sticky-date">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>Line {row.line}</span>
              <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{formatDate(row.date)} {row.group_name && `| ${row.group_name}`}</span>
              <span className={`shift-tag ${row.shift}`} style={{ fontSize: '0.72rem', alignSelf: 'flex-start', marginTop: '0.2rem', padding: '0.1rem 0.35rem', borderRadius: '4px', background: row.shift === 'Day' ? '#eff6ff' : '#f8fafc', color: row.shift === 'Day' ? '#1d4ed8' : '#334155', border: '1px solid', borderColor: row.shift === 'Day' ? '#bfdbfe' : '#e2e8f0', fontWeight: 700 }}>
                {row.shift === 'Day' ? t('day') : t('night')}
              </span>
            </div>
          </td>
          <td>
            {renderLineStatus(row.status)}
          </td>
          <td>
            {(() => {
              if (row.status === 'Line Not Installed') {
                return <span className="status-mark" style={{ minWidth: '95px', background: '#f8fafc', color: '#64748b', border: '1px solid #cbd5e1', fontStyle: 'italic' }}>
                  {language === 'zh' ? 'æœªå®‰è£…' : 'Not Installed'}
                </span>;
              }
              if (row.status === 'Not Filled') {
                return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                  {language === 'zh' ? 'æœªæäº¤' : 'Not Filled'}
                </span>;
              }
              if (row.approval_status === 'ENG_PENDING') {
                return <span className="status-mark" style={{ minWidth: '95px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontWeight: 700 }}>
                  â³ {language === 'zh' ? 'å¾…å®¡æ ¸' : 'Review'}
                </span>;
              }
              if (row.approval_status === 'DISAPPROVED') {
                return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                  âŒ {language === 'zh' ? 'è¢«é©³å›ž' : 'Disapproved'}
                </span>;
              }
              return <span className="status-mark checked" style={{ minWidth: '95px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
                ðŸŸ¢ {language === 'zh' ? 'å·²æ‰¹å‡†' : 'Approved'}
              </span>;
            })()}
            {renderModifyIndicator(['status'])}
          </td>
          <td>
            {row.status === 'Not Filled' ? 'â€”' : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.8rem' }}>
                {row.submitted_by && (
                  <span style={{ color: '#334155' }}>
                    ðŸ‘¤ <strong>{language === 'zh' ? 'æäº¤' : 'Sub'}:</strong> {row.submitted_by} 
                    <span style={{ color: '#64748b', fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                      ({formatDateTime(row.created_at)})
                    </span>
                  </span>
                )}
                {row.approval_status === 'APPROVED' && (
                  <span style={{ color: '#166534', fontWeight: 500 }}>
                    âœ“ <strong>{language === 'zh' ? 'å®¡æ‰¹' : 'App'}:</strong> {getEngineerDisplay(row.designated_engineer_id)} 
                    <span style={{ color: '#166534', opacity: 0.8, fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                      ({formatDateTime(row.updated_at)})
                    </span>
                  </span>
                )}
                {row.approval_status === 'DISAPPROVED' && (
                  <span style={{ color: '#b91c1c', fontWeight: 500 }}>
                    âœ— <strong>{language === 'zh' ? 'é©³å›ž' : 'Rej'}:</strong> {getEngineerDisplay(row.designated_engineer_id)} 
                    <span style={{ color: '#b91c1c', opacity: 0.8, fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                      ({formatDateTime(row.updated_at)})
                    </span>
                  </span>
                )}
              </div>
            )}
          </td>
          <td>
            {row.status === 'Not Filled' ? 'â€”' : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', fontSize: '0.82rem' }}>
                <span style={{ color: '#334155', fontWeight: 600 }}>
                  {row.responsible_person}
                  {renderModifyIndicator(['responsible_person'])}
                </span>
                <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                  ðŸ•’ {row.time}
                  {renderModifyIndicator(['time'])}
                </span>
              </div>
            )}
          </td>
          <td>
            {row.status === 'Not Filled' ? 'â€”' : (
              row.status === 'Line Stop' ? (
                <span style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  ðŸ›‘ {t('cl_status_linestop')}
                </span>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ flex: 1, height: '8px', minWidth: '80px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(passedChecks / totalChecks) * 100}%`, height: '100%', background: passedChecks === totalChecks ? '#10b981' : '#f59e0b' }}></div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: passedChecks === totalChecks ? '#059669' : '#d97706' }}>
                    {passedChecks}/{totalChecks} {language === 'zh' ? 'é¡¹é€šè¿‡' : 'Passed'}
                  </span>
                  {renderModifyIndicator(checkpointColumns.map(c => c.key))}
                </div>
              )
            )}
          </td>
          {isSuperAdmin && (
            <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
              <button 
                type="button"
                className="btn-delete-report-row" 
                onClick={() => onDelete(row.id, 'checkpoint')}
                title={language === 'zh' ? 'åˆ é™¤è®°å½•' : 'Delete Record'}
              >
                ðŸ—‘ï¸
              </button>
            </td>
          )}
        </tr>
      );

      if (!isExpanded) return [mainRow];

      const detailRow = (
        <tr key={`${row.id}-details`} className="expanded-row-details">
          <td colSpan={totalColSpan} style={{ background: '#f8fafc', padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <div className="expansion-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
              <div>
                <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  {language === 'zh' ? 'æŒ‡å®šå·¥ç¨‹å¸ˆ' : 'Designated Engineer'}
                </strong>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>
                  {getEngineerDisplay(row.designated_engineer_id)}
                </span>
              </div>
              <div>
                <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  {language === 'zh' ? 'æŠ€æœ¯å‘˜å¤‡æ³¨' : 'Technician Remarks'}
                </strong>
                <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                  {row.remarks || 'â€”'}
                </span>
              </div>
              <div>
                <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  {language === 'zh' ? 'å·¥ç¨‹å¸ˆå®¡æ ¸å¤‡æ³¨' : 'Engineer Remarks'}
                </strong>
                <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                  {row.engineer_remarks || 'â€”'}
                </span>
              </div>
              {row.engineer_modified_fields && (
                <div style={{ gridColumn: 'span 3', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                  <strong style={{ display: 'block', color: '#b91c1c', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
                    {language === 'zh' ? 'âš ï¸ å·¥ç¨‹å¸ˆä¿®æ”¹å†…å®¹è®°å½•' : 'âš ï¸ Engineer Modification History'}
                  </strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {(() => {
                      try {
                        const diffs = JSON.parse(row.engineer_modified_fields);
                        return diffs.map((diff, index) => (
                          <div key={index} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px rgba(15,23,42,0.02)' }}>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{getFieldLabel(diff.field)}:</span>
                            <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontStyle: 'italic' }}>{formatValue(diff.from)}</span>
                            <span style={{ color: '#3b82f6', fontWeight: 900 }}>â†’</span>
                            <strong style={{ color: '#16a34a', background: '#f0fdf4', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>{formatValue(diff.to)}</strong>
                          </div>
                        ));
                      } catch(e) {
                        return <span>{row.engineer_modified_fields}</span>;
                      }
                    })()}
                  </div>
                </div>
              )}
              {row.status !== 'Line Stop' && (
                <div style={{ gridColumn: 'span 3', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '0.5rem' }}>
                  <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>
                    {language === 'zh' ? 'è¯¦ç»†åŠŸèƒ½æ£€æµ‹ç»“æžœ' : 'Detailed Function Check Results'}
                  </strong>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                    {checkpointGroups.map(group => {
                      return (
                        <div key={group.prefix} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.85rem', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                          <strong style={{ display: 'block', fontSize: '0.85rem', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem', marginBottom: '0.5rem' }}>
                            {t('label_' + group.prefix)}
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {group.positions.map(pos => {
                              const checkVal = row[`${group.prefix}_${pos.key}`];
                              return (
                                <div key={pos.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                                  <span style={{ color: '#64748b' }}>{t('cp_th_' + pos.key)}</span>
                                  <span className={`status-mark ${checkVal ? 'checked' : 'not-checked'}`} style={{ minWidth: '40px', padding: '0.1rem 0.35rem', fontSize: '0.72rem', borderRadius: '4px' }}>
                                    {checkVal ? 'âœ“' : 'âœ—'}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      );

      return [mainRow, detailRow];
    })}</tbody>
  </table>;
}

function ChecklistReport({ rows, checklistColumns, t, language, formatDate, formatDateTime, isSuperAdmin, onDelete, getEngineerDisplay, selectedRows, onSelectRow, onSelectAll }) {
  const [expandedRowId, setExpandedRowId] = React.useState(null);
  const totalColSpan = isSuperAdmin ? 10 : 9;

  const renderLineStatus = (status) => {
    if (status === 'Not Filled' || status === 'Line Not Installed') return 'â€”';
    if (status === 'Line Stop') {
      return (
        <span className="status-mark" style={{ minWidth: '85px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
          ðŸ›‘ {language === 'zh' ? 'åœçº¿' : 'Stop'}
        </span>
      );
    }
    return (
      <span className="status-mark checked" style={{ minWidth: '85px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
        ðŸŸ¢ {language === 'zh' ? 'ç”Ÿäº§' : 'Production'}
      </span>
    );
  };

  const getFieldLabel = (field) => {
    const zhLabels = {
      pre_aoi_program_full_name: 'Pre-AOI å®Œæ•´ç¨‹åºå',
      stencil_serial_no_b_side: 'é’¢ç½‘ç¼–å· Bé¢',
      stencil_serial_no_a_side: 'é’¢ç½‘ç¼–å· Aé¢',
      barcode_read_a_layer: 'Aé¢ Laser æ¡ç è¯»å–',
      barcode_read_a_spi: 'Aé¢ SPI æ¡ç è¯»å–',
      barcode_read_a_pre_aoi: 'Aé¢ Pre-AOI æ¡ç è¯»å–',
      barcode_read_b_layer: 'Bé¢ Laser æ¡ç è¯»å–',
      barcode_read_b_spi: 'Bé¢ SPI æ¡ç è¯»å–',
      barcode_read_b_pre_aoi: 'Bé¢ Pre-AOI æ¡ç è¯»å–',
      workorder_info_pre_aoi: 'Pre-AOI å·¥å•ä¿¡æ¯',
      workorder_info_post_aoi: 'Post-AOI å·¥å•ä¿¡æ¯',
      aoi_scan_tools_workorder_traceability: 'æ‰«ç å·¥å…·å·¥å•è¿½æº¯',
      status: 'çº¿åˆ«çŠ¶æ€',
      responsible_person: 'è´£ä»»äºº',
      time: 'æ£€æµ‹æ—¶é—´',
      remarks: 'æŠ€æœ¯å‘˜å¤‡æ³¨',
      designated_engineer_id: 'æŒ‡å®šå·¥ç¨‹å¸ˆ'
    };

    const enLabels = {
      pre_aoi_program_full_name: 'Pre-AOI Program Name',
      stencil_serial_no_b_side: 'Stencil No. B-Side',
      stencil_serial_no_a_side: 'Stencil No. A-Side',
      barcode_read_a_layer: 'A-Side Laser Barcode',
      barcode_read_a_spi: 'A-Side SPI Barcode',
      barcode_read_a_pre_aoi: 'A-Side Pre-AOI Barcode',
      barcode_read_b_layer: 'B-Side Laser Barcode',
      barcode_read_b_spi: 'B-Side SPI Barcode',
      barcode_read_b_pre_aoi: 'B-Side Pre-AOI Barcode',
      workorder_info_pre_aoi: 'Pre-AOI Workorder',
      workorder_info_post_aoi: 'Post-AOI Workorder',
      aoi_scan_tools_workorder_traceability: 'Scan Tool Traceability',
      status: 'Line Status',
      responsible_person: 'Responsible Person',
      time: 'Check Time',
      remarks: 'Technician Remarks',
      designated_engineer_id: 'Designated Engineer'
    };

    if (field.includes('_')) {
      const parts = field.split('_');
      return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }

    return language === 'zh' ? (zhLabels[field] || field) : (enLabels[field] || field);
  };

  const formatValue = (val) => {
    if (val === '' || val === null || val === undefined) return 'â€”';
    if (val === 'Line Stop') return language === 'zh' ? 'åœçº¿' : 'Line Stop';
    if (val === 'Production') return language === 'zh' ? 'ç”Ÿäº§' : 'Production';
    return String(val);
  };

  const renderCheckBadge = (val, label) => {
    const isYes = val === 'Yes';
    return (
      <span className={`mini-check-badge ${isYes ? 'yes' : 'no'}`} style={{ whiteSpace: 'nowrap' }}>
        {isYes ? 'âœ“' : 'âœ—'} {label}
      </span>
    );
  };

  return (
    <table className="report-table detailed-checklist-report" style={{ minWidth: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '40px', textAlign: 'center' }}>
            <input 
              type="checkbox" 
              className="row-checkbox"
              onChange={onSelectAll}
              checked={selectedRows.length === rows.length && rows.length > 0}
              aria-label="Select all"
            />
          </th>
          <th className="sticky-date">{language === 'zh' ? 'çº¿åˆ«ä¸Žæ—¥æœŸ' : 'Line & Date'}</th>
          <th>{language === 'zh' ? 'çº¿åˆ«çŠ¶æ€' : 'Line Status'}</th>
          <th>{language === 'zh' ? 'æ–‡æ¡£çŠ¶æ€' : 'Doc Status'}</th>
          <th>{language === 'zh' ? 'æäº¤ä¸Žå®¡æ‰¹è®°å½•' : 'Audit Timeline'}</th>
          <th>{language === 'zh' ? 'ç¨‹åºä¸Žé’¢ç½‘ä¿¡æ¯' : 'Program & Tooling'}</th>
          <th>{language === 'zh' ? 'æ¡ç æ ¡éªŒ' : 'Barcode Verifications'}</th>
          <th>{language === 'zh' ? 'å·¥å•ä¸Žè¿½æº¯' : 'Workorders & Traceability'}</th>
          {isSuperAdmin && <th style={{ textAlign: 'center' }}>{language === 'zh' ? 'æ“ä½œ' : 'Actions'}</th>}
        </tr>
      </thead>
      <tbody>
        {rows.flatMap(row => {
          const isExpanded = expandedRowId === row.id;
          const isLineStop = row.status === 'Line Stop';

          const renderModifyIndicator = (fieldsList) => {
            if (!row.engineer_modified_fields) return null;
            try {
              const mods = JSON.parse(row.engineer_modified_fields);
              const isMod = mods.some(m => fieldsList.includes(m.field));
              if (!isMod) return null;
              return (
                <span 
                  title={language === 'zh' ? 'å·¥ç¨‹å¸ˆä¿®æ”¹è¿‡æ­¤é¡¹' : 'Modified by Engineer'} 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    background: '#eff6ff', 
                    color: '#2563eb', 
                    border: '1px solid #bfdbfe', 
                    padding: '0.15rem 0.35rem', 
                    borderRadius: '6px', 
                    fontSize: '0.68rem', 
                    fontWeight: 700,
                    marginLeft: '0.4rem',
                    lineHeight: 1,
                    verticalAlign: 'middle',
                    whiteSpace: 'nowrap'
                  }}
                >
                  âœï¸ {language === 'zh' ? 'å·²ä¿®æ”¹' : 'Edited'}
                </span>
              );
            } catch(e) {
              return null;
            }
          };

          const mainRow = (
            <tr 
              key={row.id} 
              onClick={(e) => {
                if (e.target.type === 'checkbox') return;
                if (row.status !== 'Not Filled' && row.status !== 'Line Not Installed') {
                  setExpandedRowId(isExpanded ? null : row.id);
                }
              }}
              style={{ cursor: (row.status !== 'Not Filled' && row.status !== 'Line Not Installed') ? 'pointer' : 'default' }}
              className={isExpanded ? 'expanded-parent-row' : ''}
            >
              <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  className="row-checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => onSelectRow(row.id)}
                  aria-label="Select row"
                />
              </td>
              <td className="sticky-date">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>Line {row.line}</span>
                  <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{formatDate(row.date)} {row.group_name && `| ${row.group_name}`}</span>
                  <span className={`shift-tag ${row.shift}`} style={{ fontSize: '0.72rem', alignSelf: 'flex-start', marginTop: '0.2rem', padding: '0.1rem 0.35rem', borderRadius: '4px', background: row.shift === 'Day' ? '#eff6ff' : '#f8fafc', color: row.shift === 'Day' ? '#1d4ed8' : '#334155', border: '1px solid', borderColor: row.shift === 'Day' ? '#bfdbfe' : '#e2e8f0', fontWeight: 700 }}>
                    {row.shift === 'Day' ? t('day') : t('night')}
                  </span>
                </div>
              </td>
              <td>
                {renderLineStatus(row.status)}
              </td>
              <td>
                {(() => {
                  if (row.status === 'Line Not Installed') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#f8fafc', color: '#64748b', border: '1px solid #cbd5e1', fontStyle: 'italic' }}>
                      {language === 'zh' ? 'æœªå®‰è£…' : 'Not Installed'}
                    </span>;
                  }
                  if (row.status === 'Not Filled') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                      {language === 'zh' ? 'æœªæäº¤' : 'Not Filled'}
                    </span>;
                  }
                  if (row.approval_status === 'ENG_PENDING') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontWeight: 700 }}>
                      â³ {language === 'zh' ? 'å¾…å®¡æ ¸' : 'Review'}
                    </span>;
                  }
                  if (row.approval_status === 'DISAPPROVED') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                      âŒ {language === 'zh' ? 'è¢«é©³å›ž' : 'Disapproved'}
                    </span>;
                  }
                  return <span className="status-mark checked" style={{ minWidth: '95px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
                    ðŸŸ¢ {language === 'zh' ? 'å·²æ‰¹å‡†' : 'Approved'}
                  </span>;
                })()}
                {renderModifyIndicator(['status'])}
              </td>
              <td>
                {row.status === 'Not Filled' ? 'â€”' : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.8rem' }}>
                    {row.submitted_by && (
                      <span style={{ color: '#334155' }}>
                        ðŸ‘¤ <strong>{language === 'zh' ? 'æäº¤' : 'Sub'}:</strong> {row.submitted_by} 
                        <span style={{ color: '#64748b', fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                          ({formatDateTime(row.created_at)})
                        </span>
                      </span>
                    )}
                    {row.approval_status === 'APPROVED' && (
                      <span style={{ color: '#166534', fontWeight: 500 }}>
                        âœ“ <strong>{language === 'zh' ? 'å®¡æ‰¹' : 'App'}:</strong> {getEngineerDisplay(row.designated_engineer_id)} 
                        <span style={{ color: '#166534', opacity: 0.8, fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                          ({formatDateTime(row.updated_at)})
                        </span>
                      </span>
                    )}
                    {row.approval_status === 'DISAPPROVED' && (
                      <span style={{ color: '#b91c1c', fontWeight: 500 }}>
                        âœ— <strong>{language === 'zh' ? 'é©³å›ž' : 'Rej'}:</strong> {getEngineerDisplay(row.designated_engineer_id)} 
                        <span style={{ color: '#b91c1c', opacity: 0.8, fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                          ({formatDateTime(row.updated_at)})
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </td>
              <td>
                {row.status === 'Not Filled' ? 'â€”' : (
                  isLineStop ? (
                    <span style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      ðŸ›‘ {t('cl_status_linestop')}
                    </span>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.82rem' }}>
                      <span style={{ color: '#0f172a', fontWeight: 700 }} title={row.pre_aoi_program_full_name}>
                        ðŸ’» {row.pre_aoi_program_full_name ? (row.pre_aoi_program_full_name.length > 22 ? `${row.pre_aoi_program_full_name.substring(0, 20)}...` : row.pre_aoi_program_full_name) : 'â€”'}
                        {renderModifyIndicator(['pre_aoi_program_full_name'])}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                        ðŸ”§ A-Stencil: <strong>{row.stencil_serial_no_a_side || 'â€”'}</strong> | B-Stencil: <strong>{row.stencil_serial_no_b_side || 'â€”'}</strong>
                        {renderModifyIndicator(['stencil_serial_no_a_side', 'stencil_serial_no_b_side'])}
                      </span>
                    </div>
                  )
                )}
              </td>
              <td>
                {row.status === 'Not Filled' ? 'â€”' : (
                  isLineStop ? (
                    <span style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      ðŸ›‘ {t('cl_status_linestop')}
                    </span>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 700, minWidth: '42px' }}>A-Side:</span>
                        {renderCheckBadge(row.barcode_read_a_layer, 'LASER')}
                        {renderCheckBadge(row.barcode_read_a_spi, 'SPI')}
                        {renderCheckBadge(row.barcode_read_a_pre_aoi, 'PRE-AOI')}
                        {renderModifyIndicator(['barcode_read_a_layer', 'barcode_read_a_spi', 'barcode_read_a_pre_aoi'])}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: '#64748b', fontWeight: 700, minWidth: '42px' }}>B-Side:</span>
                        {renderCheckBadge(row.barcode_read_b_layer, 'LASER')}
                        {renderCheckBadge(row.barcode_read_b_spi, 'SPI')}
                        {renderCheckBadge(row.barcode_read_b_pre_aoi, 'PRE-AOI')}
                        {renderModifyIndicator(['barcode_read_b_layer', 'barcode_read_b_spi', 'barcode_read_b_pre_aoi'])}
                      </div>
                    </div>
                  )
                )}
              </td>
              <td>
                {row.status === 'Not Filled' ? 'â€”' : (
                  isLineStop ? (
                    <span style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      ðŸ›‘ {t('cl_status_linestop')}
                    </span>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.82rem' }}>
                      <span style={{ color: '#334155' }}>
                        Pre-WO: <strong>{row.workorder_info_pre_aoi || 'â€”'}</strong> | Post-WO: <strong>{row.workorder_info_post_aoi || 'â€”'}</strong>
                        {renderModifyIndicator(['workorder_info_pre_aoi', 'workorder_info_post_aoi'])}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                        Traceability: <strong>{row.aoi_scan_tools_workorder_traceability || 'â€”'}</strong>
                        {renderModifyIndicator(['aoi_scan_tools_workorder_traceability'])}
                      </span>
                    </div>
                  )
                )}
              </td>
              {isSuperAdmin && (
                <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                  <button 
                    type="button"
                    className="btn-delete-report-row" 
                    onClick={() => onDelete(row.id, 'checklist')}
                    title={language === 'zh' ? 'åˆ é™¤è®°å½•' : 'Delete Record'}
                  >
                    ðŸ—‘ï¸
                  </button>
                </td>
              )}
            </tr>
          );

          if (!isExpanded) return [mainRow];

          const detailRow = (
            <tr key={`${row.id}-details`} className="expanded-row-details">
              <td colSpan={totalColSpan} style={{ background: '#f8fafc', padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <div className="expansion-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? 'ç¡®è®¤äººç­¾å' : 'Confirmation Signature'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>
                      {row.confirmation || 'â€”'}
                    </span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? 'æŒ‡å®šå·¥ç¨‹å¸ˆ' : 'Designated Engineer'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>
                      {getEngineerDisplay(row.designated_engineer_id)}
                    </span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? 'æŠ€æœ¯å‘˜å¤‡æ³¨' : 'Technician Remarks'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                      {row.remarks || 'â€”'}
                    </span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? 'å·¥ç¨‹å¸ˆå®¡æ ¸å¤‡æ³¨' : 'Engineer Remarks'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                      {row.engineer_remarks || 'â€”'}
                    </span>
                  </div>
                  {row.engineer_modified_fields && (
                    <div style={{ gridColumn: 'span 4', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                      <strong style={{ display: 'block', color: '#b91c1c', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
                        {language === 'zh' ? 'âš ï¸ å·¥ç¨‹å¸ˆä¿®æ”¹å†…å®¹è®°å½•' : 'âš ï¸ Engineer Modification History'}
                      </strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                        {(() => {
                          try {
                            const diffs = JSON.parse(row.engineer_modified_fields);
                            return diffs.map((diff, index) => (
                              <div key={index} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px rgba(15,23,42,0.02)' }}>
                                <span style={{ fontWeight: 700, color: '#0f172a' }}>{getFieldLabel(diff.field)}:</span>
                                <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontStyle: 'italic' }}>{formatValue(diff.from)}</span>
                                <span style={{ color: '#3b82f6', fontWeight: 900 }}>â†’</span>
                                <strong style={{ color: '#16a34a', background: '#f0fdf4', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>{formatValue(diff.to)}</strong>
                              </div>
                            ));
                          } catch(e) {
                            return <span>{row.engineer_modified_fields}</span>;
                          }
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );

          return [mainRow, detailRow];
        })}
      </tbody>
    </table>
  );
}

function LaserChangeoverReport({ rows, t, language, formatDate, formatDateTime, isSuperAdmin, onDelete, getEngineerDisplay, selectedRows, onSelectRow, onSelectAll }) {
  const allSelected = rows.length > 0 && selectedRows.length === rows.length;
  
  const renderBool = (val) => {
    if (val === true || val === 'true') return <span className="status-badge-inline ok" title="Passed">âœ”ï¸</span>;
    if (val === false || val === 'false') return <span className="status-badge-inline fail" title="Failed">âŒ</span>;
    return <span style={{ color: '#9ca3af' }}>â€”</span>;
  };

  return (
    <table className="report-table" style={{ minWidth: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '40px', textAlign: 'center' }}>
            <input 
              type="checkbox" 
              className="row-checkbox"
              onChange={(e) => onSelectAll(e.target.checked, rows)}
              checked={allSelected}
              aria-label="Select all"
            />
          </th>
          <th>{language === 'zh' ? 'æ—¥æœŸ' : 'Date'}</th>
          <th>{language === 'zh' ? 'çº¿ä½“' : 'Line'}</th>
          <th>{language === 'zh' ? 'ç­ç»„' : 'Group'}</th>
          <th>{language === 'zh' ? 'ç­åˆ«' : 'Shift'}</th>
          <th>{language === 'zh' ? 'çŠ¶æ€' : 'Status'}</th>
          <th>{language === 'zh' ? 'ç¨‹åºåç§°' : 'Program Name'}</th>
          
          <th>{language === 'zh' ? '1. ç¨‹åºåç§°' : '1. Prog Name'}</th>
          <th>{language === 'zh' ? '2. é•­é›•å‚æ•°' : '2. Laser Param'}</th>
          <th>{language === 'zh' ? '3. é‡ç åŠŸèƒ½' : '3. Dup Code'}</th>
          <th>{language === 'zh' ? '4. PCBé˜²å' : '4. Anti-Reverse'}</th>
          <th>{language === 'zh' ? '5. ABæ¡ç ä¸€è‡´' : '5. A/B Barcode'}</th>
          <th>{language === 'zh' ? '6. é•­é›•é¡ºåº' : '6. Sequence'}</th>
          <th>{language === 'zh' ? '7. é•­é›•ä½ç½®' : '7. Position'}</th>

          <th>{language === 'zh' ? 'æäº¤äºº' : 'Submitted By'}</th>
          <th>{language === 'zh' ? 'å·¥ç¨‹å¸ˆ' : 'Engineer'}</th>
          <th>{language === 'zh' ? 'å·¥ç¨‹å¸ˆå®¡æ ¸' : 'ENG Review Time'}</th>
          <th>{language === 'zh' ? 'ç»„é•¿å®¡æ‰¹' : 'GL Approval'}</th>
          <th>{language === 'zh' ? 'ç»„é•¿å®¡æ‰¹æ—¶é—´' : 'GL Review Time'}</th>
          
          {isSuperAdmin && <th style={{ width: '60px', textAlign: 'center' }}>{t('actions')}</th>}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={isSuperAdmin ? 20 : 19} className="no-data-cell" style={{ textAlign: 'center', padding: '2rem' }}>
              {t('rep_no_data')}
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id}>
              <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  className="row-checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={(e) => onSelectRow(row.id, e.target.checked)}
                />
              </td>
              <td style={{ fontWeight: 600 }}>{formatDate(row.date)}</td>
              <td><span className="line-tag">{row.line || 'â€”'}</span></td>
              <td><span className="shift-tag">{row.group_name || 'â€”'}</span></td>
              <td>{row.shift === 'Day' ? t('day') : (row.shift === 'Night' ? t('night') : row.shift)}</td>
              <td>
                {(() => {
                  if (row.approval_status === 'ENG_PENDING') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontWeight: 700 }}>â³ {language === 'zh' ? 'å¾…å®¡æ ¸' : 'Review'}</span>;
                  }
                  if (row.approval_status === 'GRP_LDR_PENDING') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#e0e7ff', color: '#4338ca', border: '1px solid #c7d2fe', fontWeight: 700 }}>â³ {language === 'zh' ? 'ç»„é•¿å¾…å®¡' : 'GL Review'}</span>;
                  }
                  if (row.approval_status === 'DISAPPROVED' || row.approval_status === 'REJECTED') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>âŒ {language === 'zh' ? 'å·²é©³å›ž' : 'Rejected'}</span>;
                  }
                  return <span className="status-mark checked" style={{ minWidth: '95px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>âœ… {language === 'zh' ? 'å·²é€šè¿‡' : 'Approved'}</span>;
                })()}
              </td>
              <td>{row.program_name || 'â€”'}</td>
              
              <td style={{ textAlign: 'center' }}>{renderBool(row.prog_name_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.laser_param_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.duplicate_code_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.pcb_anti_reverse_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.ab_barcode_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.laser_sequence_check)}</td>
              <td style={{ textAlign: 'center' }}>{renderBool(row.laser_position_check)}</td>

              <td>{row.submitted_by || 'â€”'}</td>
              <td>{getEngineerDisplay(row.designated_engineer_id)}</td>
              <td>{row.approval_status !== 'ENG_PENDING' ? formatDateTime(row.updated_at) : 'â€”'}</td>
              <td>{row.group_leader_signature || 'â€”'}</td>
              <td>{row.approval_status === 'APPROVED' ? formatDateTime(row.updated_at) : 'â€”'}</td>

              {isSuperAdmin && (
                <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                  <button 
                    type="button"
                    className="btn-delete-report-row" 
                    onClick={() => onDelete(row.id, 'laser_changeover')}
                    title={language === 'zh' ? 'åˆ é™¤è®°å½•' : 'Delete Record'}
                  >
                    ðŸ—‘ï¸
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
