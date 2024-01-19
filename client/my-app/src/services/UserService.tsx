import axios from 'axios';
import { RegistrationData } from '../models/IRegistrationData';
import { removeAccessToken, setAccessToken } from './AuthService';
import { UserData } from '../models/IUserData';

const API_BASE_URL = 'http://localhost:8080/api/users';

export const registerUser = async (userData: RegistrationData): Promise<void> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
};

export const loginUser = async (userData: RegistrationData): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    console.log(response.data.accessToken);
    setAccessToken(response.data.accessToken);
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export const logoutUser = async (accessToken: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    removeAccessToken();
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getUserProfile = async (accessToken: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getUserId= async (accessToken: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/userid`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user id:', error);
    throw error;
  }
};

export const getUserEmail = async (uid: string): Promise<{ email: string }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${uid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user email:', error);
    throw error;
  }
};

export const changeEmail = async (userId: string, newEmail: string ): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/change-email`, {
      userId,
      newEmail,
    });
    return response.data;
  } catch (error) {
    console.error('Error changing email:', error);
    throw error;
  }
};

export const changePassword = async (newPassword: string): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/change-password`, {
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

export const changeUserRole = async (userId: string, newRole: string): Promise<void> => {
  try {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('Access token not found.');
      throw new Error('Access token not found.');
    }

    await axios.put(`${API_BASE_URL}/change-role`, { userId, newRole }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  } catch (error) {
    console.error('Error changing user role:', error);
    throw error;
  }
};


export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const response = await axios.get<UserData[]>(`${API_BASE_URL}/allusers`);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};