import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import ChecksheetHub from './components/ChecksheetHub';
import Reports from './components/Reports';
import LoginPage from './components/LoginPage';
import UserManagement from './components/UserManagement';
import ActivityLog from './components/ActivityLog';
import Home from './components/Home';
import LineManagement from './components/LineManagement';
import apiService, { authStorage } from './services/api';
import vivoLogo from './assets/vivo-logo.svg';
import './App.css';
import ProfileModal from './components/ProfileModal';
import { useLanguage } from './contexts/LanguageContext';
import PendingModule from './components/PendingModule';

function App() {
  const { language, changeLanguage, t } = useLanguage();
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // JWT expiry fired by Axios interceptor — treat as inactivity (preserve redirect)
    const expireSession = () => {
      authStorage.clearToken();
      setUser(null);
      const currentRedirect = window.location.pathname + window.location.search;
      window.location.href = `/login?redirect=${encodeURIComponent(currentRedirect)}`;
    };
    window.addEventListener('aoi-auth-expired', expireSession);
    return () => window.removeEventListener('aoi-auth-expired', expireSession);
  }, []);

  useEffect(() => {
    let active = true;
    const token = authStorage.getToken();
    if (!token) {
      setCheckingSession(false);
      return undefined;
    }

    apiService.getCurrentUser()
      .then(response => {
        if (active) {
          setUser(response.data.user);
        }
      })
      .catch(() => {
        authStorage.clearToken();
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Fetch pending count periodically if user is logged in and not an inspector
  useEffect(() => {
    if (!user || user.role === 'inspector') {
      setPendingCount(0);
      return;
    }

    let isMounted = true;
    const fetchPending = async () => {
      try {
        const [checklistsRes, checkpointsRes, changeoversRes] = await Promise.all([
          apiService.getPendingChecklists(),
          apiService.getPendingCheckpoints(),
          apiService.getPendingChangeoverChecksheets()
        ]);
        if (isMounted) {
          const total = (checklistsRes.data.data?.length || 0) + (checkpointsRes.data.data?.length || 0) + (changeoversRes.data.data?.length || 0);
          setPendingCount(total);
        }
      } catch (err) {
        console.error('Error fetching pending count:', err);
      }
    };

    fetchPending();
    const intervalId = setInterval(fetchPending, 30000); // Check every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [user]);

  const handleLogin = async credentials => {
    const response = await apiService.login(credentials);
    authStorage.setToken(response.data.token);
    setUser(response.data.user);
    
    const searchParams = new URLSearchParams(window.location.search);
    let redirectPath = searchParams.get('redirect');
    if (redirectPath) {
      redirectPath = decodeURIComponent(redirectPath);
      // Prevent Open Redirect vulnerability by enforcing internal paths
      if (!redirectPath.startsWith('/') || redirectPath.startsWith('//')) {
        redirectPath = '/home';
      }
      window.location.href = redirectPath;
    } else {
      window.location.href = '/home';
    }
  };

  // Manual logout — user chose to leave, do NOT preserve redirect
  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Failed to logout on server:', error);
    } finally {
      authStorage.clearToken();
      setUser(null);
      window.location.href = '/login';
    }
  };

  // Inactivity / involuntary logout — preserve current URL so user resumes after login
  const handleIdleLogout = async () => {
    const currentRedirect = window.location.pathname + window.location.search;
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Failed to logout on server:', error);
    } finally {
      authStorage.clearToken();
      setUser(null);
      window.location.href = `/login?redirect=${encodeURIComponent(currentRedirect)}`;
    }
  };

  // Inactivity auto-logout (15 minutes idle threshold + 30 seconds countdown)
  const [showIdleWarning, setShowIdleWarning] = useState(false);
  const [idleCountdown, setIdleCountdown] = useState(30);

  useEffect(() => {
    if (!user) return undefined;

    let idleTimeoutId = null;
    let countdownIntervalId = null;
    const idleThreshold = 15 * 60 * 1000; // 15 minutes

    const startCountdown = () => {
      setShowIdleWarning(true);
      setIdleCountdown(30);

      let timeLeft = 30;
      countdownIntervalId = setInterval(() => {
        timeLeft -= 1;
        setIdleCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(countdownIntervalId);
          handleIdleLogout();
        }
      }, 1000);
    };

    const resetIdleTimer = () => {
      if (idleTimeoutId) clearTimeout(idleTimeoutId);
      idleTimeoutId = setTimeout(() => {
        startCountdown();
      }, idleThreshold);
    };

    const handleUserActivity = () => {
      setShowIdleWarning(prev => {
        if (prev) {
          clearInterval(countdownIntervalId);
          setIdleCountdown(30);
          return false;
        }
        return false;
      });
      resetIdleTimer();
    };

    const activityEvents = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleUserActivity();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resetIdleTimer();

    return () => {
      if (idleTimeoutId) clearTimeout(idleTimeoutId);
      if (countdownIntervalId) clearInterval(countdownIntervalId);
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const handleDeveloperClick = (e) => {
    e.preventDefault();
    const url = "http://localhost:8951/?action=talkapi&toUserCode=95003989";
    const newWindow = window.open(url, "_blank");
    
    if (newWindow) {
      const messageListener = (event) => {
        if (event.origin === "http://localhost:8951") {
          newWindow.close();
          window.removeEventListener("message", messageListener);
        }
      };
      window.addEventListener("message", messageListener);

      setTimeout(() => {
        if (newWindow && !newWindow.closed) {
          newWindow.close();
        }
        window.removeEventListener("message", messageListener);
      }, 2500);
    }
  };

  if (checkingSession) {
    return <div className="auth-loading">{t('nav_loading')}</div>;
  }

  if (!user) {
    return (
      <div className="login-layout-container">
        <main className="login-main-content">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route 
              path="*" 
              element={
                <Navigate 
                  to={`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`} 
                  replace 
                />
              } 
            />
          </Routes>
        </main>
        <footer className="footer login-footer">
          <p>AOI Digital Checksheet &copy; 2026 Vivo</p>
          <p className="footer-credit">
            Designed, Developed &amp; Maintained by{" "}
            <a 
              href="http://localhost:8951/?action=talkapi&toUserCode=95003989" 
              onClick={handleDeveloperClick}
              className="developer-link"
            >
              Abhinandan Kumar
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img className="vivo-logo" src={vivoLogo} alt="vivo" />
            <span className="logo-divider" aria-hidden="true"></span>
            <span className="logo-text">AOI Digital Checksheet</span>
          </div>
          <div className="navbar-tabs">
            <NavLink
              to="/home"
              className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
              end
            >
              {t('nav_home')}
            </NavLink>
            {user.role !== 'inspector' && (
              <NavLink 
                to="/checksheets" 
                className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
              >
                {language === 'zh' ? '提交表单' : 'Checksheets'}
              </NavLink>
            )}
            {user.role !== 'inspector' && pendingCount > 0 && (
              <NavLink
                to="/pending"
                className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
              >
                {t('nav_pending')}
                <span style={{
                  marginLeft: '8px',
                  background: '#ef4444',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {pendingCount}
                </span>
              </NavLink>
            )}
            )}
            <NavLink
              to="/reports"
              className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
            >
              {t('nav_reports')}
            </NavLink>
            {(user.role === 'super_admin' || user.role === 'admin') && (
              <NavLink
                to="/lines"
                className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
              >
                {language === 'zh' ? '产线管理' : 'Line Management'}
              </NavLink>
            )}
            {(user.role === 'super_admin' || user.role === 'admin' || user.role === 'engineer') && (
              <NavLink
                to="/users"
                className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
              >
                {t('nav_users')}
              </NavLink>
            )}
            <NavLink
              to="/logs"
              className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
            >
              {t('nav_activity_logs')}
            </NavLink>
          </div>
          <div className="user-menu">
            <div className="header-lang-selector">
              <button 
                type="button" 
                className={`header-lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <button 
                type="button" 
                className={`header-lang-btn ${language === 'zh' ? 'active' : ''}`}
                onClick={() => changeLanguage('zh')}
              >
                中
              </button>
            </div>
            <button 
              type="button" 
              className="profile-btn" 
              onClick={() => setShowProfileModal(true)}
              title={t('profile_title')}
            >
              👤 <span className="profile-name-text">{user.full_name}</span>
            </button>
          </div>
        </div>
      </nav>
            
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home currentUser={user} />} />
          {user.role !== 'inspector' && (
            <Route path="/checksheets" element={<ChecksheetHub user={user} />} />
          )}
          <Route path="/reports" element={<Reports currentUser={user} />} />
          {user.role !== 'inspector' && (
            <Route path="/pending" element={<PendingModule currentUser={user} />} />
          )}
          {(user.role === 'super_admin' || user.role === 'admin' || user.role === 'engineer') ? (
            <Route path="/users" element={<UserManagement currentUser={user} />} />
          ) : null}
          {(user.role === 'super_admin' || user.role === 'admin') ? (
            <Route path="/lines" element={<LineManagement currentUser={user} />} />
          ) : null}
          <Route path="/logs" element={<ActivityLog currentUser={user} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>AOI Digital Checksheet &copy; 2026 Vivo | V2.16.7.26</p>
        <p className="footer-credit">
          Designed, Developed &amp; Maintained by{" "}
          <a 
            href="http://localhost:8951/?action=talkapi&toUserCode=95003989" 
            onClick={handleDeveloperClick}
            className="developer-link"
          >
            Abhinandan Kumar
          </a>
        </p>
      </footer>

      {showProfileModal && (
        <ProfileModal user={user} onClose={() => setShowProfileModal(false)} onLogout={handleLogout} />
      )}

      {showIdleWarning && (
        <div className="modal-overlay">
          <div className="modal-content inactivity-warning-modal">
            <div className="modal-header">
              <h2>⚠️ {t('idle_warning_title')}</h2>
            </div>
            <div className="modal-body text-center">
              <p>{t('idle_warning_desc', { seconds: idleCountdown })}</p>
              <div className="countdown-progress-bar">
                <div 
                  className="countdown-progress-fill" 
                  style={{ width: `${(idleCountdown / 30) * 100}%` }} 
                />
              </div>
            </div>
            <div className="modal-actions justify-center">
              <button 
                type="button" 
                className="btn-stay" 
                onClick={() => {
                  setShowIdleWarning(false);
                  setIdleCountdown(30);
                }}
              >
                🛡️ {t('idle_btn_stay')}
              </button>
              <button 
                type="button" 
                className="btn-logout-now" 
                onClick={handleIdleLogout}
              >
                🚪 {t('idle_btn_logout')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
