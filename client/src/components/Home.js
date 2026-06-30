import React, { useState, useEffect } from 'react';
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

  const isSuperAdmin = currentUser?.role === 'super_admin';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
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
      
      // If user terminated their own current session, let the response interceptor log them out
      // otherwise, refresh dashboard data
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
      case 'super_admin': return t('um_role_super_admin');
      case 'admin': return t('um_role_admin');
      case 'inspector': return t('um_role_inspector');
      case 'technician': return t('um_role_technician');
      default: return role;
    }
  };

  if (loading && sessions.length === 0 && usersSummary.length === 0) {
    return <div className="home-loading">{t('home_loading')}</div>;
  }

  // Calculate quick stats
  const totalUsersCount = usersSummary.length;
  const activeSessionsSystemCount = usersSummary.reduce((acc, u) => acc + (u.active_sessions_count || 0), 0);
  
  const myTotalSessions = sessions.length;
  const myActiveSessions = sessions.filter(s => s.status === 'active').length;
  const currentIp = sessions.find(s => s.session_id === currentUser?.session_id)?.public_ip || 'Unknown';

  return (
    <div className="home-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-info">
          <h1>{t('home_welcome', { name: currentUser?.full_name })}</h1>
          <p>{t('home_logged_as')} <span className={`role-badge role-${currentUser?.role}`}>{getRoleLabel(currentUser?.role)}</span></p>
        </div>
        <div className="welcome-time">
          <span className="current-date-badge">{new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {successMsg && <div className="home-alert alert-success">{successMsg}</div>}
      {error && <div className="home-alert alert-danger">{error}</div>}

      {/* Dashboard Stats */}
      {isSuperAdmin ? (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div className="stat-content">
              <h3>{t('home_total_users')}</h3>
              <p className="stat-number">{totalUsersCount}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <div className="stat-content">
              <h3>{t('home_active_sessions')}</h3>
              <p className="stat-number">{activeSessionsSystemCount}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon sessions-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <div className="stat-content">
              <h3>{t('home_my_total_sessions')}</h3>
              <p className="stat-number">{myTotalSessions}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <div className="stat-content">
              <h3>{t('home_my_active_sessions')}</h3>
              <p className="stat-number">{myActiveSessions}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon ip-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div className="stat-content">
              <h3>{t('home_current_ip')}</h3>
              <p className="stat-number font-small">{currentIp}</p>
            </div>
          </div>
        </div>
      )}

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
                  {usersSummary.map((user) => {
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
                                      {user.active_sessions.map(session => {
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
                  {sessions.map((session) => {
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
