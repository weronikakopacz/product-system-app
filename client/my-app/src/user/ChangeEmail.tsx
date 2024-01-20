import React, { useState, ChangeEvent } from 'react';
import { changeEmail } from '../services/UserService';
import '../css/Button.css'

interface ChangeEmailProps {
  userId: string;
  onChangeDone: () => void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ userId, onChangeDone }) => {
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewEmail(value);
  };

  const handleChangeEmail = async () => {
    try {
      if (!isValidEmail(newEmail)) {
        setError('Invalid email format');
        return;
      }

      await changeEmail(userId, newEmail);
      onChangeDone();
    } catch (error) {
      setError('Error changing email. Please try again.');
      console.error('Error changing email:', error);
    }
  };

  const handleCancel = () => {
    onChangeDone();
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="change-email-form">
      <h2>Change Email</h2>
      <label>
        New Email:
        <input type="email" value={newEmail} onChange={handleChange} />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button className="user-button" onClick={handleChangeEmail}>Change Email</button>
      <button className="user-button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default ChangeEmail;