import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import FunctionCheckpoint from './components/FunctionCheckpoint';
import TechnicianChecklist from './components/TechnicianChecklist';
import Reports from './components/Reports';
import LoginPage from './components/LoginPage';
import UserManagement from './components/UserManagement';
import Home from './components/Home';
import apiService, { authStorage } from './services/api';
import vivoLogo from './assets/vivo-logo.svg';
import './App.css';
import ProfileModal from './components/ProfileModal';

function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();

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

  const handleLogin = async credentials => {
    const response = await apiService.login(credentials);
    authStorage.setToken(response.data.token);
    setUser(response.data.user);
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Failed to logout on server:', error);
    } finally {
      authStorage.clearToken();
      setUser(null);
      navigate('/');
    }
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
            <NavLink
              to="/"
              className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/checklist"
              className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
            >
              Technician Checklist
            </NavLink>
            <NavLink
              to="/checkpoint"
              className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
            >
              Daily Function Check
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
            >
              Reports
            </NavLink>
            {(user.role === 'super_admin' || user.role === 'admin') && (
              <NavLink
                to="/users"
                className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
              >
                User Management
              </NavLink>
            )}
          </div>
          <div className="user-menu">
            <button 
              type="button" 
              className="profile-btn" 
              onClick={() => setShowProfileModal(true)}
              title="View profile & change password"
            >
              👤 {user.full_name}
            </button>
            <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
            
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home currentUser={user} />} />
          <Route path="/checkpoint" element={<FunctionCheckpoint currentUser={user} />} />
          <Route path="/checklist" element={<TechnicianChecklist currentUser={user} />} />
          <Route path="/reports" element={<Reports />} />
          {(user.role === 'super_admin' || user.role === 'admin') ? (
            <Route path="/users" element={<UserManagement currentUser={user} />} />
          ) : null}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>Designed &amp; Maintained by Abhinandan Kumar (95003989)</p>
      </footer>

      {showProfileModal && (
        <ProfileModal user={user} onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  );
}

export default App;
