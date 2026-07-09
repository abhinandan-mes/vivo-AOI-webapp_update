import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import apiService from '../services/api';
import './ActivityLog.css';

export default function ActivityLog() {
  const { t, language } = useLanguage();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [searchUser, setSearchUser] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.getActivityLogs();
      if (response.data && response.data.success) {
        setLogs(response.data.logs || []);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError(err.message || 'Failed to load activity logs.');
    } finally {
      setLoading(false);
    }
  };

  const getActivityTypeLabel = (type) => {
    switch (type) {
      case 'LOGIN_SUCCESS': return t('act_type_login_success');
      case 'LOGIN_FAILURE': return t('act_type_login_failure');
      case 'CHECKLIST_SUBMIT': return t('act_type_checklist_submit');
      case 'CHECKPOINT_SUBMIT': return t('act_type_checkpoint_submit');
      default: return type;
    }
  };

  const getActivityTypeClass = (type) => {
    switch (type) {
      case 'LOGIN_SUCCESS': return 'badge-login-success';
      case 'LOGIN_FAILURE': return 'badge-login-failure';
      case 'CHECKLIST_SUBMIT': return 'badge-checklist';
      case 'CHECKPOINT_SUBMIT': return 'badge-checkpoint';
      default: return 'badge-default';
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return '—';
    const dateObj = new Date(ts);
    return dateObj.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Filter logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesUser = log.username.toLowerCase().includes(searchUser.toLowerCase().trim());
      const matchesType = filterType === 'ALL' || log.activity_type === filterType;
      return matchesUser && matchesType;
    });
  }, [logs, searchUser, filterType]);

  // Paginated logs
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLogs, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / itemsPerPage));

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchUser, filterType]);

  return (
    <div className="activity-log-container">
      <div className="activity-log-header">
        <div className="header-title">
          <h1>{t('act_title')}</h1>
          <p>{t('act_desc')}</p>
        </div>
        <button className="btn-refresh" onClick={fetchLogs} disabled={loading}>
          🔄 {loading ? t('loading') : (language === 'zh' ? '刷新' : 'Refresh')}
        </button>
      </div>

      {error && <div className="message error">{error}</div>}

      {/* Filter Toolbar */}
      <div className="activity-filters-card">
        <div className="filters-grid">
          <label className="filter-item">
            <span>{t('act_search_user')}</span>
            <input 
              type="text" 
              value={searchUser} 
              onChange={e => setSearchUser(e.target.value)} 
              placeholder={language === 'zh' ? '输入用户名...' : 'Enter username...'}
            />
          </label>

          <label className="filter-item">
            <span>{t('act_filter_type')}</span>
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="ALL">{language === 'zh' ? '全部活动' : 'All Activities'}</option>
              <option value="LOGIN_SUCCESS">{t('act_type_login_success')}</option>
              <option value="LOGIN_FAILURE">{t('act_type_login_failure')}</option>
              <option value="CHECKLIST_SUBMIT">{t('act_type_checklist_submit')}</option>
              <option value="CHECKPOINT_SUBMIT">{t('act_type_checkpoint_submit')}</option>
            </select>
          </label>
        </div>
      </div>

      {/* Table view */}
      <div className="logs-table-card">
        <div className="logs-table-wrapper">
          <table className="logs-table">
            <thead>
              <tr>
                <th>{t('act_th_id')}</th>
                <th>{t('act_th_type')}</th>
                <th>{t('act_th_user')}</th>
                <th>{t('act_th_ip')}</th>
                <th>{t('act_th_time')}</th>
                <th>{t('act_th_details')}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    {t('loading')}
                  </td>
                </tr>
              ) : paginatedLogs.length > 0 ? (
                paginatedLogs.map(log => (
                  <tr key={log.id}>
                    <td><span className="log-id-hash">#{log.id}</span></td>
                    <td>
                      <span className={`log-badge ${getActivityTypeClass(log.activity_type)}`}>
                        {getActivityTypeLabel(log.activity_type)}
                      </span>
                    </td>
                    <td><strong className="log-user">{log.username}</strong></td>
                    <td><code className="log-ip">{log.public_ip || '—'}</code></td>
                    <td><span className="log-time">{formatTimestamp(log.created_at)}</span></td>
                    <td><span className="log-details">{log.details || '—'}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    {t('act_empty')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        {!loading && filteredLogs.length > itemsPerPage && (
          <div className="logs-pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ◀
            </button>
            <span className="page-indicator">
              {language === 'zh' 
                ? `第 ${currentPage} 页，共 ${totalPages} 页 (${filteredLogs.length} 条记录)`
                : `Page ${currentPage} of ${totalPages} (${filteredLogs.length} records)`}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
