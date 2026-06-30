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

  return (
    <main className="login-page">
      <section className="login-shell">
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
        <div className="login-brand">
          <img src={vivoLogo} alt="vivo" />
          <span aria-hidden="true"></span>
          <strong>AOI Digital Checksheet</strong>
        </div>
        <div className="login-copy">
          <h1>{t('login_title')}</h1>
          <p>{t('login_desc')}</p>
        </div>
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
                type={showPassword ? "text" : "password"}
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
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
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
      </section>
    </main>
  );
}
