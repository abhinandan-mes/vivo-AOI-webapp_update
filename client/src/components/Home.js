import React, { useState, useEffect, useMemo } from 'react';
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

  // New state for Checklist/Checksheet submission statistics
  const [dashboardStats, setDashboardStats] = useState({
    checkpoint: { total: 0, shifts: { day: 0, night: 0 }, groups: {} },
    checklist: { total: 0, shifts: { day: 0, night: 0 }, groups: {} }
  });

  const isSuperAdmin = currentUser?.role === 'super_admin';

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch daily submission stats
      const statsResponse = await apiService.getDashboardStats();
      if (statsResponse.data.success) {
        setDashboardStats({
          checkpoint: statsResponse.data.checkpoint,
          checklist: statsResponse.data.checklist
        });
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

  const handleRevokeSession = async (sessionId, isCurrent) => {
    if (isCurrent) {
      if (!window.confirm(t('home_confirm_revoke_current'))) {
        return;
      }
    } else {
      if (!window.confirm(t('home_confirm_revoke_other'))) {
        return;
      }
    }

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
  const checklistTotal = stats.checklist.total;
  const checkpointTotal = stats.checkpoint.total;
  const combinedTotal = checklistTotal + checkpointTotal;

  // Extract unique active groups from both submissions
  const activeGroups = useMemo(() => {
    const groupsSet = new Set([
      ...Object.keys(stats.checklist.groups),
      ...Object.keys(stats.checkpoint.groups)
    ]);
    groupsSet.delete('Unknown');
    return Array.from(groupsSet);
  }, [stats]);

  const activeGroupsCount = activeGroups.length || 0;

  // Group breakdown display text
  const groupBreakdownStr = useMemo(() => {
    const combinedGroups = {};
    activeGroups.forEach(g => {
      combinedGroups[g] = (stats.checklist.groups[g] || 0) + (stats.checkpoint.groups[g] || 0);
    });
    const entries = Object.entries(combinedGroups);
    if (entries.length === 0) return language === 'zh' ? '无' : 'None';
    return entries.map(([g, count]) => `${g}: ${count}`).join(' | ');
  }, [activeGroups, stats, language]);

  const totalDay = stats.checklist.shifts.day + stats.checkpoint.shifts.day;
  const totalNight = stats.checklist.shifts.night + stats.checkpoint.shifts.night;

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
          <div className="date-pill-badge">
            📅 {new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="role-pill-badge">
            🛡️ {getRoleLabel(currentUser?.role)}
          </div>
        </div>
      </div>

      {successMsg && <div className="home-alert alert-success">{successMsg}</div>}
      {error && <div className="home-alert alert-danger">{error}</div>}

      {/* ── Redesigned Stat Cards Grid ── */}
      <div className="home-stats-grid">
        {/* Card 1 (Purple): Checklists */}
        <div className="home-stat-card card-gradient-purple">
          <div className="card-overlay-badges">
            <span className="card-badge-left">{language === 'zh' ? '检查表' : 'Checklists'}</span>
            <span className="card-badge-right">{language === 'zh' ? '今日' : 'Today'}</span>
          </div>
          <div className="card-center-val">
            <span className="card-large-number">{checklistTotal}</span>
            <span className="card-small-label">{language === 'zh' ? '今日检查表提交' : 'TODAY\'S CHECKLISTS'}</span>
          </div>
          <div className="card-bottom-footer">
            <span className="footer-bullet-dot" />
            <span className="footer-label-text">
              {language === 'zh' ? `白班: ${stats.checklist.shifts.day} | 夜班: ${stats.checklist.shifts.night}` : `Day: ${stats.checklist.shifts.day} | Night: ${stats.checklist.shifts.night}`}
            </span>
          </div>
        </div>

        {/* Card 2 (Blue): Checksheets */}
        <div className="home-stat-card card-gradient-blue">
          <div className="card-overlay-badges">
            <span className="card-badge-left">{language === 'zh' ? '功能检查' : 'Checksheets'}</span>
            <span className="card-badge-right">{language === 'zh' ? '今日' : 'Today'}</span>
          </div>
          <div className="card-center-val">
            <span className="card-large-number">{checkpointTotal}</span>
            <span className="card-small-label">{language === 'zh' ? '今日功能检查点' : 'TODAY\'S CHECKSHEETS'}</span>
          </div>
          <div className="card-bottom-footer">
            <span className="footer-bullet-dot" />
            <span className="footer-label-text">
              {language === 'zh' ? `白班: ${stats.checkpoint.shifts.day} | 夜班: ${stats.checkpoint.shifts.night}` : `Day: ${stats.checkpoint.shifts.day} | Night: ${stats.checkpoint.shifts.night}`}
            </span>
          </div>
        </div>

        {/* Card 3 (Rose): Group Breakdown */}
        <div className="home-stat-card card-gradient-rose">
          <div className="card-overlay-badges">
            <span className="card-badge-left">{language === 'zh' ? '班组填报' : 'Groups'}</span>
            <span className="card-badge-right">{language === 'zh' ? '在线' : 'Active'}</span>
          </div>
          <div className="card-center-val">
            <span className="card-large-number">{activeGroupsCount}</span>
            <span className="card-small-label">{language === 'zh' ? '今日活跃班组' : 'ACTIVE GROUPS TODAY'}</span>
          </div>
          <div className="card-bottom-footer">
            <span className="footer-bullet-dot animate-pulse-bullet" />
            <span className="footer-label-text scrollable-footer-text" title={groupBreakdownStr}>
              {groupBreakdownStr}
            </span>
          </div>
        </div>

        {/* Card 4 (Orange): Combined Total */}
        <div className="home-stat-card card-gradient-orange">
          <div className="card-overlay-badges">
            <span className="card-badge-left">{language === 'zh' ? '合并统计' : 'Combined'}</span>
            <span className="card-badge-right">{language === 'zh' ? '今日总数' : 'Total'}</span>
          </div>
          <div className="card-center-val">
            <span className="card-large-number">{combinedTotal}</span>
            <span className="card-small-label">{language === 'zh' ? '今日填报总数' : 'COMBINED SUBMISSIONS'}</span>
          </div>
          <div className="card-bottom-footer">
            <span className="footer-bullet-dot" />
            <span className="footer-label-text">
              {language === 'zh' ? `白班: ${totalDay} | 夜班: ${totalNight}` : `Day: ${totalDay} | Night: ${totalNight}`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
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
                  {sortedUsersSummary.map((user) => {
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
                          <td className="ip-cell">{user.last_ip || '—'}</td>
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
                                                {session.public_ip}
                                                {isMyCurrent && <span className="current-badge">{language === 'zh' ? '当前会话' : 'Your Current Session'}</span>}
                                              </div>
                                            </td>
                                            <td>{formatDate(session.login_time)}</td>
                                            <td className="session-id-cell"><span title={session.session_id}>{session.session_id.slice(0, 8)}&hellip;</span></td>
                                            <td>
                                              <button
                                                className="revoke-btn-danger"
                                                onClick={() => handleRevokeSession(session.session_id, isMyCurrent)}
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
                  {sortedSessions.map((session) => {
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
                        <td className="ip-cell">{session.public_ip}</td>
                        <td className="session-id-cell"><span title={session.session_id}>{session.session_id.slice(0, 8)}&hellip;</span></td>
                        <td>
                          {isActive ? (
                            <button
                              className="revoke-btn-danger"
                              onClick={() => handleRevokeSession(session.session_id, isCurrent)}
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
          </div>
        )}
      </div>
    </div>
  );
}
