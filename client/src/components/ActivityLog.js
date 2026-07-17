import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import apiService from '../services/api';
import './ActivityLog.css';

// SVG Icons
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const LoginIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);


const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

export default function ActivityLog({ currentUser }) {
  const { t, language } = useLanguage();
  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';
  const isEngineer = currentUser?.role === 'engineer';
  
  const [logs, setLogs] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardStats, setDashboardStats] = useState({ checklistTotal: 0, checkpointTotal: 0 });
  
  // Modal State
  const [selectedLog, setSelectedLog] = useState(null);

  const todayStr = useMemo(() => new Date().toLocaleDateString('en-CA'), []);

  // Filter Selection States
  const [selectedUser, setSelectedUser] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStartDate, setSelectedStartDate] = useState(todayStr);
  const [selectedEndDate, setSelectedEndDate] = useState(todayStr);

  // Active Applied Filters
  const [activeFilters, setActiveFilters] = useState({
    user: 'ALL',
    type: 'ALL',
    startDate: todayStr,
    endDate: todayStr
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalLogins, setTotalLogins] = useState(0);
  const [totalLogouts, setTotalLogouts] = useState(0);
  const [totalFailures, setTotalFailures] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchDashboardStats();
    if (isAdmin || isEngineer) {
      fetchUsers();
    }
  }, [isAdmin, isEngineer]);

  useEffect(() => {
    fetchLogs();
  }, [activeFilters, currentPage]); // Re-fetch on filter or page change

  const filteredUsersList = useMemo(() => {
    if (isAdmin) return usersList;
    if (isEngineer) {
      return usersList.filter(u => ['engineer', 'technician', 'inspector'].includes(u.role));
    }
    return [];
  }, [usersList, isAdmin, isEngineer]);

  const fetchDashboardStats = async () => {
    try {
      const todayStr = new Date().toLocaleDateString('en-CA');
      const response = await apiService.getDashboardStats(todayStr);
      if (response.data && response.data.success) {
        setDashboardStats({
          checkpointTotal: response.data.checkpoint?.total || 0,
          checklistTotal: response.data.checklist?.total || 0
        });
      }
    } catch (err) {
      console.error('Error fetching dashboard stats for Activity Log:', err);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        user: activeFilters.user,
        type: activeFilters.type,
        startDate: activeFilters.startDate,
        endDate: activeFilters.endDate
      };
      
      const response = await apiService.getActivityLogs(params);
      if (response.data && response.data.success) {
        setLogs(response.data.logs || []);
        if (response.data.pagination) {
          setTotalPages(response.data.pagination.totalPages);
          setTotalRecords(response.data.pagination.totalRecords);
        }
        if (response.data.totalLogins !== undefined) {
          setTotalLogins(response.data.totalLogins);
        }
        if (response.data.totalLogouts !== undefined) {
          setTotalLogouts(response.data.totalLogouts);
        }
        if (response.data.totalFailures !== undefined) {
          setTotalFailures(response.data.totalFailures);
        }
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError(err.message || 'Failed to load activity logs.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiService.getAllUsers();
      if (response.data && response.data.success) {
        setUsersList(response.data.users || []);
      }
    } catch (err) {
      console.error('Error fetching users for filter:', err);
    }
  };

  // Helper: Initials avatar generator
  const getUserInitials = (name) => {
    if (!name) return '?';
    const clean = name.trim();
    if (clean.length === 0) return '?';
    // Handle Chinese names or simple names
    if (/[\u4e00-\u9fa5]/.test(clean)) {
      return clean.slice(-2); // Return last two characters
    }
    const parts = clean.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

  // Helper: Deterministic avatar color gradient class based on full_name string hash
  const getAvatarColorClass = (name) => {
    if (!name) return 'avatar-grad-1';
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    const numGradients = 6;
    const index = (sum % numGradients) + 1;
    return `avatar-grad-${index}`;
  };

  // Helper: Activity Pills Mapping
  const getActivityLabel = (type) => {
    switch (type) {
      case 'LOGIN_SUCCESS': return language === 'zh' ? '登录' : 'Login';
      case 'LOGIN_FAILURE': return language === 'zh' ? '失败' : 'Failed';
      case 'LOGOUT': return language === 'zh' ? '注销' : 'Logout';
      case 'USER_CREATE': return language === 'zh' ? '创建' : 'Create';
      case 'USER_UPDATE': return language === 'zh' ? '更新' : 'Update';
      case 'USER_DELETE': return language === 'zh' ? '删除' : 'Delete';
      case 'CHECKLIST_SUBMIT': return language === 'zh' ? '提交' : 'Submit';
      case 'CHECKPOINT_SUBMIT': return language === 'zh' ? '提交' : 'Submit';
      case 'LINE_STATUS_UPDATE': return language === 'zh' ? '管理' : 'Manage';
      default: return type;
    }
  };

  const getActivityBadgeClass = (type) => {
    switch (type) {
      case 'LOGIN_SUCCESS': return 'badge-login';
      case 'LOGIN_FAILURE': return 'badge-failed';
      case 'LOGOUT': return 'badge-logout';
      case 'USER_CREATE': return 'badge-create';
      case 'USER_UPDATE': return 'badge-update';
      case 'USER_DELETE': return 'badge-delete';
      case 'CHECKLIST_SUBMIT': return 'badge-submit';
      case 'CHECKPOINT_SUBMIT': return 'badge-submit';
      case 'LINE_STATUS_UPDATE': return 'badge-system';
      default: return 'badge-default';
    }
  };

  const getEntityLabel = (type) => {
    if (['LOGIN_SUCCESS', 'LOGIN_FAILURE', 'LOGOUT'].includes(type)) return 'Authentication';
    if (['USER_CREATE', 'USER_UPDATE', 'USER_DELETE'].includes(type)) return 'User Management';
    if (type === 'CHECKLIST_SUBMIT') return 'Checklist';
    if (type === 'CHECKPOINT_SUBMIT') return 'Checkpoint';
    if (type === 'LINE_STATUS_UPDATE') return 'Line Management';
    return 'System';
  };

  // Helper: Split Date/Time formatter
  const formatTimestampSplit = (ts) => {
    if (!ts) return { date: '—', time: '' };
    const dateObj = new Date(ts);
    const dateStr = dateObj.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-CA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const timeStr = dateObj.toLocaleTimeString(language === 'zh' ? 'zh-CN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    return { date: dateStr, time: timeStr };
  };

  // Live Summary Cards Calculations
  const totalEvents = totalRecords;
  const loginsCount = totalLogins;

  // Use the actual current database count for today's submissions to sync with Home/Reports
  const todayChecklistCount = dashboardStats.checklistTotal;
  const todayCheckpointCount = dashboardStats.checkpointTotal;

  // Filter Action Handlers
  const handleApplyFilters = () => {
    let start = selectedStartDate;
    let end = selectedEndDate;
    if (!isAdmin) {
      if (!start) start = todayStr;
      if (!end) end = todayStr;
      setSelectedStartDate(start);
      setSelectedEndDate(end);
    }
    setActiveFilters({
      user: selectedUser,
      type: selectedType,
      startDate: start,
      endDate: end
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedUser('ALL');
    setSelectedType('ALL');
    if (isAdmin) {
      setSelectedStartDate('');
      setSelectedEndDate('');
      setActiveFilters({
        user: 'ALL',
        type: 'ALL',
        startDate: '',
        endDate: ''
      });
    } else {
      setSelectedStartDate(todayStr);
      setSelectedEndDate(todayStr);
      setActiveFilters({
        user: 'ALL',
        type: 'ALL',
        startDate: todayStr,
        endDate: todayStr
      });
    }
    setCurrentPage(1);
  };

  // Paginated Logs (Now handled by backend)
  const paginatedLogs = logs;

  return (
    <div className="activity-log-container">
      {/* Header Section */}
      <div className="activity-log-header">
        <div className="header-title">
          <span className="subtitle-admin">
            <span className="sub-tag-bullet">✦</span> {language === 'zh' ? '监控日志' : 'MONITORING'}
          </span>
          <h1>
            <span className="title-icon">⏰</span> {language === 'zh' ? '系统活动日志' : 'Activity Logs'}
          </h1>
          <p>{language === 'zh' ? '跟踪系统操作记录、登录历史和点检提交日志。' : 'Track all system actions and changes'}</p>
        </div>
        <button className="btn-refresh" onClick={fetchLogs} disabled={loading}>
          🔄 {loading ? t('loading') : (language === 'zh' ? '刷新数据' : 'Refresh Logs')}
        </button>
      </div>

      {error && <div className="message error">{error}</div>}

      {/* ── Top Stat Cards Grid ── */}
      <div className="activity-stats-grid">
        <div className="activity-stat-card">
          <div className="card-media card-grad-purple">
            <ClockIcon />
          </div>
          <div className="card-info">
            <span className="card-label">{language === 'zh' ? '总事件数' : 'TOTAL EVENTS'}</span>
            <strong className="card-val">{totalEvents}</strong>
          </div>
        </div>

        <div className="activity-stat-card">
          <div className="card-media card-grad-green">
            <LoginIcon />
          </div>
          <div className="card-info">
            <span className="card-label">{language === 'zh' ? '登录次数' : 'LOGINS'}</span>
            <strong className="card-val">{loginsCount}</strong>
          </div>
        </div>

        <div className="activity-stat-card">
          <div className="card-media card-grad-blue">
            <LogoutIcon />
          </div>
          <div className="card-info">
            <span className="card-label">{language === 'zh' ? '登出次数' : 'LOGOUTS'}</span>
            <strong className="card-val">{totalLogouts}</strong>
          </div>
        </div>

        <div className="activity-stat-card">
          <div className="card-media card-grad-rose">
            <AlertIcon />
          </div>
          <div className="card-info">
            <span className="card-label">{language === 'zh' ? '登录失败' : 'FAILURES'}</span>
            <strong className="card-val">{totalFailures}</strong>
          </div>
        </div>
      </div>

      {/* ── Filter Toolbar ── */}
      <div className="activity-filters-card">
        <div className="filters-card-header">
          <FilterIcon />
          <h3>{language === 'zh' ? '筛选条件' : 'Filter Logs'}</h3>
        </div>
        <div className="filters-grid">
          {isAdmin || isEngineer ? (
            <div className="filter-item">
              <label htmlFor="user-select">{language === 'zh' ? '用户' : 'USER'}</label>
              <select 
                id="user-select" 
                value={selectedUser} 
                onChange={e => setSelectedUser(e.target.value)}
              >
                <option value="ALL">{language === 'zh' ? '所有用户' : 'All Users'}</option>
                {filteredUsersList.map(u => (
                  <option key={u.id} value={u.username}>{u.full_name} ({u.username})</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="filter-item">
              <label>{language === 'zh' ? '用户' : 'USER'}</label>
              <input type="text" value={currentUser?.full_name} disabled className="disabled-input" />
            </div>
          )}

          <div className="filter-item">
            <label htmlFor="type-select">{language === 'zh' ? '活动类型' : 'ACTIVITY TYPE'}</label>
            <select 
              id="type-select" 
              value={selectedType} 
              onChange={e => setSelectedType(e.target.value)}
            >
              <option value="ALL">{language === 'zh' ? '所有类型' : 'All Activities'}</option>
              <option value="LOGIN_SUCCESS">{language === 'zh' ? '成功登录' : 'Login Success'}</option>
              <option value="LOGIN_FAILURE">{language === 'zh' ? '失败登录' : 'Login Failure'}</option>
              <option value="LOGOUT">{language === 'zh' ? '注销退出' : 'Logout'}</option>
              <option value="USER_CREATE">{language === 'zh' ? '创建用户' : 'Create User'}</option>
              <option value="USER_UPDATE">{language === 'zh' ? '更新用户' : 'Update User'}</option>
              <option value="USER_DELETE">{language === 'zh' ? '删除用户' : 'Delete User'}</option>
              <option value="CHECKLIST_SUBMIT">{language === 'zh' ? '提交安全表' : 'Submit Checklist'}</option>
              <option value="CHECKPOINT_SUBMIT">{language === 'zh' ? '提交功能表' : 'Submit Checksheet'}</option>
              <option value="LINE_STATUS_UPDATE">{language === 'zh' ? '产线管理更新' : 'Line Mgmt Update'}</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="start-date-input">{language === 'zh' ? '开始日期' : 'START DATE'}</label>
            <input 
              id="start-date-input"
              type="date" 
              value={selectedStartDate} 
              onChange={e => {
                const val = e.target.value;
                if (!isAdmin && !val) {
                  setSelectedStartDate(todayStr);
                } else {
                  setSelectedStartDate(val);
                }
              }} 
            />
          </div>

          <div className="filter-item">
            <label htmlFor="end-date-input">{language === 'zh' ? '结束日期' : 'END DATE'}</label>
            <input 
              id="end-date-input"
              type="date" 
              value={selectedEndDate} 
              onChange={e => {
                const val = e.target.value;
                if (!isAdmin && !val) {
                  setSelectedEndDate(todayStr);
                } else {
                  setSelectedEndDate(val);
                }
              }} 
            />
          </div>

          <div className="filter-actions-row">
            <button className="btn-apply-filters" onClick={handleApplyFilters}>
              <SearchIcon /> {language === 'zh' ? '查询' : 'Apply'}
            </button>
            <button className="btn-clear-filters" onClick={handleClearFilters}>
              <ClearIcon /> {language === 'zh' ? '重置' : 'Clear'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Logs Table ── */}
      <div className="logs-table-card">
        <div className="table-card-header">
          <div className="header-left">
            <ListIcon />
            <h3>{language === 'zh' ? '日志明细' : 'Log Entries'}</h3>
          </div>
          <div className="header-right">
            <span className="results-badge">
              {language === 'zh' ? `${totalRecords} 条记录` : `${totalRecords} event(s)`}
            </span>
          </div>
        </div>

        <div className="logs-table-wrapper">
          <table className="logs-table">
            <thead>
              <tr>
                <th style={{ width: '12%' }}>{language === 'zh' ? '时间戳' : 'TIMESTAMP'}</th>
                <th style={{ width: '22%' }}>{language === 'zh' ? '用户' : 'USER'}</th>
                <th style={{ width: '10%' }}>{language === 'zh' ? '活动' : 'ACTIVITY'}</th>
                <th style={{ width: '15%' }}>{language === 'zh' ? '所属模块' : 'ENTITY'}</th>
                <th style={{ width: '26%' }}>{language === 'zh' ? '说明' : 'DESCRIPTION'}</th>
                <th style={{ width: '10%' }}>{language === 'zh' ? 'IP地址' : 'IP ADDRESS'}</th>
                <th style={{ width: '5%', textAlign: 'center' }}>{language === 'zh' ? '详情' : 'DETAILS'}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    <div className="logs-spinner">{t('loading')}</div>
                  </td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map(log => {
                  const ts = formatTimestampSplit(log.created_at);
                  const userInitials = getUserInitials(log.full_name || log.username);
                  const colorClass = getAvatarColorClass(log.full_name || log.username);
                  return (
                    <tr key={log.id}>
                      <td>
                        <div className="time-stack">
                          <span className="log-date">{ts.date}</span>
                          <span className="log-time">{ts.time}</span>
                        </div>
                      </td>
                      <td>
                        <div className="log-user-cell">
                          <div className={`log-avatar ${colorClass}`}>{userInitials}</div>
                          <div className="log-user-info">
                            <strong className="log-user-name">{log.full_name || log.username}</strong>
                            {log.email && <span className="log-user-email">{log.email}</span>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`log-pill ${getActivityBadgeClass(log.activity_type)}`}>
                          {getActivityLabel(log.activity_type)}
                        </span>
                      </td>
                      <td>
                        <span className="log-entity-text">{getEntityLabel(log.activity_type)}</span>
                      </td>
                      <td>
                        <span className="log-desc-text" title={log.details}>
                          {log.details || '—'}
                        </span>
                      </td>
                      <td>
                        <code className="log-ip-code">{log.public_ip || '—'}</code>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          className="btn-view-details" 
                          onClick={() => setSelectedLog(log)}
                          title={language === 'zh' ? '查看详情' : 'View Details'}
                        >
                          <EyeIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    {t('act_empty')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        {!loading && totalRecords > 0 && (
          <div className="logs-pagination">
            <button 
              className="page-nav-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ◀
            </button>
            <div className="page-numbers">
              {(() => {
                const pages = [];
                const maxVisible = 7;
                let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                let end = start + maxVisible - 1;
                
                if (end > totalPages) {
                  end = totalPages;
                  start = Math.max(1, end - maxVisible + 1);
                }
                
                for (let i = start; i <= end; i++) {
                  pages.push(
                    <button
                      key={i}
                      className={`page-number-btn ${currentPage === i ? 'active' : ''}`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </button>
                  );
                }
                return pages;
              })()}
            </div>
            <button 
              className="page-nav-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      {/* ── Log Details Modal Overlay ── */}
      {selectedLog && (
        <div className="global-modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="global-modal-content log-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="global-modal-header">
              <h2>{language === 'zh' ? `日志明细 #${selectedLog.id}` : `Log Entry Details #${selectedLog.id}`}</h2>
              <button className="global-modal-close" onClick={() => setSelectedLog(null)}>×</button>
            </div>
            <div className="global-modal-body">
              <div className="details-grid">
                <div className="detail-row">
                  <span className="detail-label">{language === 'zh' ? '事件编号' : 'EVENT ID'}</span>
                  <span className="detail-value"><strong>#{selectedLog.id}</strong></span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">{language === 'zh' ? '用户账号' : 'USERNAME'}</span>
                  <span className="detail-value"><code>{selectedLog.username}</code></span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">{language === 'zh' ? '真实姓名' : 'FULL NAME'}</span>
                  <span className="detail-value">{selectedLog.full_name || '—'}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">{language === 'zh' ? '电子邮箱' : 'EMAIL ADDRESS'}</span>
                  <span className="detail-value">{selectedLog.email || '—'}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">{language === 'zh' ? '活动类型' : 'ACTIVITY TYPE'}</span>
                  <span className="detail-value">
                    <span className={`log-pill ${getActivityBadgeClass(selectedLog.activity_type)}`}>
                      {selectedLog.activity_type}
                    </span>
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">{language === 'zh' ? '时间戳' : 'TIMESTAMP'}</span>
                  <span className="detail-value">{new Date(selectedLog.created_at).toLocaleString()}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">{language === 'zh' ? '客户端IP' : 'CLIENT IP'}</span>
                  <span className="detail-value"><code>{selectedLog.public_ip || '—'}</code></span>
                </div>

                <div className="detail-row full-width">
                  <span className="detail-label">{language === 'zh' ? '事件说明' : 'DESCRIPTION DETAILS'}</span>
                  <div className="detail-description-block">
                    {selectedLog.details || '—'}
                  </div>
                </div>
              </div>
            </div>
            <div className="global-modal-footer">
              <button className="btn-modal-close" onClick={() => setSelectedLog(null)}>
                {language === 'zh' ? '关闭' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
