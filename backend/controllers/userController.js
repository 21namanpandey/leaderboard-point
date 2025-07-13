import User from '../models/User.js'; 
import ClaimHistory from '../models/ClaimHistory.js'; 

// Add a new user
export const addUser = async (req, res) => { 
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'User name is required' });
  }

  try {
    const userExists = await User.findOne({ name: name.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'User with this name already exists' });
    }

    const user = await User.create({ name });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      totalPoints: user.totalPoints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => { 
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Claim points for a user (by userId)
export const claimPoints = async (req, res) => { 
  const { userId } = req.params;
  const { points } = req.body;

  if (typeof points !== 'number' || points <= 0) {
    return res.status(400).json({ message: 'Invalid points amount' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.totalPoints += points;
    await user.save();

    const claim = await ClaimHistory.create({
      userId: user._id,
      userName: user.name,
      points,
      timestamp: new Date(),
    });

    res.status(200).json({
      message: `${points} points claimed successfully for ${user.name}!`,
      user: {
        _id: user._id,
        name: user.name,
        totalPoints: user.totalPoints,
      },
      claim,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};