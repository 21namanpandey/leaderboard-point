import React, { useState, useEffect } from 'react';
import { Trophy, Layout, LayoutGrid, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { Card } from '@/components/ui/card';

import AddUserForm from '@/components/AddUserForm';
import ClaimPointsForm from '@/components/ClaimPointsForm';
import ClaimHistoryList from '@/components/ClaimHistoryList';
import TopChampionsPodium from '@/components/TopChampionsPodium';
import FullRankingsList from '@/components/FullRankingsList';

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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
const LeaderboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [claimHistory, setClaimHistory] = useState<ClaimHistory[]>([]);
  const [layoutMode, setLayoutMode] = useState<'sidebar' | 'stacked'>('sidebar');
  const [loading, setLoading] = useState(true);
  const [initialLoadError, setInitialLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setInitialLoadError(null);

        const usersResponse = await axios.get(`${BACKEND_URL}/api/users`);
        const fetchedUsers: User[] = usersResponse.data.map((user: any) => ({
          id: user._id,
          name: user.name,
          totalPoints: user.totalPoints,
        }));
        setUsers(fetchedUsers);

      } catch (err: any) {
        console.error("Failed to fetch initial data:", err);
        setInitialLoadError("Failed to load initial data. Please ensure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserAdded = (newUser: User) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handlePointsClaimed = (updatedUser: User, newClaim: ClaimHistory) => {
    setUsers(prev => prev.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
    setClaimHistory(prev => [newClaim, ...prev]);
  };

  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  const topThree = sortedUsers.slice(0, 3);
  const remainingUsers = sortedUsers.slice(3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
        <p className="text-xl text-gray-700">Loading leaderboard data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <Trophy className="w-8 h-8 text-orange-500" />
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-2 text-lg">Compete, Climb, Conquer!</p>

          {/* Persistent Initial Load Error Message */}
          {initialLoadError && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center justify-center gap-2 shadow-md">
              <AlertCircle className="w-5 h-5" />
              <p className="font-semibold">{initialLoadError}</p>
            </div>
          )}

          {/* Layout Toggle Button */}
          {/* <div className="mt-6">
            <Button
              onClick={() => setLayoutMode(layoutMode === 'sidebar' ? 'stacked' : 'sidebar')}
              variant="outline"
              className="bg-white/80 border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
            >
              {layoutMode === 'sidebar' ? (
                <>
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Switch to Stacked Layout
                </>
              ) : (
                <>
                  <Layout className="w-4 h-4 mr-2" />
                  Switch to Sidebar Layout
                </>
              )}
            </Button>
          </div> */}

            {/* Layout Toggle Button */}
          <div className="mt-6">
            <Button
              onClick={() => setLayoutMode(layoutMode === 'sidebar' ? 'stacked' : 'sidebar')}
              
              className="
                bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold
                shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
                hover:from-orange-600 hover:to-yellow-600
                px-6 py-3 rounded-full text-lg
                flex items-center justify-center mx-auto
              "
            >
              {layoutMode === 'sidebar' ? (
                <>
                  <LayoutGrid className="w-5 h-5 mr-2" /> 
                  Switch to Stacked Layout
                </>
              ) : (
                <>
                  <Layout className="w-5 h-5 mr-2" /> 
                  Switch to Sidebar Layout
                </>
              )}
            </Button>
          </div>

        </div>

        {/* Conditional Layout Rendering */}
        {layoutMode === 'sidebar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Controls (narrower) */}
            <div className="lg:col-span-1 space-y-6">
              <AddUserForm onUserAdded={handleUserAdded} />
              <ClaimPointsForm users={users} onPointsClaimed={handlePointsClaimed} />
              <ClaimHistoryList claimHistory={claimHistory} />
            </div>

            {/* Right Side: Leaderboard or "No Players Yet" (wider) */}
            <div className="lg:col-span-2 space-y-8">
              {users.length === 0 ? ( 
                <div className="text-center py-20">
                  <Card className="bg-white/80 rounded-3xl p-12 shadow-xl border border-orange-200/50 max-w-md mx-auto">
                    <Trophy className="w-20 h-20 text-orange-400 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-3">No Players Yet</h2>
                    <p className="text-gray-600 text-lg mb-6">Add some players to start the competition!</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto rounded-full"></div>
                  </Card>
                </div>
              ) : (
                <>
                  <TopChampionsPodium topUsers={topThree} />
                  <FullRankingsList remainingUsers={remainingUsers} startRank={4} />
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Controls Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AddUserForm onUserAdded={handleUserAdded} />
              <ClaimPointsForm users={users} onPointsClaimed={handlePointsClaimed} />
            </div>

            <ClaimHistoryList claimHistory={claimHistory} />
            {users.length === 0 ? ( 
                <div className="text-center py-20">
                  <Card className="bg-white/80 rounded-3xl p-12 shadow-xl border border-orange-200/50 max-w-md mx-auto">
                    <Trophy className="w-20 h-20 text-orange-400 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-3">No Players Yet</h2>
                    <p className="text-gray-600 text-lg mb-6">Add some players to start the competition!</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto rounded-full"></div>
                  </Card>
                </div>
            ) : (
                <>
                  <TopChampionsPodium topUsers={topThree} />
                  <FullRankingsList remainingUsers={remainingUsers} startRank={4} />
                </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;