import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './Home.css';

export default function Home({ currentUser }) {
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
      if (!window.confirm('Warning: You are about to terminate your current session. This will log you out immediately. Proceed?')) {
        return;
      }
    } else {
      if (!window.confirm('Are you sure you want to terminate this active session? The user/device will be logged out on their next action.')) {
        return;
      }
    }

    try {
      setError('');
      setSuccessMsg('');
      await apiService.revokeSession(sessionId);
      setSuccessMsg('Session terminated successfully.');
      
      // If user terminated their own current session, let the response interceptor log them out
      // otherwise, refresh dashboard data
      if (isCurrent && sessionId === currentUser?.session_id) {
        window.location.reload();
      } else {
        await fetchDashboardData();
      }
    } catch (err) {
      setError(err.message || 'Failed to terminate session.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleString(undefined, {
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
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'inspector': return 'Inspector';
      case 'technician': return 'Technician';
      default: return role;
    }
  };

  if (loading && sessions.length === 0 && usersSummary.length === 0) {
    return <div className="home-loading">Loading dashboard...</div>;
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
          <h1>Welcome back, {currentUser?.full_name}! 👋</h1>
          <p>Logged in as <span className={`role-badge role-${currentUser?.role}`}>{getRoleLabel(currentUser?.role)}</span></p>
        </div>
        <div className="welcome-time">
          <span className="current-date-badge">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {successMsg && <div className="home-alert alert-success">{successMsg}</div>}
      {error && <div className="home-alert alert-danger">{error}</div>}

      {/* Dashboard Stats */}
      {isSuperAdmin ? (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users-icon">👥</div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-number">{totalUsersCount}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active-icon">⚡</div>
            <div className="stat-content">
              <h3>Active Sessions</h3>
              <p className="stat-number">{activeSessionsSystemCount}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon sessions-icon">💻</div>
            <div className="stat-content">
              <h3>My Total Sessions</h3>
              <p className="stat-number">{myTotalSessions}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active-icon">⚡</div>
            <div className="stat-content">
              <h3>My Active Sessions</h3>
              <p className="stat-number">{myActiveSessions}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon ip-icon">🌐</div>
            <div className="stat-content">
              <h3>Current Session IP</h3>
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
              <h2>User Directory & Sessions</h2>
              <button className="refresh-btn" onClick={fetchDashboardData}>Sync Data</button>
            </div>
            <p className="card-subtitle">Showing all users in the system, their last login details, and active login sessions.</p>
            
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Last Login Time</th>
                    <th>Last Login IP</th>
                    <th>Active Sessions</th>
                    <th>Actions</th>
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
                              {user.active_sessions_count} active
                            </span>
                          </td>
                          <td>
                            <button 
                              className={`toggle-details-btn ${isExpanded ? 'active' : ''}`}
                              onClick={() => toggleUserExpand(user.id)}
                            >
                              {isExpanded ? 'Hide Details' : 'Manage Sessions'}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="expanded-row-child">
                            <td colSpan="6">
                              <div className="expanded-session-details">
                                <h4>Active Sessions for {user.full_name}</h4>
                                {user.active_sessions.length === 0 ? (
                                  <p className="no-active-sessions">No active sessions found for this user.</p>
                                ) : (
                                  <table className="nested-sessions-table">
                                    <thead>
                                      <tr>
                                        <th>IP Address</th>
                                        <th>Login Time</th>
                                        <th>Session ID</th>
                                        <th>Action</th>
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
                                                {isMyCurrent && <span className="current-badge">Your Current Session</span>}
                                              </div>
                                            </td>
                                            <td>{formatDate(session.login_time)}</td>
                                            <td className="session-id-cell">{session.session_id}</td>
                                            <td>
                                              <button
                                                className="revoke-btn-danger"
                                                onClick={() => handleRevokeSession(session.session_id, isMyCurrent)}
                                              >
                                                Terminate
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
              <h2>My Login Sessions</h2>
              <button className="refresh-btn" onClick={fetchDashboardData}>Sync Data</button>
            </div>
            <p className="card-subtitle">A list of all login sessions recorded for your account. You can terminate other active sessions to secure your account.</p>

            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Login Time</th>
                    <th>Logout Time</th>
                    <th>IP Address</th>
                    <th>Session ID</th>
                    <th>Actions</th>
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
                              {isCurrent ? 'Active (Current)' : session.status}
                            </span>
                          </div>
                        </td>
                        <td>{formatDate(session.login_time)}</td>
                        <td>{isActive ? '—' : formatDate(session.logout_time)}</td>
                        <td className="ip-cell">{session.public_ip}</td>
                        <td className="session-id-cell">{session.session_id}</td>
                        <td>
                          {isActive ? (
                            <button
                              className="revoke-btn-danger"
                              onClick={() => handleRevokeSession(session.session_id, isCurrent)}
                              disabled={isCurrent}
                              title={isCurrent ? "You cannot terminate your current session from here. Use the standard Logout." : "Terminate this session remotely"}
                            >
                              {isCurrent ? 'Current Session' : 'Terminate'}
                            </button>
                          ) : (
                            <span className="logged-out-placeholder">Ended</span>
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
