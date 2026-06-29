import React, { useEffect, useState } from 'react';
import FunctionCheckpoint from './components/FunctionCheckpoint';
import TechnicianChecklist from './components/TechnicianChecklist';
import Reports from './components/Reports';
import LoginPage from './components/LoginPage';
import UserManagement from './components/UserManagement';
import apiService, { authStorage } from './services/api';
import vivoLogo from './assets/vivo-logo.svg';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('checkpoint');
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const expireSession = () => setUser(null);
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
        if (active) setUser(response.data.user);
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

  const handleLogin = async credentials => {
    const response = await apiService.login(credentials);
    authStorage.setToken(response.data.token);
    setUser(response.data.user);
  };

  const handleLogout = () => {
    authStorage.clearToken();
    setUser(null);
    setActiveTab('checkpoint');
  };

  if (checkingSession) {
    return <div className="auth-loading">Loading AOI CheckPoint...</div>;
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img className="vivo-logo" src={vivoLogo} alt="vivo" />
            <span className="logo-divider" aria-hidden="true"></span>
            <span className="logo-text">AOI CheckPoint</span>
          </div>
          <div className="navbar-tabs">
            <button
              className={`tab ${activeTab === 'checkpoint' ? 'active' : ''}`}
              onClick={() => setActiveTab('checkpoint')}
            >
              Daily Function Check
            </button>
            <button
              className={`tab ${activeTab === 'checklist' ? 'active' : ''}`}
              onClick={() => setActiveTab('checklist')}
            >
              Technician Checklist
            </button>
            <button
              className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
            {(user.role === 'super_admin' || user.role === 'admin') && (
              <button
                className={`tab ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                User Management
              </button>
            )}
          </div>
          <div className="user-menu">
            <span>{user.full_name}</span>
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'checkpoint' && <FunctionCheckpoint />}
        {activeTab === 'checklist' && <TechnicianChecklist />}
        {activeTab === 'reports' && <Reports />}
        {(user.role === 'super_admin' || user.role === 'admin') && activeTab === 'users' && <UserManagement currentUser={user} />}
      </main>

      <footer className="footer">
        <p>Designed &amp; Maintained by Abhinandan Kumar (95003989)</p>
      </footer>
    </div>
  );
}

export default App;
