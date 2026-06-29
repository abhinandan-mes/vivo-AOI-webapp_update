import React, { useEffect, useMemo, useState } from 'react';
import apiService from '../services/api';
import './Reports.css';

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

const checkpointColumns = checkpointGroups.flatMap(group => group.positions.map(position => ({
  key: `${group.prefix}_${position.key}`,
  label: `${group.label} - ${position.label}`
})));

const checklistColumns = [
  ['Date', 'date'], ['Line', 'line'], ['Group', 'group_name'], ['Shift', 'shift'],
  ['Program', 'pre_aoi_program_full_name'], ['Stencil B Side', 'stencil_serial_no_b_side'], ['Stencil A Side', 'stencil_serial_no_a_side'],
  ['B Side Laser', 'barcode_read_a_layer'], ['B Side SPI', 'barcode_read_a_spi'],
  ['A Side Laser', 'barcode_read_b_layer'], ['A Side SPI', 'barcode_read_b_spi'],
  ['Pre-AOI Workorder', 'workorder_info_pre_aoi'], ['Post-AOI Workorder', 'workorder_info_post_aoi'],
  ['Traceability', 'aoi_scan_tools_workorder_traceability'], ['Confirmed', 'confirmation']
];

const shiftOptions = ['Day', 'Night'];
const groupOptions = ['A', 'B', 'C'];
const lineOptions = Array.from({ length: 25 }, (_, index) => String(401 + index));

const text = value => value === null || value === undefined || value === '' ? '—' : value;
const dateKey = value => {
  if (!value) return '';
  const date = new Date(value);
  const pad = number => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
const formatDate = value => value ? new Date(value).toLocaleDateString() : '—';
const reportTitle = reportType => reportType === 'checkpoint' ? 'Daily Function Checks' : 'Technician Checklists';
const reportFileName = reportType => reportType === 'checkpoint' ? 'daily-function-checks' : 'technician-checklists';
const getExportColumns = reportType => reportType === 'checkpoint'
  ? [['Date', 'date'], ['Line', 'line'], ['Group', 'group_name'], ['Shift', 'shift'], ['Responsible Person', 'responsible_person'], ['Time', 'time'], ...checkpointColumns.map(column => [column.label, column.key])]
  : checklistColumns;
const isCheckpointColumn = key => checkpointColumns.some(column => column.key === key);
const exportValue = (row, key, reportType) => {
  if (key === 'date') return dateKey(row[key]);
  if (reportType === 'checkpoint' && isCheckpointColumn(key)) return row[key] ? 'Checked' : 'Not checked';
  return row[key] ?? '';
};
const escapeHtml = value => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

export default function Reports() {
  const [reportType, setReportType] = useState('checkpoint');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ from: '', to: '', line: '', shift: '', group: '' });

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setFilters({ from: '', to: '', line: '', shift: '', group: '' });
    const request = reportType === 'checkpoint'
      ? apiService.getAllCheckpoints()
      : apiService.getAllChecklists();
    request
      .then(response => active && setRows(response.data.data || []))
      .catch(err => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [reportType]);

  const filteredRows = useMemo(() => rows.filter(row => {
    const date = dateKey(row.date);
    return (!filters.from || date >= filters.from)
      && (!filters.to || date <= filters.to)
      && (!filters.line || row.line === filters.line)
      && (!filters.shift || row.shift === filters.shift)
      && (!filters.group || row.group_name === filters.group);
  }), [rows, filters]);

  const updateFilter = event => setFilters(current => ({ ...current, [event.target.name]: event.target.value }));

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
    const generatedDate = new Date().toLocaleString();
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
          <p>Generated ${escapeHtml(generatedDate)} · ${filteredRows.length} record${filteredRows.length === 1 ? '' : 's'}</p>
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

  const handleExport = event => {
    const format = event.target.value;
    const label = format === 'csv' ? 'CSV' : format === 'pdf' ? 'PDF' : '';
    const shouldExport = label && window.confirm(`Export ${filteredRows.length} ${reportTitle(reportType)} record${filteredRows.length === 1 ? '' : 's'} as ${label}?`);
    if (!shouldExport) {
      event.target.value = '';
      return;
    }
    if (format === 'csv') downloadCsv();
    if (format === 'pdf') exportPdf();
    event.target.value = '';
  };

  return (
    <section className="reports-container">
      <div className="reports-heading">
        <div><h1>Reports</h1><p>Detailed records stored in the backend.</p></div>
        <label className="report-picker">Report
          <select value={reportType} onChange={event => setReportType(event.target.value)}>
            <option value="checkpoint">Daily Function Checks</option>
            <option value="checklist">Technician Checklists</option>
          </select>
        </label>
      </div>

      <div className="report-filters">
        <label>From<input type="date" name="from" value={filters.from} onChange={updateFilter} /></label>
        <label>To<input type="date" name="to" value={filters.to} onChange={updateFilter} /></label>
        <label>Line<select name="line" value={filters.line} onChange={updateFilter}><option value="">All lines</option>{lineOptions.map(line => <option key={line}>{line}</option>)}</select></label>
        <label>Shift<select name="shift" value={filters.shift} onChange={updateFilter}><option value="">All shifts</option>{shiftOptions.map(shift => <option key={shift}>{shift}</option>)}</select></label>
        <label>Group<select name="group" value={filters.group} onChange={updateFilter}><option value="">All groups</option>{groupOptions.map(group => <option key={group}>{group}</option>)}</select></label>
        <button className="clear-filters" type="button" onClick={() => setFilters({ from: '', to: '', line: '', shift: '', group: '' })}>Clear</button>
        <label className="export-picker">Export
          <select defaultValue="" onChange={handleExport} disabled={!filteredRows.length}>
            <option value="" disabled>Choose format</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
        </label>
      </div>

      {!loading && !error && <div className="result-count">Showing {filteredRows.length} of {rows.length} records</div>}
      {loading && <div className="report-state">Loading report…</div>}
      {error && <div className="report-state error">Could not load report: {error}</div>}
      {!loading && !error && rows.length === 0 && <div className="report-state">No records have been submitted yet.</div>}
      {!loading && !error && rows.length > 0 && filteredRows.length === 0 && <div className="report-state">No records match these filters.</div>}
      {!loading && !error && filteredRows.length > 0 && (
        <div className="report-table-wrap">
          {reportType === 'checkpoint' ? <CheckpointReport rows={filteredRows} /> : <ChecklistReport rows={filteredRows} />}
        </div>
      )}
    </section>
  );
}

