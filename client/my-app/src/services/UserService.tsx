import axios from 'axios';
import { RegistrationData } from '../models/IRegistrationData';
import { getAccessToken, removeAccessToken, setAccessToken } from './AuthService';

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

export const logoutUser = async (): Promise<void> => {
  try {
    const accessToken = getAccessToken();

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
  