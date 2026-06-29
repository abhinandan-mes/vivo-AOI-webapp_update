import React, { useState } from 'react';
import apiService from '../services/api';
import './ProfileModal.css';

export default function ProfileModal({ user, onClose }) {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await apiService.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });
      setSuccess('Password updated successfully.');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>My Profile & Security</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        </div>
        <div className="modal-body">
          <div className="user-profile-summary">
            <p><strong>Full Name:</strong> {user.full_name}</p>
            <p><strong>Username:</strong> @{user.username}</p>
            <p><strong>Role:</strong> <span className={`role-badge role-${user.role}`}>{user.role.replace('_', ' ')}</span></p>
          </div>
          <hr />
          <form onSubmit={handleSubmit} className="change-password-form">
            <h3>Change Password</h3>
            <label>
              Current Password
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                required
              />
            </label>
            <label>
              New Password
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                required
              />
            </label>
            <label>
              Confirm New Password
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                required
              />
            </label>
            {error && <div className="profile-error">{error}</div>}
            {success && <div className="profile-success">{success}</div>}
            <div className="modal-actions">
              <button type="submit" disabled={loading} className="btn-save">
                {loading ? 'Updating...' : 'Update Password'}
              </button>
              <button type="button" onClick={onClose} className="btn-cancel">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
