import React, { useState } from 'react';
import vivoLogo from '../assets/vivo-logo.svg';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError(err.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-brand">
          <img src={vivoLogo} alt="vivo" />
          <span aria-hidden="true"></span>
          <strong>AOI CheckPoint</strong>
        </div>
        <div className="login-copy">
          <h1>AOI Inspection Console</h1>
          <p>Sign in to manage daily function checkpoints, technician checklists, and inspection reports.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-heading">
            <h2>Secure Login</h2>
            <p>Authorized access only</p>
          </div>
          <label>Username
            <input
              name="username"
              value={credentials.username}
              onChange={handleChange}
              autoComplete="username"
              placeholder="Enter username"
              required
            />
          </label>
          <label>Password
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Enter password"
              required
            />
          </label>
          <button type="submit" disabled={loading || !credentials.username || !credentials.password}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>
      </section>
    </main>
  );
}
