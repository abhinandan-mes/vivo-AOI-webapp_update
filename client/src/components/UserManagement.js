import React, { useState } from 'react';
import apiService from '../services/api';

const baseRoleOptions = [
  { value: 'inspector', label: 'Inspector' },
  { value: 'technician', label: 'Technician' }
];

export default function UserManagement({ currentUser }) {
  const [form, setForm] = useState({ username: '', password: '', fullName: '', role: 'inspector' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const roleOptions = isSuperAdmin
    ? [
        { value: 'super_admin', label: 'Super Admin' },
        { value: 'admin', label: 'Admin' },
        ...baseRoleOptions
      ]
    : baseRoleOptions;

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    if (message || error) {
      setMessage('');
      setError('');
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await apiService.createUser({
        username: form.username,
        password: form.password,
        fullName: form.fullName,
        role: form.role
      });
      setMessage(`User ${form.username} created successfully.`);
      setForm({ username: '', password: '', fullName: '', role: isSuperAdmin ? 'super_admin' : 'inspector' });
    } catch (err) {
      setError(err.message || 'Unable to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="user-management-card">
      <h2>User Management</h2>
      <p>Create operator accounts and assign roles from here.</p>
      <form className="user-management-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input name="fullName" value={form.fullName} onChange={handleChange} required />
        </label>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange}>
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating user...' : 'Create User'}
        </button>
      </form>
      {message && <div className="login-success">{message}</div>}
      {error && <div className="login-error">{error}</div>}
    </section>
  );
}
