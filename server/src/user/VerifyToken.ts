import jwt, { JwtPayload } from 'jsonwebtoken';
import { getUserData } from '../user/GetUserData.js';
import { UserRole } from '../user/UserRole';
import dotenv from 'dotenv';

dotenv.config();
const publicKey = process.env.JWT_PUBLIC_KEY || 'fallbackPublicKey';

export interface DecodedToken {
  userId: string;
  role: UserRole;
}

export async function verifyToken(accessToken: string): Promise<DecodedToken | null> {
  try {
    const decodedToken = jwt.verify(accessToken, publicKey) as JwtPayload;
    const userData = await getUserData(decodedToken.userId);

    if (userData) {
      return {
        userId: decodedToken.userId,
        role: userData.role
      };
    }

    return null;
  } catch (error) {
    console.error('Error during token verification:', error);
    return null;
  }
}

export default verifyToken;