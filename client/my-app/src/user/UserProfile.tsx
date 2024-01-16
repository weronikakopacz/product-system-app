import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/UserService';
import { UserData } from '../models/IUserData';

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

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

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;