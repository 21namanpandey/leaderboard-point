import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { getInitials } from '@/utils/helpers';

interface ClaimHistory {
  id: string;
  userId: string;
  userName: string;
  points: number;
  timestamp: Date;
}

interface ClaimHistoryListProps {
  claimHistory: ClaimHistory[];
}

const ClaimHistoryList: React.FC<ClaimHistoryListProps> = ({ claimHistory }) => {
  if (claimHistory.length === 0) {
    return null; 
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-orange-200/60 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          Claim Point Tracking History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {claimHistory.slice(0, 8).map(claim => (
            <div key={claim.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50/70 to-yellow-50/70 rounded-xl border border-orange-100/50 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-semibold text-xs">{getInitials(claim.userName)}</span>
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">{claim.userName}</p>
                  <p className="text-gray-500 text-sm">
                    {claim.timestamp.toLocaleTimeString()} • {claim.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold px-3 py-1 shadow-md">
                +{claim.points} pts
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimHistoryList;