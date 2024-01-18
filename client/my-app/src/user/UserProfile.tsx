import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/UserService';
import { UserData } from '../models/IUserData';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          window.location.href = '/login';
          return;
        }

        const userProfileData = await getUserProfile(accessToken);
        setUserData(userProfileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        window.location.href = '/login';
      }
    };
    fetchUserProfile();
  }, []);

  const handleEditEmail = () => {
    setIsEditEmail(true);
    setIsEditPassword(false);
  };

  const handleEditPassword = () => {
    setIsEditEmail(false);
    setIsEditPassword(true);
  };

  const handleEditDone = () => {
    setIsEditEmail(false);
    setIsEditPassword(false);
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          <button onClick={handleEditEmail}>Edit Email</button>
          <button onClick={handleEditPassword}>Edit Password</button>
          {isEditEmail && <ChangeEmail userId={userData.uid} onChangeDone={handleEditDone} />}
          {isEditPassword && <ChangePassword onChangeDone={handleEditDone} />}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;