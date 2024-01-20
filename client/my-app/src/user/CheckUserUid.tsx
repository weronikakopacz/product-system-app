import { getAccessToken } from '../services/AuthService';
import { getUserProfile } from '../services/UserService';

export const checkUserUid = async (): Promise<string | null> => {
  try {
    const accessToken = getAccessToken();

    if (accessToken) {
      const response = await getUserProfile(accessToken);
      return response.uid;
    }
  } catch (error) {
    console.error('Error checking user role:', error);
  }

  return null;
};
