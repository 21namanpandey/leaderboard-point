import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { getInitials } from '@/utils/helpers';

interface User {
  id: string;
  name: string;
  totalPoints: number;
}

interface FullRankingsListProps {
  remainingUsers: User[];
  startRank: number;
}

const FullRankingsList: React.FC<FullRankingsListProps> = ({ remainingUsers, startRank }) => {
  if (remainingUsers.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-orange-200/60 shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-orange-500" />
          Full Rankings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2">
          {remainingUsers.map((user, index) => {
            const rank = startRank + index;

            return (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 md:p-6 hover:bg-orange-50/70 transition-all duration-200 border-b border-orange-100/50 last:border-b-0 hover:scale-[1.01] hover:shadow-md rounded-lg mx-2"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg md:text-xl font-bold">{rank}</span>
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-gray-700 font-bold text-sm md:text-lg">{getInitials(user.name)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg md:text-xl">{user.name}</h3>
                    <p className="text-gray-500 text-sm">Rank #{rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-orange-600">{user.totalPoints}</div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                    <Trophy className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FullRankingsList;