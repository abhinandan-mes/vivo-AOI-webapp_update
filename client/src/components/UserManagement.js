import React, { useState, useEffect, useMemo } from 'react';
import apiService from '../services/api';
import './UserManagement.css';
import { useLanguage } from '../contexts/LanguageContext';

export default function UserManagement({ currentUser }) {
  const { t, language } = useLanguage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showFormPassword, setShowFormPassword] = useState(false);

  // Form state for create/edit
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'inspector'
  });

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdmin = currentUser?.role === 'admin';
  const currentUserId = currentUser?.id;

  const baseRoleOptions = useMemo(() => [
    { value: 'inspector', label: t('um_role_inspector') },
    { value: 'technician', label: t('um_role_technician') }
  ], [t]);

  const roleOptions = useMemo(() => isSuperAdmin
    ? [
        { value: 'super_admin', label: t('um_role_super_admin') },
        { value: 'admin', label: t('um_role_admin') },
        ...baseRoleOptions
      ]
    : baseRoleOptions, [isSuperAdmin, baseRoleOptions, t]);

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiService.getAllUsers();
      setUsers(response.data.users || []);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    }
  };

  const canEditUser = (targetUser) => {
    if (targetUser.id === currentUserId) return true; // Can edit yourself
    if (isSuperAdmin) return true;
    if (isAdmin && ['inspector', 'technician'].includes(targetUser.role)) return true;
    return false;
  };

  const canDeleteUser = (targetUser) => {
    if (targetUser.id === currentUserId) return false; // Can't delete yourself
    if (isSuperAdmin) return true;
    if (isAdmin && ['inspector', 'technician'].includes(targetUser.role)) return true;
    return false;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    if (message || error) {
      setMessage('');
      setError('');
    }
  };

  const resetForm = () => {
    setEditingUser(null);
    setShowFormPassword(false);
    setForm({ username: '', password: '', confirmPassword: '', fullName: '', role: isSuperAdmin ? 'super_admin' : 'inspector' });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      username: user.username,
      password: '', // Don't pre-fill password for security
      fullName: user.full_name,
      role: user.role
    });
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (userId) => {
    // Guard: prevent deleting the only remaining super_admin
    const superAdmins = users.filter(u => u.role === 'super_admin');
    const targetUser = users.find(u => u.id === userId);
    if (targetUser?.role === 'super_admin' && superAdmins.length <= 1) {
      setError(
        t('lang') === 'zh'
          ? '无法删除唯一的超级管理员账号。'
          : 'Cannot delete the only Super Admin account.'
      );
      return;
    }

    if (!window.confirm(t('um_confirm_delete'))) return;
    
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await apiService.deleteUser(userId);
      setMessage(t('um_msg_delete_success'));
      fetchUsers();
    } catch (err) {
      setError(err.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    // Validate password confirmation on create
    if (!editingUser && form.password !== form.confirmPassword) {
      setError(language === 'zh' ? '两次输入的密码不一致。' : 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      if (editingUser) {
        // Update existing user
        const payload = {
          fullName: form.fullName,
          role: form.role
        };
        if (form.username !== editingUser.username) payload.username = form.username;
        if (form.password) payload.password = form.password;

        await apiService.updateUser(editingUser.id, payload);
        if (editingUser.id === currentUserId) {
          setMessage(language === 'zh' 
            ? `用户 ${form.username} 更新成功。正在重新加载页面以应用更改...`
            : `User ${form.username} updated successfully. Reloading page to apply changes...`
          );
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setMessage(t('um_msg_update_success'));
        }
      } else {
        // Create new user
        await apiService.createUser({
          username: form.username,
          password: form.password,
          fullName: form.fullName,
          role: form.role
        });
        setMessage(t('um_msg_create_success'));
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      setError(err.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="user-management-card">
      <h2>{t('um_title')}</h2>
      <p>{t('um_desc')}</p>

      {/* Create/Edit Form */}
      <form className="user-management-form" onSubmit={handleSubmit}>
        <h3>{editingUser ? t('um_form_edit') : t('um_form_create')}</h3>
        
        <label htmlFor="um-fullname">
          {t('profile_fullname')} *
          <input id="um-fullname" name="fullName" value={form.fullName} onChange={handleChange} required />
        </label>
        <label htmlFor="um-username">
          {t('um_username')} *
          <input 
            id="um-username"
            name="username" 
            value={form.username} 
            onChange={handleChange} 
            required 
            disabled={!!editingUser}
          />
        </label>
        <div className="form-group-accessible">
          <label htmlFor="um-password">
            {t('um_password')}{!editingUser ? ' *' : ''}
          </label>
          <div className="password-input-container">
            <input 
              id="um-password"
              name="password" 
              type={showFormPassword ? 'text' : 'password'}
              value={form.password} 
              onChange={handleChange} 
              required={!editingUser}
              placeholder={editingUser ? t('um_password_edit_tip') : ''}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowFormPassword(!showFormPassword)}
              aria-label={showFormPassword ? 'Hide password' : 'Show password'}
            >
              {showFormPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        {!editingUser && (
          <label htmlFor="um-confirm-password">
            {language === 'zh' ? '确认密码 *' : 'Confirm Password *'}
            <input
              id="um-confirm-password"
              name="confirmPassword"
              type={showFormPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder={language === 'zh' ? '再次输入密码' : 'Re-enter password'}
            />
          </label>
        )}
        <label htmlFor="um-role">
          {t('profile_role')}
          <select 
            id="um-role"
            name="role" 
            value={form.role} 
            onChange={handleChange}
            disabled={editingUser && editingUser.id === currentUserId}
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? (language === 'zh' ? '正在保存...' : 'Saving...') : (editingUser ? t('um_btn_save') : t('um_btn_create'))}
          </button>
          {editingUser && (
            <button type="button" onClick={resetForm} className="cancel-btn">
              {t('cancel')}
            </button>
          )}
        </div>
      </form>

      {message && <div className="login-success">{message}</div>}
      {error && <div className="login-error">{error}</div>}

      {/* Users List */}
      <div className="users-list-section">
        <h3>{t('um_table_title')}</h3>
        {users.length === 0 ? (
          <p className="no-users">{language === 'zh' ? '未找到用户记录。' : 'No users found.'}</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>{t('um_th_username')}</th>
                <th>{t('um_th_fullname')}</th>
                <th>{t('um_th_role')}</th>
                <th>{language === 'zh' ? '登录状态 / 最后登录' : 'Last Login'}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.full_name}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {t('um_role_' + user.role)}
                    </span>
                  </td>
                  <td>
                    {user.last_login ? (
                      <div className="session-container">
                        <div className="session-status-row">
                          <span className={`session-status-dot status-${user.session_status}`} />
                          <span className="session-status-text">
                            {user.session_status === 'active' 
                              ? (language === 'zh' ? '在线' : 'Active') 
                              : (language === 'zh' ? '离线' : 'Offline')
                            }
                          </span>
                        </div>
                        <div className="session-time">{new Date(user.last_login).toLocaleString(language === 'zh' ? 'zh-CN' : undefined)}</div>
                        {user.last_ip && <div className="session-ip">IP: {user.last_ip}</div>}
                      </div>
                    ) : (
                      <span className="session-never">{language === 'zh' ? '从未登录' : 'Never logged in'}</span>
                    )}
                  </td>
                  <td className="actions-cell">
                    <div className="actions-wrapper">
                      {canEditUser(user) && (
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(user)}
                          disabled={loading}
                        >
                          {t('edit')}
                        </button>
                      )}
                      {canDeleteUser(user) && (
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(user.id)}
                          disabled={loading}
                        >
                          {t('delete')}
                        </button>
                      )}
                      {!canEditUser(user) && !canDeleteUser(user) && (
                        <span className="no-permission">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
