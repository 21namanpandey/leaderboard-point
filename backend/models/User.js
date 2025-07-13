import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true, 
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;