import User from '../models/User.js';
import ClaimHistory from '../models/ClaimHistory.js';

// Get leaderboard (top users by totalPoints)
export const getLeaderboard = async (req, res) => { 
  try {
    const leaderboard = await User.aggregate([
      {
        $sort: { totalPoints: -1 } 
      },
      {
        $limit: 10
      },
      {
        $project: { 
          _id: 1,
          name: 1,
          totalPoints: 1,
        }
      }
    ]);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get claim history for a user
export const getClaimHistory = async (req, res) => { 
  try {
    const userId = req.params.userId;
    const history = await ClaimHistory.find({ userId }).sort({ timestamp: -1 }); 
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};