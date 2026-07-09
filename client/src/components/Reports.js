import React, { useEffect, useMemo, useState } from 'react';
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

export default function Reports() {
  const { t, language } = useLanguage();
  const [reportType, setReportType] = useState('checklist');
  const [checklists, setChecklists] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ from: '', to: '', line: '', shift: '', group: '' });
  const [showExport, setShowExport] = useState(false);

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

  const shiftOptions = ['Day', 'Night'];
  const groupOptions = ['A', 'B', 'C'];
  const lineOptions = useMemo(() => Array.from({ length: 25 }, (_, index) => String(401 + index)), []);

  const formatDate = value => {
    if (!value) return '—';
    return new Date(value).toLocaleDateString(language === 'zh' ? 'zh-CN' : undefined);
  };

  const formatDateTime = value => {
    if (!value) return '—';
    return new Date(value).toLocaleString(language === 'zh' ? 'zh-CN' : undefined);
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
      return row[key] === 'Line Stop' ? t('cl_status_linestop') : t('cl_status_production');
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

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    
    Promise.all([
      apiService.getAllChecklists(),
      apiService.getAllCheckpoints()
    ])
      .then(([checklistRes, checkpointRes]) => {
        if (active) {
          setChecklists(checklistRes.data.data || []);
          setCheckpoints(checkpointRes.data.data || []);
        }
      })
      .catch(err => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [reportType]);

  const rows = useMemo(() => {
    const data = reportType === 'checkpoint' ? checkpoints : checklists;
    return [...data].sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return timeB - timeA;
    });
  }, [reportType, checklists, checkpoints]);

  const filteredRows = useMemo(() => rows.filter(row => {
    const date = dateKey(row.date);
    return (!filters.from || date >= filters.from)
      && (!filters.to || date <= filters.to)
      && (!filters.line || row.line === filters.line)
      && (!filters.shift || row.shift === filters.shift)
      && (!filters.group || row.group_name === filters.group);
  }), [rows, filters]);

  // Summary metrics date selection states
  const [techSummaryDate, setTechSummaryDate] = useState(() => dateKey(new Date()));
  const [funcSummaryDate, setFuncSummaryDate] = useState(() => dateKey(new Date()));

  // Technician Checklist Today / Selected Date
  const techTodayDoneLines = useMemo(() => {
    const todayRows = checklists.filter(r => dateKey(r.date) === techSummaryDate);
    return Array.from(new Set(todayRows.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [checklists, techSummaryDate, lineOptions]);

  const techTodayPendingLines = useMemo(() => {
    return lineOptions.filter(l => !techTodayDoneLines.includes(l));
  }, [lineOptions, techTodayDoneLines]);

  // Daily Function Check Today / Selected Date
  const funcTodayDoneLines = useMemo(() => {
    const todayRows = checkpoints.filter(r => dateKey(r.date) === funcSummaryDate);
    return Array.from(new Set(todayRows.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [checkpoints, funcSummaryDate, lineOptions]);

  const funcTodayPendingLines = useMemo(() => {
    return lineOptions.filter(l => !funcTodayDoneLines.includes(l));
  }, [lineOptions, funcTodayDoneLines]);

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
    const label = format === 'csv' ? 'CSV' : format === 'pdf' ? 'PDF' : '';
    const confirmMsg = language === 'zh'
      ? `是否将 ${filteredRows.length} 条记录导出为 ${label}？`
      : `Export ${filteredRows.length} ${reportTitle(reportType)} record${filteredRows.length === 1 ? '' : 's'} as ${label}?`;
    
    const shouldExport = label && window.confirm(confirmMsg);
    if (!shouldExport) return;
    if (format === 'csv') downloadCsv();
    if (format === 'pdf') exportPdf();
  };

  const renderSummaryCard = (title, doneLines, pendingLines, colorThemeClass, dateValue, onDateChange) => {
    const totalLines = lineOptions.length;
    const progressPercent = totalLines > 0 ? Math.round((doneLines.length / totalLines) * 100) : 0;
    
    return (
      <div className={`summary-card ${colorThemeClass}`}>
        <div className="summary-card-header">
          <h3>{title}</h3>
          <input 
            type="date"
            className="summary-date-picker"
            value={dateValue}
            onChange={(e) => onDateChange(e.target.value)}
            max={dateKey(new Date())}
            aria-label={`${title} date`}
          />
        </div>
        
        <div className="summary-card-body">
          <div className="summary-metric-row">
            <div className="summary-metric-item">
              <span className="metric-label">{t('rep_summary_submitted')}</span>
              <span className="metric-value done">{doneLines.length} <small>/ {totalLines}</small></span>
            </div>
            <div className="summary-metric-item">
              <span className="metric-label">{t('rep_summary_pending')}</span>
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
              <span className="breakdown-label">{t('rep_summary_submitted')}:</span>
              <div className="line-chips-container">
                {doneLines.length > 0 ? (
                  doneLines.map(line => (
                    <span key={line} className="line-chip done">{line}</span>
                  ))
                ) : (
                  <span className="empty-chips-label">{t('rep_summary_empty')}</span>
                )}
              </div>
            </div>
            
            <div className="line-breakdown-group">
              <span className="breakdown-label">{t('rep_summary_pending')}:</span>
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
        {renderSummaryCard(t('rep_summary_checklist'), techTodayDoneLines, techTodayPendingLines, 'tech-theme', techSummaryDate, setTechSummaryDate)}
        {renderSummaryCard(t('rep_summary_checkpoint'), funcTodayDoneLines, funcTodayPendingLines, 'func-theme', funcSummaryDate, setFuncSummaryDate)}
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
        <label>{t('rep_filter_line')}<select name="line" value={filters.line} onChange={updateFilter}><option value="">{language === 'zh' ? '全部线别' : 'All lines'}</option>{lineOptions.map(line => <option key={line} value={line}>{line}</option>)}</select></label>
        <label>{t('rep_filter_shift')}<select name="shift" value={filters.shift} onChange={updateFilter}><option value="">{language === 'zh' ? '全部班次' : 'All shifts'}</option>{shiftOptions.map(shift => <option key={shift} value={shift}>{shift === 'Day' ? t('day') : t('night')}</option>)}</select></label>
        <label>{t('rep_filter_group')}<select name="group" value={filters.group} onChange={updateFilter}><option value="">{language === 'zh' ? '全部班组' : 'All groups'}</option>{groupOptions.map(group => <option key={group} value={group}>{group}</option>)}</select></label>
        {hasActiveFilters && (
          <button className="clear-filters" type="button" onClick={() => setFilters({ from: '', to: '', line: '', shift: '', group: '' })}>
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
            ? <CheckpointReport rows={filteredRows} checkpointColumns={checkpointColumns} checkpointGroups={checkpointGroups} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} /> 
            : <ChecklistReport rows={filteredRows} checklistColumns={checklistColumns} t={t} language={language} formatDate={formatDate} formatDateTime={formatDateTime} />
          }
        </div>
      )}
    </section>
  );
}

function CheckpointReport({ rows, checkpointColumns, checkpointGroups, t, language, formatDate, formatDateTime }) {
  return <table className="report-table detailed-checkpoint-report">
    <thead>
      <tr>
        <th rowSpan="2" className="sticky-date">{t('date')}</th>
        <th rowSpan="2" className="sticky-line">{t('line')}</th>
        <th rowSpan="2" className="sticky-group">{t('group')}</th>
        <th rowSpan="2">{t('shift')}</th>
        <th rowSpan="2">{t('rep_th_status')}</th>
        <th rowSpan="2">{t('cp_resp_person')}</th>
        <th rowSpan="2">{t('cp_time')}</th>
        <th rowSpan="2">{t('rep_th_submitted_by')}</th>
        <th rowSpan="2">{t('rep_th_submitted_at')}</th>
        {checkpointGroups.map(group => <th key={group.prefix} colSpan={group.positions.length} className="function-heading">{t('label_' + group.prefix)}</th>)}
      </tr>
      <tr>{checkpointGroups.flatMap(group => group.positions.map(position => <th key={`${group.prefix}_${position.key}`} title={t('label_' + group.prefix) + ' - ' + t('cp_th_' + position.key)}>{t('cp_th_' + position.key)}</th>))}</tr>
    </thead>
    <tbody>{rows.map(row => <tr key={row.id}>
      <td className="sticky-date">{formatDate(row.date)}</td>
      <td className="sticky-line">{text(row.line)}</td>
      <td className="sticky-group">{text(row.group_name)}</td>
      <td>{row.shift === 'Day' ? t('day') : (row.shift === 'Night' ? t('night') : text(row.shift))}</td>
      <td>
        <span className={`status-mark ${row.status === 'Line Stop' ? 'not-checked' : 'checked'}`} style={{ minWidth: '76px' }}>
          {row.status === 'Line Stop' ? t('cl_status_linestop') : t('cl_status_production')}
        </span>
      </td>
      <td>{text(row.responsible_person)}</td>
      <td>{text(row.time)}</td>
      <td>{text(row.submitted_by)}</td>
      <td>{formatDateTime(row.created_at)}</td>
      {checkpointColumns.map(column => {
        const isLineStop = row.status === 'Line Stop';
        return (
          <td key={column.key} className="check-status-cell">
            <span className={`status-mark ${isLineStop ? 'not-checked' : (row[column.key] ? 'checked' : 'not-checked')}`} title={isLineStop ? t('cl_status_linestop') : (row[column.key] ? t('yes') : t('no'))}>
              {isLineStop ? `—` : (row[column.key] ? `✓ ${t('yes')}` : `— ${t('no')}`)}
            </span>
          </td>
        );
      })}
    </tr>) }</tbody>
  </table>;
}

function ChecklistReport({ rows, checklistColumns, t, language, formatDate, formatDateTime }) {
  const renderCell = (key, value) => {
    const cleanVal = text(value);
    
    // Localize status display
    if (key === 'status') {
      return (
        <span className={`status-mark ${value === 'Line Stop' ? 'not-checked' : 'checked'}`} style={{ minWidth: '76px' }}>
          {value === 'Line Stop' ? t('cl_status_linestop') : t('cl_status_production')}
        </span>
      );
    }
    // Localize shift display
    if (key === 'shift') {
      return value === 'Day' ? t('day') : (value === 'Night' ? t('night') : cleanVal);
    }
    // Localize confirmation/check values
    if (cleanVal === 'Yes') {
      return <span className="status-mark checked">✓ {t('yes')}</span>;
    }
    if (cleanVal === 'No') {
      return <span className="status-mark not-checked">✗ {t('no')}</span>;
    }
    return cleanVal;
  };

  return (
    <table className="report-table detailed-checklist-report">
      <thead>
        <tr>
          <th rowSpan="2" className="sticky-date">{t('date')}</th>
          <th rowSpan="2" className="sticky-line">{t('line')}</th>
          <th rowSpan="2" className="sticky-group">{t('group')}</th>
          <th rowSpan="2">{t('shift')}</th>
          <th rowSpan="2">{t('rep_th_status')}</th>
          <th rowSpan="2">{t('rep_th_submitted_at')}</th>
          <th rowSpan="2">{t('rep_th_submitted_by')}</th>
          <th className="function-heading">{language === 'zh' ? 'Pre-AOI 程序' : 'Pre-AOI Program'}</th>
          <th colSpan="2" className="function-heading">{language === 'zh' ? '钢网编号' : 'Stencil Serial No'}</th>
          <th colSpan="6" className="function-heading">{language === 'zh' ? '条码读取状态' : 'Barcode Read Information'}</th>
          <th colSpan="3" className="function-heading">{language === 'zh' ? 'AOI 扫描工具' : 'AOI Scan Tools'}</th>
          <th className="function-heading">{t('cl_confirmation')}</th>
        </tr>
        <tr>
          {checklistColumns.slice(7).map(([label]) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            {checklistColumns.map(([label, key]) => (
              <td
                key={key}
                className={key === 'date' ? 'sticky-date' : key === 'line' ? 'sticky-line' : key === 'group_name' ? 'sticky-group' : ''}
              >
                {key === 'date'
                  ? formatDate(row[key])
                  : key === 'created_at'
                    ? formatDateTime(row[key])
                    : renderCell(key, row[key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
