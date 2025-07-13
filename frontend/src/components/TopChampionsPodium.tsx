import React from 'react';
import { Crown, Trophy, Medal, Award } from 'lucide-react';
import { getInitials } from '@/utils/helpers';

interface User {
  id: string;
  name: string;
  totalPoints: number;
}

interface TopChampionsPodiumProps {
  topUsers: User[];
}

const TopChampionsPodium: React.FC<TopChampionsPodiumProps> = ({ topUsers }) => {
  if (topUsers.length === 0) {
    return null;
  }

  const topThree = Array(3).fill(null).map((_, i) => topUsers[i] || null);

  return (
    <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-200 rounded-3xl p-8 shadow-2xl border border-orange-300/30">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
        <Crown className="w-7 h-7 text-yellow-600" />
        Top Champions
        <Crown className="w-7 h-7 text-yellow-600" />
      </h2>

      <div className="flex justify-center items-end gap-6 md:gap-8">
        {/* 2nd Place */}
        {topThree[1] && (
          <div className="text-center transform hover:scale-105 transition-transform duration-200">
            <div className="relative mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-xl border-4 border-white">
                {getInitials(topThree[1].name)}
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <Medal className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{topThree[1].name}</h3>
            <div className="bg-white/80 rounded-full px-4 py-2 shadow-md">
              <span className="text-orange-600 font-bold text-lg">{topThree[1].totalPoints}</span>
            </div>
          </div>
        )}

        {/* 1st Place */}
        {topThree[0] && (
          <div className="text-center transform hover:scale-105 transition-transform duration-200">
            <div className="relative mb-4">
              <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-2xl border-4 border-white">
                {getInitials(topThree[0].name)}
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Crown className="w-10 h-10 md:w-12 md:h-12 text-yellow-500 drop-shadow-lg" />
              </div>
              <Trophy className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{topThree[0].name}</h3>
            <div className="bg-white/90 rounded-full px-6 py-3 shadow-lg">
              <span className="text-orange-600 font-bold text-xl md:text-2xl">{topThree[0].totalPoints}</span>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {topThree[2] && (
          <div className="text-center transform hover:scale-105 transition-transform duration-200">
            <div className="relative mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-xl border-4 border-white">
                {getInitials(topThree[2].name)}
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <Award className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{topThree[2].name}</h3>
            <div className="bg-white/80 rounded-full px-4 py-2 shadow-md">
              <span className="text-orange-600 font-bold text-lg">{topThree[2].totalPoints}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopChampionsPodium;