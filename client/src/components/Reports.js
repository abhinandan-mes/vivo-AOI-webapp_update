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

const text = value => value === null || value === undefined || value === '' ? '—' : value;
const dateKey = value => {
  if (!value) return '';
  const date = new Date(value);
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
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(() => {
    const todayStr = dateKey(new Date());
    return { from: todayStr, to: todayStr, line: '', shift: '', group: '' };
  });
  const [showExport, setShowExport] = useState(false);
  const [exportConfirm, setExportConfirm] = useState({ show: false, format: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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

  // All 25 lines — used as fallback and for the full list
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
    if (!value) return '—';
    return new Date(value).toLocaleDateString(language === 'zh' ? 'zh-CN' : undefined);
  };

  const formatDateTime = value => {
    if (!value) return '—';
    return new Date(value).toLocaleString(language === 'zh' ? 'zh-CN' : undefined);
  };

  const getEngineerDisplay = (id) => {
    if (!id) return language === 'zh' ? '系统自动' : 'System (Automatic)';
    if (id === 'System (Automatic)') return language === 'zh' ? '系统自动' : 'System (Automatic)';
    const eng = engineers.find(e => e.username === id);
    return eng ? `${eng.full_name} (${eng.username})` : id;
  };

  const reportTitle = reportType => reportType === 'checkpoint' ? t('rep_toggle_checkpoint') : t('rep_toggle_checklist');
  const reportFileName = reportType => reportType === 'checkpoint' ? 'daily-function-checks' : 'technician-checklists';
  
  const getExportColumns = reportType => reportType === 'checkpoint'
    ? [
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
      ]
    : checklistColumns;

  const isCheckpointColumn = key => checkpointColumns.some(column => column.key === key);

  const exportValue = (row, key, reportType) => {
    if (key === 'date') return dateKey(row[key]);
    if (key === 'created_at') return row[key] ? new Date(row[key]).toLocaleString(language === 'zh' ? 'zh-CN' : undefined) : '';
    if (reportType === 'checkpoint' && isCheckpointColumn(key)) return row[key] ? t('yes') : t('no');
    
    // Localize options values
    if (key === 'status') {
      if (row[key] === 'Line Stop') return t('cl_status_linestop');
      if (row[key] === 'Not Filled') return language === 'zh' ? '未提交' : 'Not Filled';
      if (row[key] === 'Line Not Installed') return language === 'zh' ? '未安装' : 'Line Not Installed';
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
    return row[key] ?? '';
  };

  const isSuperAdmin = currentUser?.role === 'super_admin';

  const loadData = () => {
    setLoading(true);
    setError('');
    Promise.all([
      apiService.getAllChecklists(),
      apiService.getAllCheckpoints(),
      apiService.getEngineers()
    ])
      .then(([checklistRes, checkpointRes, engineersRes]) => {
        setChecklists(checklistRes.data.data || []);
        setCheckpoints(checkpointRes.data.data || []);
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
    const data = reportType === 'checkpoint' ? checkpoints : checklists;
    
    // Find all unique dates in the dataset
    const uniqueDates = Array.from(new Set(data.map(d => dateKey(d.date))));
    if (uniqueDates.length === 0) {
      uniqueDates.push(dateKey(new Date()));
    }
    
    const completeRows = [];
    
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
                group_name: '—',
                status: 'Not Filled',
                submitted_by: '—',
                created_at: null,
              });
            }
          }
        });
      });
    });

    return completeRows.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      if (timeB !== timeA) return timeB - timeA;
      
      // then by line ascending
      const lineCompare = String(a.line).localeCompare(String(b.line));
      if (lineCompare !== 0) return lineCompare;
      
      // then by shift ascending (Day, then Night)
      return String(a.shift).localeCompare(String(b.shift));
    });
  }, [reportType, checklists, checkpoints, allLineOptions, notInstalledLines]);

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

  const techLineStopLines = useMemo(() => {
    const lineStops = techTodaySubmissions.filter(r => r.status === 'Line Stop');
    return Array.from(new Set(lineStops.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [techTodaySubmissions, lineOptions]);

  const techProductionLines = useMemo(() => {
    return techTodayDoneLines.filter(l => !techLineStopLines.includes(l));
  }, [techTodayDoneLines, techLineStopLines]);

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

  const funcLineStopLines = useMemo(() => {
    const lineStops = funcTodaySubmissions.filter(r => r.status === 'Line Stop');
    return Array.from(new Set(lineStops.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [funcTodaySubmissions, lineOptions]);

  const funcProductionLines = useMemo(() => {
    return funcTodayDoneLines.filter(l => !funcLineStopLines.includes(l));
  }, [funcTodayDoneLines, funcLineStopLines]);

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
    filteredRows.forEach(row => {
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
    const tableRows = filteredRows.map(row => `
      <tr>${columns.map(([, key]) => `<td>${escapeHtml(exportValue(row, key, reportType) || '—')}</td>`).join('')}</tr>
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
          <h1>${escapeHtml(title)}</h1>
          <p>${language === 'zh' ? '生成于' : 'Generated'} ${escapeHtml(generatedDate)} · ${filteredRows.length} ${language === 'zh' ? '条记录' : `record${filteredRows.length === 1 ? '' : 's'}`}</p>
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

  const renderSummaryCard = (title, productionLines, lineStopLines, pendingLines, approvedLines, notInstLines, colorThemeClass, dateValue, onDateChange, shiftValue, onShiftChange) => {
    const totalLines = lineOptions.length;
    const submittedCount = productionLines.length + lineStopLines.length;
    const progressPercent = totalLines > 0 ? Math.round((submittedCount / totalLines) * 100) : 0;
    
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
              <span className="metric-label submitted">{t('rep_summary_submitted')}</span>
              <span className="metric-value production">{productionLines.length} <small>/ {totalLines}</small></span>
            </div>
            <div className="summary-metric-item">
              <span className="metric-label linestop">{t('rep_summary_linestop')}</span>
              <span className="metric-value linestop">{lineStopLines.length} <small>/ {totalLines}</small></span>
            </div>
            <div className="summary-metric-item">
              <span className="metric-label" style={{ color: '#10b981' }}>{language === 'zh' ? '已批准' : 'Approved'}</span>
              <span className="metric-value done">{approvedLines.length} <small>/ {totalLines}</small></span>
            </div>
            <div className="summary-metric-item">
              <span className="metric-label notfilled">{t('rep_summary_notfilled')}</span>
              <span className="metric-value pending">{pendingLines.length} <small>/ {totalLines}</small></span>
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
              <span className="breakdown-label submitted">{t('rep_summary_submitted')}:</span>
              <div className="line-chips-container">
                {productionLines.length > 0 ? (
                  productionLines.map(line => (
                     <span key={line} className="line-chip production">{line}</span>
                  ))
                ) : (
                  <span className="empty-chips-label">{t('rep_summary_empty')}</span>
                )}
              </div>
            </div>
 
            <div className="line-breakdown-group">
              <span className="breakdown-label linestop">{t('rep_summary_linestop')}:</span>
              <div className="line-chips-container">
                {lineStopLines.length > 0 ? (
                  lineStopLines.map(line => (
                     <span key={line} className="line-chip linestop">{line}</span>
                  ))
                ) : (
                  <span className="empty-chips-label">{t('rep_summary_empty')}</span>
                )}
              </div>
            </div>

            <div className="line-breakdown-group">
              <span className="breakdown-label" style={{ color: '#10b981' }}>{language === 'zh' ? '已批准:' : 'Approved:'}</span>
              <div className="line-chips-container">
                {approvedLines.length > 0 ? (
                  approvedLines.map(line => (
                     <span key={line} className="line-chip production" style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}>{line}</span>
                  ))
                ) : (
                  <span className="empty-chips-label">{t('rep_summary_empty')}</span>
                )}
              </div>
            </div>
            
            <div className="line-breakdown-group">
              <span className="breakdown-label notfilled">{t('rep_summary_notfilled')}:</span>
              <div className="line-chips-container">
                {pendingLines.length > 0 ? (
                  pendingLines.map(line => (
                     <span key={line} className="line-chip pending">{line}</span>
                  ))
                ) : (
                  <span className="empty-chips-label">{t('rep_summary_empty')}</span>
                )}
              </div>
            </div>
 
            {notInstLines && notInstLines.length > 0 && (
              <div className="line-breakdown-group">
                <span className="breakdown-label not-installed-label">
                  {language === 'zh' ? '未安装:' : 'Not Installed:'}
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

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <section className="reports-container">
      <div className="reports-heading">
        <div>
          <h1>{t('rep_title')}</h1>
          <p>{language === 'zh' ? '存储在系统后台的详细点检检验记录。' : 'Detailed records stored in the backend.'}</p>
        </div>
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
                  {t('rep_opt_csv')}
                </button>
                <button type="button" className="export-menu-item" onClick={() => triggerExport('pdf')}>
                  <svg viewBox="0 0 24 24" width="14" height="14" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                    <path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V8H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V8H15c.83 0 1.5.67 1.5 1.5v2zm4.5-3H19v1h1.5V11H19v2h-1.5V8H21v1.5zM9 9.5h1v-1H9v1zm5.5 2h1v-2h-1v2zM2 6v14c0 1.1.9 2 2 2h14v-1.5H4V6H2z"/>
                  </svg>
                  {t('rep_opt_pdf')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Summary Dashboard Panel ── */}
      <div className="reports-summary-dashboard">
        {renderSummaryCard(t('rep_summary_checklist'), techProductionLines, techLineStopLines, techTodayPendingLines, techApprovedLines, notInstalledLines, 'tech-theme', techSummaryDate, setTechSummaryDate, techSummaryShift, setTechSummaryShift)}
        {renderSummaryCard(t('rep_summary_checkpoint'), funcProductionLines, funcLineStopLines, funcTodayPendingLines, funcApprovedLines, notInstalledLines, 'func-theme', funcSummaryDate, setFuncSummaryDate, funcSummaryShift, setFuncSummaryShift)}
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
      </div>

      <div className="report-filters">
        <label>{t('rep_filter_from')}<input type="date" name="from" value={filters.from} max={filters.to || undefined} onChange={updateFilter} /></label>
        <label>{t('rep_filter_to')}<input type="date" name="to" value={filters.to} min={filters.from || undefined} onChange={updateFilter} /></label>
        <label>{t('rep_filter_line')}<select name="line" value={filters.line} onChange={updateFilter}><option value="">{language === 'zh' ? '全部线别' : 'All lines'}</option>{allLineOptions.map(line => <option key={line} value={line}>{line}</option>)}</select></label>
        <label>{t('rep_filter_shift')}<select name="shift" value={filters.shift} onChange={updateFilter}><option value="">{language === 'zh' ? '全部班次' : 'All shifts'}</option>{shiftOptions.map(shift => <option key={shift} value={shift}>{shift === 'Day' ? t('day') : t('night')}</option>)}</select></label>
        <label>{t('rep_filter_group')}<select name="group" value={filters.group} onChange={updateFilter}><option value="">{language === 'zh' ? '全部班组' : 'All groups'}</option>{groupOptions.map(group => <option key={group} value={group}>{group}</option>)}</select></label>
        <label>
          {language === 'zh' ? '状态' : 'Status'}
          <select name="status" value={filters.status} onChange={updateFilter}>
            <option value="">{language === 'zh' ? '全部状态' : 'All statuses'}</option>
            <option value="Production">{language === 'zh' ? '已提交(生产)' : 'Production'}</option>
            <option value="Line Stop">{language === 'zh' ? '已提交(停线)' : 'Line Stop'}</option>
            <option value="Pending Review">{language === 'zh' ? '待审核' : 'Pending Review'}</option>
            <option value="Disapproved">{language === 'zh' ? '已驳回' : 'Disapproved'}</option>
            <option value="Not Filled">{language === 'zh' ? '未提交' : 'Not Filled'}</option>
          </select>
        </label>
        {hasActiveFilters && (
          <button className="clear-filters" type="button" onClick={() => setFilters({ from: '', to: '', line: '', shift: '', group: '', status: '' })}>
            ✕ {t('clear')}
          </button>
        )}
      </div>

      {!loading && !error && (
        <div className="report-meta-bar">
          <span className="result-count-badge">
            {language === 'zh' 
              ? <span>显示第 <strong>{filteredRows.length}</strong> 条，共 {rows.length} 条记录</span>
              : <span>Showing <strong>{filteredRows.length}</strong> of {rows.length} entries</span>
            }
          </span>
        </div>
      )}
      {loading && <div className="report-state">{t('rep_loading')}</div>}
      {error && <div className="report-state error">{t('error')}: {error}</div>}
      {!loading && !error && rows.length === 0 && <div className="report-state">{language === 'zh' ? '暂无已提交的检查记录。' : 'No records have been submitted yet.'}</div>}
      {!loading && !error && rows.length > 0 && filteredRows.length === 0 && <div className="report-state">{t('rep_empty')}</div>}
      {!loading && !error && filteredRows.length > 0 && (
        <div className="report-table-wrap">
          {reportType === 'checkpoint' 
            ? <CheckpointReport rows={filteredRows} checkpointColumns={checkpointColumns} checkpointGroups={checkpointGroups} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} isSuperAdmin={isSuperAdmin} onDelete={handleDeleteClick} getEngineerDisplay={getEngineerDisplay} /> 
            : <ChecklistReport rows={filteredRows} checklistColumns={checklistColumns} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} isSuperAdmin={isSuperAdmin} onDelete={handleDeleteClick} getEngineerDisplay={getEngineerDisplay} />
          }
        </div>
      )}

      {/* Custom Export Confirmation Modal */}
      {exportConfirm.show && (
        <div className="global-modal-overlay">
          <div className="modal-content submit-confirm-modal">
            <div className="confirm-modal-icon-wrapper">
              <div className="confirm-modal-icon">
                📥
              </div>
            </div>
            
            <div className="confirm-modal-header">
              <h2>{language === 'zh' ? '确认导出数据' : 'Confirm Data Export'}</h2>
              <p>{language === 'zh' ? '请核对以下导出配置，确认无误后下载文件' : 'Please verify the following export configurations before downloading'}</p>
            </div>

            <div className="confirm-details-table">
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? '报表类型' : 'Report Type'}</span>
                <span className="confirm-detail-value">{reportTitle(reportType)}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? '文件格式' : 'File Format'}</span>
                <span className="confirm-detail-value" style={{ fontWeight: 'bold', color: '#415fff' }}>{exportConfirm.format.toUpperCase()}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? '筛选记录数' : 'Filtered Records'}</span>
                <span className="confirm-detail-value" style={{ color: '#027a48', fontWeight: 600 }}>{filteredRows.length} {language === 'zh' ? '条' : 'records'}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? '线别筛选' : 'Line Filter'}</span>
                <span className="confirm-detail-value">{filters.line || (language === 'zh' ? '全部' : 'All')}</span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? '班次筛选' : 'Shift Filter'}</span>
                <span className="confirm-detail-value">
                  {filters.shift ? (filters.shift === 'Day' ? t('day') : t('night')) : (language === 'zh' ? '全部' : 'All')}
                </span>
              </div>
              <div className="confirm-detail-item">
                <span className="confirm-detail-label">{language === 'zh' ? '班组筛选' : 'Group Filter'}</span>
                <span className="confirm-detail-value">{filters.group || (language === 'zh' ? '全部' : 'All')}</span>
              </div>
              <div className="confirm-detail-item" style={{ gridColumn: 'span 2' }}>
                <span className="confirm-detail-label">{language === 'zh' ? '日期范围' : 'Date Range'}</span>
                <span className="confirm-detail-value" style={{ fontSize: '0.88rem' }}>
                  {filters.from || '—'} {language === 'zh' ? '至' : 'to'} {filters.to || '—'}
                </span>
              </div>
            </div>

            <div className="confirm-modal-actions">
              <button 
                type="button" 
                className="confirm-btn-cancel" 
                onClick={() => setExportConfirm({ show: false, format: '' })}
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </button>
              <button 
                type="button" 
                className="confirm-btn-submit-active"
                onClick={executeExport}
              >
                {language === 'zh' ? '确认下载' : 'Download File'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteConfirm}
        title={language === 'zh' ? '删除记录' : 'Delete Record'}
        message={
          language === 'zh'
            ? '您确定要删除此条点检记录吗？此操作将永久移除该条数据且无法撤销！'
            : 'Are you sure you want to delete this record? This action will permanently remove it and cannot be undone!'
        }
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm(null)}
        confirmText={language === 'zh' ? '确认删除' : 'Delete'}
        cancelText={language === 'zh' ? '取消' : 'Cancel'}
        type="danger"
      />
    </section>
  );
}

function CheckpointReport({ rows, checkpointColumns, checkpointGroups, t, language, formatDate, formatDateTime, isSuperAdmin, onDelete, getEngineerDisplay }) {
  const [expandedRowId, setExpandedRowId] = React.useState(null);
  const totalColSpan = isSuperAdmin ? 7 : 6;

  const renderLineStatus = (status) => {
    if (status === 'Not Filled' || status === 'Line Not Installed') return '—';
    if (status === 'Line Stop') {
      return (
        <span className="status-mark" style={{ minWidth: '85px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
          🛑 {language === 'zh' ? '停线' : 'Stop'}
        </span>
      );
    }
    return (
      <span className="status-mark checked" style={{ minWidth: '85px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
        🟢 {language === 'zh' ? '生产' : 'Production'}
      </span>
    );
  };

  const getFieldLabel = (field) => {
    const zhLabels = {
      pre_aoi_program_full_name: 'Pre-AOI 完整程序名',
      stencil_serial_no_b_side: '钢网编号 B面',
      stencil_serial_no_a_side: '钢网编号 A面',
      barcode_read_a_layer: 'A面 Laser 条码读取',
      barcode_read_a_spi: 'A面 SPI 条码读取',
      barcode_read_a_pre_aoi: 'A面 Pre-AOI 条码读取',
      barcode_read_b_layer: 'B面 Laser 条码读取',
      barcode_read_b_spi: 'B面 SPI 条码读取',
      barcode_read_b_pre_aoi: 'B面 Pre-AOI 条码读取',
      workorder_info_pre_aoi: 'Pre-AOI 工单信息',
      workorder_info_post_aoi: 'Post-AOI 工单信息',
      aoi_scan_tools_workorder_traceability: '扫码工具工单追溯',
      status: '线别状态',
      responsible_person: '责任人',
      time: '检测时间',
      remarks: '技术员备注',
      designated_engineer_id: '指定工程师'
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
    if (val === '' || val === null || val === undefined) return '—';
    if (val === 'Line Stop') return language === 'zh' ? '停线' : 'Line Stop';
    if (val === 'Production') return language === 'zh' ? '生产' : 'Production';
    return String(val);
  };

  return <table className="report-table detailed-checkpoint-report" style={{ minWidth: '100%' }}>
    <thead>
      <tr>
        <th className="sticky-date">{language === 'zh' ? '线别与日期' : 'Line & Date'}</th>
        <th>{language === 'zh' ? '线别状态' : 'Line Status'}</th>
        <th>{language === 'zh' ? '文档状态' : 'Doc Status'}</th>
        <th>{language === 'zh' ? '提交与审批记录' : 'Audit Timeline'}</th>
        <th>{language === 'zh' ? '责任人与检测时间' : 'Responsible & Time'}</th>
        <th>{language === 'zh' ? '功能检测通过率' : 'Function Checks'}</th>
        {isSuperAdmin && <th style={{ textAlign: 'center' }}>{language === 'zh' ? '操作' : 'Actions'}</th>}
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
              title={language === 'zh' ? '工程师修改过此项' : 'Modified by Engineer'} 
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
              ✏️ {language === 'zh' ? '已修改' : 'Edited'}
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
          onClick={() => {
            if (row.status !== 'Not Filled' && row.status !== 'Line Not Installed') {
              setExpandedRowId(isExpanded ? null : row.id);
            }
          }}
          style={{ cursor: (row.status !== 'Not Filled' && row.status !== 'Line Not Installed') ? 'pointer' : 'default' }}
          className={isExpanded ? 'expanded-parent-row' : ''}
        >
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
                  {language === 'zh' ? '未安装' : 'Not Installed'}
                </span>;
              }
              if (row.status === 'Not Filled') {
                return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                  {language === 'zh' ? '未提交' : 'Not Filled'}
                </span>;
              }
              if (row.approval_status === 'ENG_PENDING') {
                return <span className="status-mark" style={{ minWidth: '95px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontWeight: 700 }}>
                  ⏳ {language === 'zh' ? '待审核' : 'Review'}
                </span>;
              }
              if (row.approval_status === 'DISAPPROVED') {
                return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                  ❌ {language === 'zh' ? '被驳回' : 'Disapproved'}
                </span>;
              }
              return <span className="status-mark checked" style={{ minWidth: '95px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
                🟢 {language === 'zh' ? '已批准' : 'Approved'}
              </span>;
            })()}
            {renderModifyIndicator(['status'])}
          </td>
          <td>
            {row.status === 'Not Filled' ? '—' : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.8rem' }}>
                {row.submitted_by && (
                  <span style={{ color: '#334155' }}>
                    👤 <strong>{language === 'zh' ? '提交' : 'Sub'}:</strong> {row.submitted_by} 
                    <span style={{ color: '#64748b', fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                      ({formatDateTime(row.created_at)})
                    </span>
                  </span>
                )}
                {row.approval_status === 'APPROVED' && (
                  <span style={{ color: '#166534', fontWeight: 500 }}>
                    ✓ <strong>{language === 'zh' ? '审批' : 'App'}:</strong> {getEngineerDisplay(row.designated_engineer_id)} 
                    <span style={{ color: '#166534', opacity: 0.8, fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                      ({formatDateTime(row.updated_at)})
                    </span>
                  </span>
                )}
                {row.approval_status === 'DISAPPROVED' && (
                  <span style={{ color: '#b91c1c', fontWeight: 500 }}>
                    ✗ <strong>{language === 'zh' ? '驳回' : 'Rej'}:</strong> {getEngineerDisplay(row.designated_engineer_id)} 
                    <span style={{ color: '#b91c1c', opacity: 0.8, fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                      ({formatDateTime(row.updated_at)})
                    </span>
                  </span>
                )}
              </div>
            )}
          </td>
          <td>
            {row.status === 'Not Filled' ? '—' : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', fontSize: '0.82rem' }}>
                <span style={{ color: '#334155', fontWeight: 600 }}>
                  {text(row.responsible_person)}
                  {renderModifyIndicator(['responsible_person'])}
                </span>
                <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                  🕒 {text(row.time)}
                  {renderModifyIndicator(['time'])}
                </span>
              </div>
            )}
          </td>
          <td>
            {row.status === 'Not Filled' ? '—' : (
              row.status === 'Line Stop' ? (
                <span style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  🛑 {t('cl_status_linestop')}
                </span>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ flex: 1, height: '8px', minWidth: '80px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(passedChecks / totalChecks) * 100}%`, height: '100%', background: passedChecks === totalChecks ? '#10b981' : '#f59e0b' }}></div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: passedChecks === totalChecks ? '#059669' : '#d97706' }}>
                    {passedChecks}/{totalChecks} {language === 'zh' ? '项通过' : 'Passed'}
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
                title={language === 'zh' ? '删除记录' : 'Delete Record'}
              >
                🗑️
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
                  {language === 'zh' ? '指定工程师' : 'Designated Engineer'}
                </strong>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>
                  {getEngineerDisplay(row.designated_engineer_id)}
                </span>
              </div>
              <div>
                <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  {language === 'zh' ? '技术员备注' : 'Technician Remarks'}
                </strong>
                <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                  {row.remarks || '—'}
                </span>
              </div>
              <div>
                <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  {language === 'zh' ? '工程师审核备注' : 'Engineer Remarks'}
                </strong>
                <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                  {row.engineer_remarks || '—'}
                </span>
              </div>
              {row.engineer_modified_fields && (
                <div style={{ gridColumn: 'span 3', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                  <strong style={{ display: 'block', color: '#b91c1c', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
                    {language === 'zh' ? '⚠️ 工程师修改内容记录' : '⚠️ Engineer Modification History'}
                  </strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {(() => {
                      try {
                        const diffs = JSON.parse(row.engineer_modified_fields);
                        return diffs.map((diff, index) => (
                          <div key={index} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px rgba(15,23,42,0.02)' }}>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{getFieldLabel(diff.field)}:</span>
                            <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontStyle: 'italic' }}>{formatValue(diff.from)}</span>
                            <span style={{ color: '#3b82f6', fontWeight: 900 }}>→</span>
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
                    {language === 'zh' ? '详细功能检测结果' : 'Detailed Function Check Results'}
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
                                    {checkVal ? '✓' : '✗'}
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

function ChecklistReport({ rows, checklistColumns, t, language, formatDate, formatDateTime, isSuperAdmin, onDelete, getEngineerDisplay }) {
  const [expandedRowId, setExpandedRowId] = React.useState(null);
  const totalColSpan = isSuperAdmin ? 8 : 7;

  const renderLineStatus = (status) => {
    if (status === 'Not Filled' || status === 'Line Not Installed') return '—';
    if (status === 'Line Stop') {
      return (
        <span className="status-mark" style={{ minWidth: '85px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
          🛑 {language === 'zh' ? '停线' : 'Stop'}
        </span>
      );
    }
    return (
      <span className="status-mark checked" style={{ minWidth: '85px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
        🟢 {language === 'zh' ? '生产' : 'Production'}
      </span>
    );
  };

  const getFieldLabel = (field) => {
    const zhLabels = {
      pre_aoi_program_full_name: 'Pre-AOI 完整程序名',
      stencil_serial_no_b_side: '钢网编号 B面',
      stencil_serial_no_a_side: '钢网编号 A面',
      barcode_read_a_layer: 'A面 Laser 条码读取',
      barcode_read_a_spi: 'A面 SPI 条码读取',
      barcode_read_a_pre_aoi: 'A面 Pre-AOI 条码读取',
      barcode_read_b_layer: 'B面 Laser 条码读取',
      barcode_read_b_spi: 'B面 SPI 条码读取',
      barcode_read_b_pre_aoi: 'B面 Pre-AOI 条码读取',
      workorder_info_pre_aoi: 'Pre-AOI 工单信息',
      workorder_info_post_aoi: 'Post-AOI 工单信息',
      aoi_scan_tools_workorder_traceability: '扫码工具工单追溯',
      status: '线别状态',
      responsible_person: '责任人',
      time: '检测时间',
      remarks: '技术员备注',
      designated_engineer_id: '指定工程师'
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
    if (val === '' || val === null || val === undefined) return '—';
    if (val === 'Line Stop') return language === 'zh' ? '停线' : 'Line Stop';
    if (val === 'Production') return language === 'zh' ? '生产' : 'Production';
    return String(val);
  };

  const renderCheckBadge = (val, label) => {
    const isYes = val === 'Yes';
    return (
      <span className={`mini-check-badge ${isYes ? 'yes' : 'no'}`} style={{ whiteSpace: 'nowrap' }}>
        {isYes ? '✓' : '✗'} {label}
      </span>
    );
  };

  return (
    <table className="report-table detailed-checklist-report" style={{ minWidth: '100%' }}>
      <thead>
        <tr>
          <th className="sticky-date">{language === 'zh' ? '线别与日期' : 'Line & Date'}</th>
          <th>{language === 'zh' ? '线别状态' : 'Line Status'}</th>
          <th>{language === 'zh' ? '文档状态' : 'Doc Status'}</th>
          <th>{language === 'zh' ? '提交与审批记录' : 'Audit Timeline'}</th>
          <th>{language === 'zh' ? '程序与钢网信息' : 'Program & Tooling'}</th>
          <th>{language === 'zh' ? '条码校验' : 'Barcode Verifications'}</th>
          <th>{language === 'zh' ? '工单与追溯' : 'Workorders & Traceability'}</th>
          {isSuperAdmin && <th style={{ textAlign: 'center' }}>{language === 'zh' ? '操作' : 'Actions'}</th>}
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
                  title={language === 'zh' ? '工程师修改过此项' : 'Modified by Engineer'} 
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
                  ✏️ {language === 'zh' ? '已修改' : 'Edited'}
                </span>
              );
            } catch(e) {
              return null;
            }
          };

          const mainRow = (
            <tr 
              key={row.id} 
              onClick={() => {
                if (row.status !== 'Not Filled' && row.status !== 'Line Not Installed') {
                  setExpandedRowId(isExpanded ? null : row.id);
                }
              }}
              style={{ cursor: (row.status !== 'Not Filled' && row.status !== 'Line Not Installed') ? 'pointer' : 'default' }}
              className={isExpanded ? 'expanded-parent-row' : ''}
            >
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
                      {language === 'zh' ? '未安装' : 'Not Installed'}
                    </span>;
                  }
                  if (row.status === 'Not Filled') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                      {language === 'zh' ? '未提交' : 'Not Filled'}
                    </span>;
                  }
                  if (row.approval_status === 'ENG_PENDING') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontWeight: 700 }}>
                      ⏳ {language === 'zh' ? '待审核' : 'Review'}
                    </span>;
                  }
                  if (row.approval_status === 'DISAPPROVED') {
                    return <span className="status-mark" style={{ minWidth: '95px', background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', fontWeight: 700 }}>
                      ❌ {language === 'zh' ? '被驳回' : 'Disapproved'}
                    </span>;
                  }
                  return <span className="status-mark checked" style={{ minWidth: '95px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontWeight: 700 }}>
                    🟢 {language === 'zh' ? '已批准' : 'Approved'}
                  </span>;
                })()}
                {renderModifyIndicator(['status'])}
              </td>
              <td>
                {row.status === 'Not Filled' ? '—' : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.8rem' }}>
                    {row.submitted_by && (
                      <span style={{ color: '#334155' }}>
                        👤 <strong>{language === 'zh' ? '提交' : 'Sub'}:</strong> {row.submitted_by} 
                        <span style={{ color: '#64748b', fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                          ({formatDateTime(row.created_at)})
                        </span>
                      </span>
                    )}
                    {row.approval_status === 'APPROVED' && (
                      <span style={{ color: '#166534', fontWeight: 500 }}>
                        ✓ <strong>{language === 'zh' ? '审批' : 'App'}:</strong> {getEngineerDisplay(row.designated_engineer_id)} 
                        <span style={{ color: '#166534', opacity: 0.8, fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                          ({formatDateTime(row.updated_at)})
                        </span>
                      </span>
                    )}
                    {row.approval_status === 'DISAPPROVED' && (
                      <span style={{ color: '#b91c1c', fontWeight: 500 }}>
                        ✗ <strong>{language === 'zh' ? '驳回' : 'Rej'}:</strong> {getEngineerDisplay(row.designated_engineer_id)} 
                        <span style={{ color: '#b91c1c', opacity: 0.8, fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                          ({formatDateTime(row.updated_at)})
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </td>
              <td>
                {row.status === 'Not Filled' ? '—' : (
                  isLineStop ? (
                    <span style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      🛑 {t('cl_status_linestop')}
                    </span>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.82rem' }}>
                      <span style={{ color: '#0f172a', fontWeight: 700 }} title={row.pre_aoi_program_full_name}>
                        💻 {row.pre_aoi_program_full_name ? (row.pre_aoi_program_full_name.length > 22 ? `${row.pre_aoi_program_full_name.substring(0, 20)}...` : row.pre_aoi_program_full_name) : '—'}
                        {renderModifyIndicator(['pre_aoi_program_full_name'])}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                        🔧 A-Stencil: <strong>{row.stencil_serial_no_a_side || '—'}</strong> | B-Stencil: <strong>{row.stencil_serial_no_b_side || '—'}</strong>
                        {renderModifyIndicator(['stencil_serial_no_a_side', 'stencil_serial_no_b_side'])}
                      </span>
                    </div>
                  )
                )}
              </td>
              <td>
                {row.status === 'Not Filled' ? '—' : (
                  isLineStop ? (
                    <span style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      🛑 {t('cl_status_linestop')}
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
                {row.status === 'Not Filled' ? '—' : (
                  isLineStop ? (
                    <span style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      🛑 {t('cl_status_linestop')}
                    </span>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.82rem' }}>
                      <span style={{ color: '#334155' }}>
                        Pre-WO: <strong>{row.workorder_info_pre_aoi || '—'}</strong> | Post-WO: <strong>{row.workorder_info_post_aoi || '—'}</strong>
                        {renderModifyIndicator(['workorder_info_pre_aoi', 'workorder_info_post_aoi'])}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                        Traceability: <strong>{row.aoi_scan_tools_workorder_traceability || '—'}</strong>
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
                    title={language === 'zh' ? '删除记录' : 'Delete Record'}
                  >
                    🗑️
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
                      {language === 'zh' ? '确认人签名' : 'Confirmation Signature'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>
                      {row.confirmation || '—'}
                    </span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? '指定工程师' : 'Designated Engineer'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>
                      {getEngineerDisplay(row.designated_engineer_id)}
                    </span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? '技术员备注' : 'Technician Remarks'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                      {row.remarks || '—'}
                    </span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      {language === 'zh' ? '工程师审核备注' : 'Engineer Remarks'}
                    </strong>
                    <span style={{ fontSize: '0.95rem', color: '#334155' }}>
                      {row.engineer_remarks || '—'}
                    </span>
                  </div>
                  {row.engineer_modified_fields && (
                    <div style={{ gridColumn: 'span 4', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                      <strong style={{ display: 'block', color: '#b91c1c', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
                        {language === 'zh' ? '⚠️ 工程师修改内容记录' : '⚠️ Engineer Modification History'}
                      </strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                        {(() => {
                          try {
                            const diffs = JSON.parse(row.engineer_modified_fields);
                            return diffs.map((diff, index) => (
                              <div key={index} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px rgba(15,23,42,0.02)' }}>
                                <span style={{ fontWeight: 700, color: '#0f172a' }}>{getFieldLabel(diff.field)}:</span>
                                <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontStyle: 'italic' }}>{formatValue(diff.from)}</span>
                                <span style={{ color: '#3b82f6', fontWeight: 900 }}>→</span>
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
