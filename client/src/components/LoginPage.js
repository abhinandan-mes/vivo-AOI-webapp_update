import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import vivoLogo from '../assets/vivo-logo.svg';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
  const { language, changeLanguage, t } = useLanguage();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials(current => ({ ...current, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onLogin({
        username: credentials.username,
        password: credentials.password
      });
    } catch (err) {
      setError(err.message || t('login_error_default'));
    } finally {
      setLoading(false);
    }
  };

  const EyeOpen = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const EyeOff = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  return (
    <main className="login-page">
      <section className="login-shell">

        {/* Language Switcher */}
        <div className="login-lang-selector">
          <button
            type="button"
            className={`login-lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={`login-lang-btn ${language === 'zh' ? 'active' : ''}`}
            onClick={() => changeLanguage('zh')}
          >
            中文
          </button>
        </div>

        {/* Brand Row — left panel top */}
        <div className="login-brand">
          <img src={vivoLogo} alt="vivo" />
          <span aria-hidden="true" />
          <strong>AOI Digital Checksheet</strong>
        </div>

        {/* Hero Copy — left panel */}
        <div className="login-copy">
          <div className="login-copy-badge">
            {language === 'zh' ? '✦ 企业检查系统' : '✦ Enterprise Inspection System'}
          </div>
          <h1>{t('login_title')}</h1>
          <p>{t('login_desc')}</p>
          <div className="login-copy-features">
            {(language === 'zh'
              ? ['日常功能检查点', '技术员安全检查清单', '实时会话管理', '基于角色的访问控制']
              : ['Daily function checkpoints', 'Technician safety checklists', 'Real-time session management', 'Role-based access control']
            ).map(f => (
              <div className="login-copy-feature" key={f}>
                <span className="login-copy-feature-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Form — right panel */}
        <div className="login-form-panel">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-heading">
              <h2>{t('login_secure_heading')}</h2>
              <p>{t('login_authorized_only')}</p>
            </div>

            <div className="form-group-accessible">
              <label htmlFor="username-input">{t('login_username')}</label>
              <input
                id="username-input"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                autoComplete="username"
                placeholder={t('login_username_placeholder')}
                required
              />
            </div>

            <div className="form-group-accessible">
              <label htmlFor="password-input">{t('login_password')}</label>
              <div className="password-input-container">
                <input
                  id="password-input"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder={t('login_password_placeholder')}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading || !credentials.username || !credentials.password}>
              {loading ? t('login_btn_loading') : t('login_btn')}
            </button>

            <div className="login-forgot-pwd">
              {t('login_forgot_pwd')}
            </div>

            {error && <div className="login-error">{error}</div>}
          </form>
        </div>

      </section>
    </main>
  );
}
