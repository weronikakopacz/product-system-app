import React, { useState, useEffect } from 'react';
import { changeUserRole, getAllUsers } from '../services/UserService';
import { UserData } from '../models/IUserData';
import '../css/Button.css'

interface ChangeRoleProps {
  onChangeDone: () => void;
}

const ChangeRole: React.FC<ChangeRoleProps> = ({ onChangeDone }) => {
  const [newRole, setNewRole] = useState<string>('user');
  const [selectedUser, setSelectedUser] = useState<{ uid: string; email: string } | null>(null);
  const [availableUsers, setAvailableUsers] = useState<{ [uid: string]: { email: string; role: string } }>({});

  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const users: UserData[] = await getAllUsers();
        const usersObject: { [uid: string]: { email: string; role: string } } = {};

        users.forEach((user) => {
          usersObject[user.uid] = { email: user.email, role: user.role };
        });

        setAvailableUsers(usersObject);
      } catch (error) {
        console.error('Error fetching available users:', error);
      }
    };

    fetchAvailableUsers();
  }, []);

  const handleChangeRole = async () => {
    try {
      if (selectedUser) {
        await changeUserRole(selectedUser.uid, newRole);
        onChangeDone();
      }
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  const handleCancel = () => {
    onChangeDone();
  };

  return (
    <div className="change-role">
      <h2>Change User Role</h2>
      <label>
        Select User:
        <select
          value={selectedUser?.uid || ''}
          onChange={(e) => {
            const selectedUid = e.target.value;
            const user = availableUsers[selectedUid];
            setSelectedUser({ uid: selectedUid, email: user.email });
          }}
        >
          <option value="" disabled>
            Select a user
          </option>
          {Object.entries(availableUsers).map(([uid, { email }]) => (
            <option key={uid} value={uid}>
              {email}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select New Role:
        <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <button className="edit-button" onClick={handleChangeRole}>Edit</button>
      <button className="edit-button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default ChangeRole;