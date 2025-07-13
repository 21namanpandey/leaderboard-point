import express from 'express';
import { addUser, claimPoints, getAllUsers } from '../controllers/userController.js'; 

const router = express.Router();

// Add a new user
router.post('/', addUser);

// Get all users
router.get('/', getAllUsers);

// Claim points for a user (by userId)
router.post('/claim-points/:userId', claimPoints);

export default router; 