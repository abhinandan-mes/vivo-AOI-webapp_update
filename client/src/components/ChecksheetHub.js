import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import TechnicianChecklist from './TechnicianChecklist';
import FunctionCheckpoint from './FunctionCheckpoint';
import ChangeoverChecksheet from './ChangeoverChecksheet';
import './ChecksheetHub.css';

export default function ChecksheetHub({ user }) {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Default to checklist if no valid hash is provided
  const [activeTab, setActiveTab] = useState('checklist');

  useEffect(() => {
    // Allows deep linking via hash (e.g. /checksheets#checkpoint)
    const hash = location.hash.replace('#', '');
    if (['checklist', 'checkpoint', 'changeover'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/checksheets#${tab}`, { replace: true });
  };

  return (
    <div className="checksheet-hub-container">
      <div className="checksheet-tabs-wrapper">
        <div className="checksheet-tabs">
          <button 
            className={`checksheet-tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => handleTabChange('checklist')}
          >
            📋 {t('nav_checklist')}
          </button>
          <button 
            className={`checksheet-tab-btn ${activeTab === 'checkpoint' ? 'active' : ''}`}
            onClick={() => handleTabChange('checkpoint')}
          >
            🔧 {t('nav_checkpoint')}
          </button>
          <button 
            className={`checksheet-tab-btn ${activeTab === 'changeover' ? 'active' : ''}`}
            onClick={() => handleTabChange('changeover')}
          >
            ⇄ {language === 'zh' ? '换线记录表' : 'Changeover Checksheet'}
          </button>
        </div>
      </div>

      <div className="checksheet-content">
        {activeTab === 'checklist' && <TechnicianChecklist currentUser={user} />}
        {activeTab === 'checkpoint' && <FunctionCheckpoint currentUser={user} />}
        {activeTab === 'changeover' && <ChangeoverChecksheet currentUser={user} />}
      </div>
    </div>
  );
}
