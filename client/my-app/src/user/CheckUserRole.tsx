import { getAccessToken } from '../services/AuthService';
import { getUserProfile } from '../services/UserService';

export const checkUserRole = async (): Promise<string | null> => {
  try {
    const accessToken = getAccessToken();

    if (accessToken) {
      const response = await getUserProfile(accessToken);
      return response.role;
    }
  } catch (error) {
    console.error('Error checking user role:', error);
  }

  return null;
};
