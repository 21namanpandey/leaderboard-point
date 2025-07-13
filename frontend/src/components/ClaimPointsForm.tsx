import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { getInitials } from '@/utils/helpers';

interface User {
  id: string;
  name: string;
  totalPoints: number;
}

interface ClaimHistory {
  id: string;
  userId: string;
  userName: string;
  points: number;
  timestamp: Date;
}

interface ClaimPointsFormProps {
  users: User[];
  onPointsClaimed: (updatedUser: User, newClaim: ClaimHistory) => void;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'


const ClaimPointsForm: React.FC<ClaimPointsFormProps> = ({ users, onPointsClaimed }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [isClaimingPoints, setIsClaimingPoints] = useState(false);

  const claimPoints = async () => {
    if (!selectedUserId) {
      toast({
        title: "No user selected",
        description: "Please select a user to claim points",
        variant: "destructive"
      });
      return;
    }

    setIsClaimingPoints(true);
    const randomPoints = Math.floor(Math.random() * 10) + 1; 

    try {
      const response = await axios.post(`${BACKEND_URL}/api/users/claim-points/${selectedUserId}`, { points: randomPoints });

      const updatedUser: User = {
        id: response.data.user._id,
        name: response.data.user.name,
        totalPoints: response.data.user.totalPoints,
      };

      const newClaim: ClaimHistory = {
        id: response.data.claim._id,
        userId: response.data.claim.userId,
        userName: response.data.claim.userName,
        points: response.data.claim.points,
        timestamp: new Date(response.data.claim.timestamp),
      };

      onPointsClaimed(updatedUser, newClaim);
      toast({
        title: `🎉 ${randomPoints} Points Claimed!`,
        description: `${updatedUser.name} earned ${randomPoints} points!`,
      });
      setSelectedUserId(''); 
    } catch (error: any) {
      toast({
        title: "Error claiming points",
        description: error.response?.data?.message || "Could not claim points. Please try again.",
        variant: "destructive"
      });
      console.error('Error claiming points:', error);
    } finally {
      setIsClaimingPoints(false);
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-orange-200/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-800 flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          Claim Points
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedUserId} onValueChange={setSelectedUserId}>
          <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-lg">
            <SelectValue placeholder="Select a player" />
          </SelectTrigger>
          <SelectContent className="bg-white border-orange-200">
            {users.map(user => (
              <SelectItem key={user.id} value={user.id} className="text-lg py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 font-semibold text-xs">{getInitials(user.name)}</span>
                  </div>
                  <span>{user.name}</span>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                    {user.totalPoints} pts
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={claimPoints}
          disabled={isClaimingPoints || !selectedUserId}
          className="w-full h-12 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg disabled:opacity-50 font-semibold text-lg transition-all duration-200 hover:scale-105"
        >
          {isClaimingPoints ? (
            <>
              <Zap className="w-5 h-5 mr-2 animate-pulse" />
              Claiming Points...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Claim Random Points (1-10)
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClaimPointsForm;