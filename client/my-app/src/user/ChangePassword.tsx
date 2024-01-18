import React, { useState, ChangeEvent } from 'react';
import { changePassword } from '../services/UserService';

interface ChangePasswordProps {
  onChangeDone: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onChangeDone }) => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
  };

  const handleChangePassword = async () => {
    try {
      if (!isValidPassword(newPassword)) {
        setError('Invalid password format');
        return;
      }

      await changePassword(newPassword);
      onChangeDone();
    } catch (error) {
      setError('Error changing password. Please try again.');
      console.error('Error changing password:', error);
    }
  };

  const handleCancel = () => {
    onChangeDone();
  };

  const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
  };

  return (
    <div className="change-password-form">
      <h2>Change Password</h2>
      <label>
        New Password:
        <input type="password" value={newPassword} onChange={handleChange} />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleChangePassword}>Change Password</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default ChangePassword;