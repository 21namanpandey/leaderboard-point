import express from 'express';
import { getClaimHistory, getLeaderboard } from '../controllers/leaderboardController.js'; 

const router = express.Router();

// Get leaderboard (top users by totalPoints)
router.get('/', getLeaderboard);

// Get claim history for a user
router.get('/history/:userId', getClaimHistory);

export default router; 