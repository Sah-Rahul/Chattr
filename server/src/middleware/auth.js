import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

export const authRequired = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing token' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select('-password');
    if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid/Expired token' });
  }
};
