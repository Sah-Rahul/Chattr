import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User.js';

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'Email already in use' });
    }

    // agar avatar nahi bheja gaya to default avatar use karo
    const user = await User.create({
      name,
      email,
      password,
      avatar:
        avatar ||
        'https://ui-avatars.com/api/?name=' +
          encodeURIComponent(name) +
          '&background=random',
    });

    const token = signToken(user._id);

    res.status(StatusCodes.CREATED).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (e) {
    console.log(e)
    res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }

    const token = signToken(user._id);

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
  }
};

// ✅ logout controller
export const logout = async (req, res) => {
  try {
    // agar token cookies me store karte ho
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};
