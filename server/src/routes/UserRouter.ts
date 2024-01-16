import express from 'express';
import { Request, Response } from 'express';
import { UserRole } from '../user/UserRole.js';
import { UserData } from '../models/IUserData';
import { createUser } from '../user/Registration.js';
import { loginUser } from '../user/Login.js';
import verifyToken, { DecodedToken } from '../user/VerifyToken.js';
import admin from 'firebase-admin';

const userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const userData: Omit<UserData, 'uid'> = { email, role: role || UserRole.User };

    await createUser(email, password, userData);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const accessToken = await loginUser(email, password);

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

userRouter.post('/logout', async (req: Request, res: Response) => {
  try {
    const accessToken = req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken: DecodedToken | null = await verifyToken(accessToken);

    if (decodedToken) {
      const userUid: string | undefined = decodedToken.userId;

      if (userUid) {
        await admin.auth().revokeRefreshTokens(userUid);
        res.status(200).json({ message: 'User logged out successfully' });
      } else {
        res.status(401).json({ error: 'Invalid user data' });
      }
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default userRouter;