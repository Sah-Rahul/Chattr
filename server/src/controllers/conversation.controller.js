import { Conversation } from '../models/Conversation.js';

export const myConversations = async (req, res) => {
  const convos = await Conversation.find({ members: req.user._id })
    .populate('members', 'name email avatar')
    .populate({
      path: 'latestMessage',
      populate: { path: 'sender', select: 'name email avatar' }
    })
    .sort('-updatedAt');
  res.json(convos);
};

export const startDM = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'userId required' });
  let convo = await Conversation.findOne({
    isGroup: false,
    members: { $all: [req.user._id, userId], $size: 2 }
  });
  if (!convo) {
    convo = await Conversation.create({ isGroup: false, members: [req.user._id, userId] });
  }
  convo = await convo.populate('members', 'name email avatar');
  res.status(201).json(convo);
};
