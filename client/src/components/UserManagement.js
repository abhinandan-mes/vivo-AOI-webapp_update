import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './UserManagement.css';

const baseRoleOptions = [
  { value: 'inspector', label: 'Inspector' },
  { value: 'technician', label: 'Technician' }
];

export default function UserManagement({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form state for create/edit
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    username: '',
    password: '',
    fullName: '',
    role: 'inspector'
  });

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdmin = currentUser?.role === 'admin';
  const currentUserId = currentUser?.id;

  const roleOptions = isSuperAdmin
    ? [
        { value: 'super_admin', label: 'Super Admin' },
        { value: 'admin', label: 'Admin' },
        ...baseRoleOptions
      ]
    : baseRoleOptions;

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
    setForm({ username: '', password: '', fullName: '', role: isSuperAdmin ? 'super_admin' : 'inspector' });
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
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await apiService.deleteUser(userId);
      setMessage('User deleted successfully.');
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Unable to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (editingUser) {
        // Update existing user
        const payload = {
          fullName: form.fullName,
          role: form.role
        };
        // Only include username if changed
        if (form.username !== editingUser.username) {
          payload.username = form.username;
        }
        // Only include password if provided
        if (form.password) {
          payload.password = form.password;
        }

        await apiService.updateUser(editingUser.id, payload);
        if (editingUser.id === currentUserId) {
          setMessage(`User ${form.username} updated successfully. Reloading page to apply changes...`);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          setMessage(`User ${form.username} updated successfully.`);
        }
      } else {
        // Create new user
        await apiService.createUser({
          username: form.username,
          password: form.password,
          fullName: form.fullName,
          role: form.role
        });
        setMessage(`User ${form.username} created successfully.`);
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      setError(err.message || editingUser ? 'Unable to update user' : 'Unable to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="user-management-card">
      <h2>User Management</h2>
      <p>Create, edit, and manage operator accounts and assign roles.</p>

      {/* Create/Edit Form */}
      <form className="user-management-form" onSubmit={handleSubmit}>
        <h3>{editingUser ? 'Edit User' : 'Create New User'}</h3>
        
        <label>
          Full Name
          <input name="fullName" value={form.fullName} onChange={handleChange} required />
        </label>
        <label>
          Username
          <input 
            name="username" 
            value={form.username} 
            onChange={handleChange} 
            required 
            disabled={editingUser} // Username typically shouldn't be changed, but we allow it
          />
        </label>
        <label>
          Password
          <input 
            name="password" 
            type="password" 
            value={form.password} 
            onChange={handleChange} 
            required={!editingUser} // Required for new users, optional for edits
            placeholder={editingUser ? 'Leave blank to keep current password' : ''}
          />
        </label>
        <label>
          Role
          <select 
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
            {loading ? 'Saving...' : (editingUser ? 'Update User' : 'Create User')}
          </button>
          {editingUser && (
            <button type="button" onClick={resetForm} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      {message && <div className="login-success">{message}</div>}
      {error && <div className="login-error">{error}</div>}

      {/* Users List */}
      <div className="users-list-section">
        <h3>Existing Users</h3>
        {users.length === 0 ? (
          <p className="no-users">No users found.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.full_name}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    {user.last_login ? (
                      <div className="session-container">
                        <div className="session-status-row">
                          <span className={`session-status-dot status-${user.session_status}`} />
                          <span className="session-status-text">
                            {user.session_status === 'active' ? 'Active' : 'Offline'}
                          </span>
                        </div>
                        <div className="session-time">{new Date(user.last_login).toLocaleString()}</div>
                        {user.last_ip && <div className="session-ip">IP: {user.last_ip}</div>}
                      </div>
                    ) : (
                      <span className="session-never">Never logged in</span>
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
                          Edit
                        </button>
                      )}
                      {canDeleteUser(user) && (
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(user.id)}
                          disabled={loading}
                        >
                          Delete
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
