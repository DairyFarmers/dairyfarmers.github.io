import React, { useState, useEffect } from 'react';
import { PermissionGuard } from '../../components/common/PermissionGuard';
import api from '../../services/api';
import './UserManagement.scss';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/list');
      setUsers(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get('/users/roles/');
      setRoles(response.data || []);
    } catch (err) {
      console.error('Error fetching roles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, roleId) => {
    try {
      await api.patch(`/users/detail/${userId}`, { role: roleId });
      await fetchUsers(); // Refresh user list
    } catch (err) {
      setError('Failed to update user role');
      console.error('Error updating user role:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="user-management">
      <h1>User Management</h1>

      <PermissionGuard permissions="can_create_users">
        <div className="actions mb-4">
          <button className="btn btn-primary">Add New User</button>
        </div>
      </PermissionGuard>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.email}</td>
                <td>
                  <PermissionGuard permissions="can_manage_roles">
                    <select
                      className="form-select"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </PermissionGuard>
                  <PermissionGuard
                    permissions="can_manage_roles"
                    fallback={<span>{user.role_name}</span>}
                  />
                </td>
                <td>
                  <span className={`badge ${user.is_active ? 'bg-success' : 'bg-danger'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <PermissionGuard permissions="can_edit_users">
                    <button className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </button>
                  </PermissionGuard>
                  <PermissionGuard permissions="can_delete_users">
                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </PermissionGuard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 