function CheckpointReport({ rows }) {
  return <table className="report-table detailed-checkpoint-report">
    <thead>
      <tr>
        <th rowSpan="2" className="sticky-date">Date</th><th rowSpan="2" className="sticky-line">Line</th><th rowSpan="2" className="sticky-group">Group</th>
        <th rowSpan="2">Shift</th><th rowSpan="2">Responsible</th><th rowSpan="2">Time</th>
        {checkpointGroups.map(group => <th key={group.prefix} colSpan={group.positions.length} className="function-heading">{group.label}</th>)}
      </tr>
      <tr>{checkpointGroups.flatMap(group => group.positions.map(position => <th key={`${group.prefix}_${position.key}`} title={position.label}>{position.short}</th>))}</tr>
    </thead>
    <tbody>{rows.map(row => <tr key={row.id}>
      <td className="sticky-date">{formatDate(row.date)}</td><td className="sticky-line">{text(row.line)}</td><td className="sticky-group">{text(row.group_name)}</td>
      <td>{text(row.shift)}</td><td>{text(row.responsible_person)}</td><td>{text(row.time)}</td>
      {checkpointColumns.map(column => <td key={column.key} className="check-status-cell"><span className={`status-mark ${row[column.key] ? 'checked' : 'not-checked'}`} title={row[column.key] ? 'Checked' : 'Not checked'}>{row[column.key] ? '✓ Yes' : '— No'}</span></td>)}
    </tr>)}</tbody>
  </table>;
}

function ChecklistReport({ rows }) {
  return <table className="report-table"><thead><tr>{checklistColumns.map(([label]) => <th key={label}>{label}</th>)}</tr></thead><tbody>
    {rows.map(row => <tr key={row.id}>{checklistColumns.map(([label, key]) => <td key={key}>{key === 'date' ? formatDate(row[key]) : text(row[key])}</td>)}</tr>)}
  </tbody></table>;
}
