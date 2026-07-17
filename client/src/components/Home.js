import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import apiService from '../services/api';
import './Home.css';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home({ currentUser }) {
  const { t, language } = useLanguage();
  const [sessions, setSessions] = useState([]);
  const [usersSummary, setUsersSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [expandedUser, setExpandedUser] = useState(null);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // New state for Checklist/Checksheet submission statistics
  const [dashboardStats, setDashboardStats] = useState({
    checkpoint: { total: 0, shifts: { day: 0, night: 0 }, groups: {} },
    checklist: { total: 0, shifts: { day: 0, night: 0 }, groups: {} }
  });

  const [sessionToRevoke, setSessionToRevoke] = useState(null);

  // Stats Day picker — defaults to today
  const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdminOrSuper = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  const sortedUsersSummary = useMemo(() => {
    return [...usersSummary].sort((a, b) => {
      const timeA = a.last_login ? new Date(a.last_login).getTime() : 0;
      const timeB = b.last_login ? new Date(b.last_login).getTime() : 0;
      return timeB - timeA;
    });
  }, [usersSummary]);

  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      const timeA = a.login_time ? new Date(a.login_time).getTime() : 0;
      const timeB = b.login_time ? new Date(b.login_time).getTime() : 0;
      return timeB - timeA;
    });
  }, [sessions]);

  const totalPages = Math.ceil((isSuperAdmin ? sortedUsersSummary.length : sortedSessions.length) / itemsPerPage) || 1;
  const paginatedUsers = sortedUsersSummary.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const paginatedSessions = sortedSessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    fetchDashboardData(selectedDate);
  }, []); // eslint-disable-line

  // Refetch stats whenever selectedDate changes
  useEffect(() => {
    fetchDashboardData(selectedDate);
  }, [selectedDate]); // eslint-disable-line

  const fetchDashboardData = async (date) => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch daily submission stats for the selected date
      const statsResponse = await apiService.getDashboardStats(date);
      if (statsResponse.data.success) {
        setDashboardStats({
          checkpoint: statsResponse.data.checkpoint,
          checklist: statsResponse.data.checklist
        });
      }

      // Fetch recent submissions for the new widget
      const recentResponse = await apiService.getRecentSubmissions();
      if (recentResponse.data && recentResponse.data.success) {
        setRecentSubmissions(recentResponse.data.logs || []);
      }

      // 2. Fetch sessions list
      if (isSuperAdmin) {
        const response = await apiService.getAllSessionsSummary();
        setUsersSummary(response.data.users || []);
      } else {
        const response = await apiService.getMySessions();
        setSessions(response.data.sessions || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSessionClick = (sessionId, isCurrent) => {
    setSessionToRevoke({ sessionId, isCurrent });
  };

  const executeRevokeSession = async () => {
    if (!sessionToRevoke) return;
    const { sessionId, isCurrent } = sessionToRevoke;
    try {
      setError('');
      setSuccessMsg('');
      await apiService.revokeSession(sessionId);
      setSuccessMsg(t('home_success_revoke'));
      
      if (isCurrent && sessionId === currentUser?.session_id) {
        window.location.reload();
      } else {
        await fetchDashboardData();
      }
    } catch (err) {
      setError(err.message || t('error'));
    } finally {
      setSessionToRevoke(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return language === 'zh' ? '从未' : 'Never';
    return new Date(dateStr).toLocaleString(language === 'zh' ? 'zh-CN' : undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const toggleUserExpand = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'super_admin': return language === 'zh' ? '超级管理员' : 'Super Admin';
      case 'admin': return language === 'zh' ? '管理员' : 'Admin';
      case 'inspector': return language === 'zh' ? '检验员' : 'Inspector';
      case 'technician': return language === 'zh' ? '技术员' : 'Technician';
      case 'operator': return language === 'zh' ? '操作员' : 'Operator';
      default: return role;
    }
  };

  // Submission statistics computations
  const stats = dashboardStats;
  const checklistTotal = stats.checklist?.total || 0;
  const checkpointTotal = stats.checkpoint?.total || 0;
  const changeoverTotal = stats.changeover?.total || 0;
  const combinedTotal = checklistTotal + checkpointTotal + changeoverTotal;

  // Extract unique active groups from both submissions
  const activeGroups = useMemo(() => {
    const groupsSet = new Set([
      ...Object.keys(stats.checklist?.groups || {}),
      ...Object.keys(stats.checkpoint?.groups || {}),
      ...Object.keys(stats.changeover?.groups || {})
    ]);
    groupsSet.delete('Unknown');
    return Array.from(groupsSet);
  }, [stats]);

  const activeGroupsCount = activeGroups.length || 0;

  // Group breakdown display text
  const groupBreakdownStr = useMemo(() => {
    const combinedGroups = {};
    activeGroups.forEach(g => {
      combinedGroups[g] = (stats.checklist?.groups?.[g] || 0) + (stats.checkpoint?.groups?.[g] || 0) + (stats.changeover?.groups?.[g] || 0);
    });
    const entries = Object.entries(combinedGroups);
    if (entries.length === 0) return language === 'zh' ? '无' : 'None';
    return entries.map(([g, count]) => `${g}: ${count}`).join(' | ');
  }, [activeGroups, stats, language]);

  const totalDay = (stats.checklist?.shifts?.day || 0) + (stats.checkpoint?.shifts?.day || 0) + (stats.changeover?.shifts?.day || 0);
  const totalNight = (stats.checklist?.shifts?.night || 0) + (stats.checkpoint?.shifts?.night || 0) + (stats.changeover?.shifts?.night || 0);

  if (loading && sessions.length === 0 && usersSummary.length === 0) {
    return <div className="home-loading">{t('home_loading')}</div>;
  }

  return (
    <div className="home-container">
      {/* Redesigned Mockup Welcome Banner */}
      <div className="home-header-row">
        <div className="header-greeting-meta">
          <span className="greet-sub-tag">
            <span className="sub-tag-bullet">✦</span> {language === 'zh' ? '欢迎回来' : 'WELCOME BACK'}
          </span>
          <h1>
            <span className="wave-greet-icon">👋</span>
            <span className="greet-name-text">{currentUser?.full_name || 'User'}</span>
          </h1>
        </div>
        <div className="header-pill-badges">
          <div className="unified-header-pill">
            📊 {language === 'zh' ? '统计日期: ' : 'Stats Day: '}
            <input
              type="date"
              className="date-picker-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="unified-header-pill">
            📅 {new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="unified-header-pill role-pill-badge">
            🛡️ {getRoleLabel(currentUser?.role)}
          </div>
        </div>
      </div>

      {successMsg && <div className="home-alert alert-success">{successMsg}</div>}
      {error && <div className="home-alert alert-danger">{error}</div>}

      {/* ── Unified Stat Cards Grid ── */}
      <div className="home-stats-grid">

        {/* Card 1 (Violet): Checklists */}
        <div className="unified-stat-card accent-violet">
          <div className="unified-icon-block icon-violet">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </div>
          <div className="unified-stat-content">
            <span className="unified-stat-label">{language === 'zh' ? '今日检查表' : 'Checklists'}</span>
            <span className="unified-stat-value">{checklistTotal}</span>
            <span className="unified-stat-sub">{language === 'zh' ? `白班: ${stats.checklist.shifts.day} | 夜班: ${stats.checklist.shifts.night}` : `Day: ${stats.checklist.shifts.day} | Night: ${stats.checklist.shifts.night}`}</span>
          </div>
        </div>

        {/* Card 2 (Blue): Checksheets */}
        <div className="unified-stat-card accent-blue">
          <div className="unified-icon-block icon-blue">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
          </div>
          <div className="unified-stat-content">
            <span className="unified-stat-label">{language === 'zh' ? '今日检查点' : 'Checksheets'}</span>
            <span className="unified-stat-value">{checkpointTotal}</span>
            <span className="unified-stat-sub">{language === 'zh' ? `白班: ${stats.checkpoint.shifts.day} | 夜班: ${stats.checkpoint.shifts.night}` : `Day: ${stats.checkpoint.shifts.day} | Night: ${stats.checkpoint.shifts.night}`}</span>
          </div>
        </div>

        {/* Card X (Teal): Changeovers */}
        <div className="unified-stat-card accent-teal">
          <div className="unified-icon-block icon-teal">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/></svg>
          </div>
          <div className="unified-stat-content">
            <span className="unified-stat-label">{language === 'zh' ? '今日换线记录' : 'Changeovers'}</span>
            <span className="unified-stat-value">{changeoverTotal}</span>
            <span className="unified-stat-sub">{language === 'zh' ? `白班: ${stats.changeover?.shifts?.day || 0} | 夜班: ${stats.changeover?.shifts?.night || 0}` : `Day: ${stats.changeover?.shifts?.day || 0} | Night: ${stats.changeover?.shifts?.night || 0}`}</span>
          </div>
        </div>

        {/* Card 3 (Amber): Active Groups */}
        <div className="unified-stat-card accent-amber">
          <div className="unified-icon-block icon-amber">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </div>
          <div className="unified-stat-content">
            <span className="unified-stat-label">{language === 'zh' ? '活跃班组' : 'Active Groups'}</span>
            <span className="unified-stat-value">{activeGroupsCount}</span>
            <span className="unified-stat-sub" title={groupBreakdownStr} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{groupBreakdownStr}</span>
          </div>
        </div>

        {/* Card 4 (Emerald): Combined Total */}
        <div className="unified-stat-card accent-emerald">
          <div className="unified-icon-block icon-emerald">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div className="unified-stat-content">
            <span className="unified-stat-label">{language === 'zh' ? '今日总提交' : 'Combined Total'}</span>
            <span className="unified-stat-value">{combinedTotal}</span>
            <span className="unified-stat-sub">{language === 'zh' ? `白班: ${totalDay} | 夜班: ${totalNight}` : `Day: ${totalDay} | Night: ${totalNight}`}</span>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        {/* Left Column: Recent Submissions Widget */}
        <div className="dashboard-card recent-submissions-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0 }}>{language === 'zh' ? '最近提交活动' : 'Recent Submissions'}</h2>
              <p className="card-subtitle" style={{ margin: '0.2rem 0 0 0' }}>{language === 'zh' ? '最后 10 次检查点或检查表提交。' : 'The last 10 Checkpoint or Checklist submissions.'}</p>
            </div>
            <Link to="/reports" style={{textDecoration: 'none', color: '#2563eb', fontWeight: '600', fontSize: '0.9rem', padding: '0.4rem 0.8rem', background: '#eff6ff', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
              {language === 'zh' ? '查看全部' : 'View All'} <span>&rarr;</span>
            </Link>
          </div>
          
          <div className="recent-submissions-list">
            {recentSubmissions.length === 0 ? (
              <p style={{ color: '#64748b', fontStyle: 'italic', padding: '1rem 0' }}>
                {language === 'zh' ? '未找到最近的提交。' : 'No recent submissions found.'}
              </p>
            ) : (
              recentSubmissions.map(log => {
                const isCheckpoint = log.activity_type === 'CHECKPOINT_SUBMIT';
                const detailsStr = log.details || '';
                
                // Parse line, status, shift, and group from details string
                const lineMatch = detailsStr.match(/Line:\s*([^,]+)/);
                const lineLabel = lineMatch ? lineMatch[1] : '-';
                
                const shiftMatch = detailsStr.match(/Shift:\s*([^,]+)/);
                const shiftLabel = shiftMatch ? (shiftMatch[1] === 'Day' ? t('day') : (shiftMatch[1] === 'Night' ? t('night') : shiftMatch[1])) : '-';
                
                const groupMatch = detailsStr.match(/Group:\s*([^,]+)/);
                const groupLabel = groupMatch ? groupMatch[1] : '-';
                
                const statusMatch = detailsStr.match(/Status:\s*([^,]+)/);
                const statusLabel = statusMatch ? statusMatch[1] : '-';
                
                return (
                  <div key={log.id} className="recent-submission-item detailed-layout">
                    
                    <div className="rs-col rs-type-col">
                      <div className={`recent-icon ${isCheckpoint ? 'icon-checkpoint' : 'icon-checklist'}`}>
                        {isCheckpoint ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15l2 2 4-4"></path></svg>
                        )}
                      </div>
                      <div className="rs-type-info">
                        <span className="rs-title">{isCheckpoint ? (language === 'zh' ? '日常功能点检' : 'Daily Function Check') : (language === 'zh' ? '技术员点检表' : 'Technician Checklist')}</span>
                        <span className="rs-time">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <div className="rs-col">
                      <span className="rs-label">{language === 'zh' ? '产线' : 'Line'}</span>
                      <span className="rs-value">{lineLabel}</span>
                    </div>

                    <div className="rs-col">
                      <span className="rs-label">{language === 'zh' ? '班次' : 'Shift'}</span>
                      <span className="rs-value">{shiftLabel}</span>
                    </div>

                    <div className="rs-col">
                      <span className="rs-label">{language === 'zh' ? '班组' : 'Group'}</span>
                      <span className="rs-value">{groupLabel}</span>
                    </div>

                    <div className="rs-col">
                      <span className="rs-label">{language === 'zh' ? '状态' : 'Status'}</span>
                      <span className={`rs-value status-badge ${statusLabel === 'Production' ? 'badge-prod' : 'badge-stop'}`}>
                        {statusLabel}
                      </span>
                    </div>

                    <div className="rs-col">
                      <span className="rs-label">{language === 'zh' ? '提交者' : 'Submitted By'}</span>
                      <span className="rs-value submitter-value">
                        <span className="rs-avatar">👤</span> {log.full_name || log.username}
                      </span>
                    </div>

                    <div className="rs-col rs-ip-col">
                      {isAdminOrSuper ? (
                        <>
                          <span className="rs-label">IP Address</span>
                          <span className="rs-value">{log.public_ip ? log.public_ip.split(':')[0] : 'Unknown'}</span>
                        </>
                      ) : (
                        <>
                          <span className="rs-label">{language === 'zh' ? '提交时间' : 'Submit Time'}</span>
                          <span className="rs-value">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        </>
                      )}
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Sessions */}
        {isSuperAdmin ? (
          <div className="dashboard-card">
            <div className="card-header">
              <h2>{t('home_sessions_all_title')}</h2>
              <button className="refresh-btn" onClick={fetchDashboardData}>{language === 'zh' ? '同步数据' : 'Sync Data'}</button>
            </div>
            <p className="card-subtitle">{language === 'zh' ? '显示系统中的所有用户、其最后登录详情以及活动登录会话。' : 'Showing all users in the system, their last login details, and active login sessions.'}</p>
            
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>{t('home_th_user')}</th>
                    <th>{t('profile_role')}</th>
                    <th>{language === 'zh' ? '最后登录时间' : 'Last Login Time'}</th>
                    <th>{language === 'zh' ? '最后登录 IP' : 'Last Login IP'}</th>
                    <th>{t('home_active_sessions')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => {
                    const isExpanded = expandedUser === user.id;
                    return (
                      <React.Fragment key={user.id}>
                        <tr className={isExpanded ? 'expanded-row-parent' : ''}>
                          <td>
                            <div className="user-identity">
                              <span className="user-fullname">{user.full_name}</span>
                              <span className="user-username">@{user.username}</span>
                            </div>
                          </td>
                          <td>
                            <span className={`role-badge role-${user.role}`}>{getRoleLabel(user.role)}</span>
                          </td>
                          <td>{formatDate(user.last_login)}</td>
                          <td className="ip-cell">{user.last_ip ? user.last_ip.split(':')[0] : '—'}</td>
                          <td>
                            <span className={`active-sessions-count ${user.active_sessions_count > 0 ? 'has-active' : ''}`}>
                              {user.active_sessions_count} {language === 'zh' ? '个活动' : 'active'}
                            </span>
                          </td>
                          <td>
                            <button 
                              className={`toggle-details-btn ${isExpanded ? 'active' : ''}`}
                              onClick={() => toggleUserExpand(user.id)}
                            >
                              {isExpanded ? (language === 'zh' ? '隐藏详情' : 'Hide Details') : (language === 'zh' ? '管理会话' : 'Manage Sessions')}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="expanded-row-child">
                            <td colSpan="6">
                              <div className="expanded-session-details">
                                <h4>{language === 'zh' ? `${user.full_name} 的活动登录会话` : `Active Sessions for ${user.full_name}`}</h4>
                                {user.active_sessions.length === 0 ? (
                                  <p className="no-active-sessions">{t('home_no_sessions')}</p>
                                ) : (
                                  <table className="nested-sessions-table">
                                    <thead>
                                      <tr>
                                        <th>{t('home_th_ip')}</th>
                                        <th>{t('home_th_login_time')}</th>
                                        <th>Session ID</th>
                                        <th>{language === 'zh' ? '操作' : 'Action'}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {[...user.active_sessions].sort((a, b) => {
                                        const timeA = a.login_time ? new Date(a.login_time).getTime() : 0;
                                        const timeB = b.login_time ? new Date(b.login_time).getTime() : 0;
                                        return timeB - timeA;
                                      }).map(session => {
                                        const isMyCurrent = session.session_id === currentUser?.session_id;
                                        return (
                                          <tr key={session.session_id} className={isMyCurrent ? 'highlight-session' : ''}>
                                            <td className="ip-cell">
                                              <div className="ip-wrapper">
                                                {session.public_ip ? session.public_ip.split(':')[0] : 'Unknown'}
                                                {isMyCurrent && <span className="current-badge">{language === 'zh' ? '当前会话' : 'Your Current Session'}</span>}
                                              </div>
                                            </td>
                                            <td>{formatDate(session.login_time)}</td>
                                            <td className="session-id-cell"><span title={session.session_id}>{session.session_id.slice(0, 8)}&hellip;</span></td>
                                            <td>
                                              <button
                                                className="revoke-btn-danger"
                                                onClick={() => handleRevokeSessionClick(session.session_id, isMyCurrent)}
                                              >
                                                {language === 'zh' ? '强制下线' : 'Terminate'}
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {language === 'zh' ? `显示 ${Math.min(sortedUsersSummary.length, (currentPage - 1) * itemsPerPage + 1)} - ${Math.min(sortedUsersSummary.length, currentPage * itemsPerPage)} 条，共 ${sortedUsersSummary.length} 条` : `Showing ${Math.min(sortedUsersSummary.length, (currentPage - 1) * itemsPerPage + 1)} - ${Math.min(sortedUsersSummary.length, currentPage * itemsPerPage)} of ${sortedUsersSummary.length} users`}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: currentPage === 1 ? '#f8fafc' : 'white', color: currentPage === 1 ? '#94a3b8' : '#334155', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}
                  >
                    {language === 'zh' ? '上一页' : 'Previous'}
                  </button>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: currentPage === totalPages ? '#f8fafc' : 'white', color: currentPage === totalPages ? '#94a3b8' : '#334155', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}
                  >
                    {language === 'zh' ? '下一页' : 'Next'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="dashboard-card">
            <div className="card-header">
              <h2>{t('home_sessions_title')}</h2>
              <button className="refresh-btn" onClick={fetchDashboardData}>{language === 'zh' ? '同步数据' : 'Sync Data'}</button>
            </div>
            <p className="card-subtitle">{language === 'zh' ? '为您账户记录的所有登录会话列表。您可以终止其他活动会话以保护您的账户安全。' : 'A list of all login sessions recorded for your account. You can terminate other active sessions to secure your account.'}</p>

            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>{t('home_th_status')}</th>
                    <th>{t('home_th_login_time')}</th>
                    <th>{language === 'zh' ? '登出时间' : 'Logout Time'}</th>
                    <th>{t('home_th_ip')}</th>
                    <th>Session ID</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSessions.map((session) => {
                    const isActive = session.status === 'active';
                    const isCurrent = session.session_id === currentUser?.session_id;
                    return (
                      <tr key={session.session_id} className={isCurrent ? 'highlight-session' : ''}>
                        <td>
                          <div className="status-cell">
                            <span className={`session-status-dot status-${session.status}`}></span>
                            <span className="status-text capitalize">
                              {isCurrent ? (language === 'zh' ? '活动 (当前)' : 'Active (Current)') : (session.status === 'active' ? (language === 'zh' ? '活动' : 'Active') : (language === 'zh' ? '已注销' : 'Logged Out'))}
                            </span>
                          </div>
                        </td>
                        <td>{formatDate(session.login_time)}</td>
                        <td>{isActive ? '—' : formatDate(session.logout_time)}</td>
                        <td className="ip-cell">{session.public_ip ? session.public_ip.split(':')[0] : '—'}</td>
                        <td className="session-id-cell"><span title={session.session_id}>{session.session_id.slice(0, 8)}&hellip;</span></td>
                        <td>
                          {isActive ? (
                            <button
                              className="revoke-btn-danger"
                              onClick={() => handleRevokeSessionClick(session.session_id, isCurrent)}
                              disabled={isCurrent}
                              title={isCurrent ? (language === 'zh' ? "您无法在此终止当前会话，请使用注销按钮。" : "You cannot terminate your current session from here. Use the standard Logout.") : (language === 'zh' ? "远程终止此会话" : "Terminate this session remotely")}
                            >
                              {isCurrent ? (language === 'zh' ? '当前会话' : 'Current Session') : (language === 'zh' ? '下线' : 'Terminate')}
                            </button>
                          ) : (
                            <span className="logged-out-placeholder">{language === 'zh' ? '已结束' : 'Ended'}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {language === 'zh' ? `显示 ${Math.min(sortedSessions.length, (currentPage - 1) * itemsPerPage + 1)} - ${Math.min(sortedSessions.length, currentPage * itemsPerPage)} 条，共 ${sortedSessions.length} 条` : `Showing ${Math.min(sortedSessions.length, (currentPage - 1) * itemsPerPage + 1)} - ${Math.min(sortedSessions.length, currentPage * itemsPerPage)} of ${sortedSessions.length} sessions`}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: currentPage === 1 ? '#f8fafc' : 'white', color: currentPage === 1 ? '#94a3b8' : '#334155', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}
                  >
                    {language === 'zh' ? '上一页' : 'Previous'}
                  </button>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: currentPage === totalPages ? '#f8fafc' : 'white', color: currentPage === totalPages ? '#94a3b8' : '#334155', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}
                  >
                    {language === 'zh' ? '下一页' : 'Next'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!sessionToRevoke}
        title={language === 'zh' ? '撤销会话' : 'Revoke Session'}
        message={sessionToRevoke?.isCurrent ? t('home_confirm_revoke_current') : t('home_confirm_revoke_other')}
        onConfirm={executeRevokeSession}
        onCancel={() => setSessionToRevoke(null)}
        confirmText={language === 'zh' ? '强制下线' : 'Terminate'}
        cancelText={language === 'zh' ? '取消' : 'Cancel'}
        type="danger"
      />
    </div>
  );
}
