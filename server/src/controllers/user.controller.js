import { User } from '../models/User.js';

export const me = async (req, res) => {
  res.json(req.user);
};

export const searchUsers = async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);
  const regex = new RegExp(q, 'i');
  const users = await User.find({ 
    $or: [{ name: regex }, { email: regex }], 
    _id: { $ne: req.user._id }
  }).select('-password').limit(20);
  res.json(users);
};
