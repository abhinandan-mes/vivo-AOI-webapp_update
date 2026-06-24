import React, { useState } from 'react';
import FunctionCheckpoint from './components/FunctionCheckpoint';
import TechnicianChecklist from './components/TechnicianChecklist';
import Reports from './components/Reports';
import vivoLogo from './assets/vivo-logo.svg';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('checkpoint');

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
          </div>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'checkpoint' && <FunctionCheckpoint />}
        {activeTab === 'checklist' && <TechnicianChecklist />}
        {activeTab === 'reports' && <Reports />}
      </main>

      <footer className="footer">
        <p>&copy; 2024 AOI Inspection System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
