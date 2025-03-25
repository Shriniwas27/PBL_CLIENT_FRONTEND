
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, BarChart, Building } from 'lucide-react';

interface ElectionStatsProps {
  totalRegisteredVoters: number;
  totalVotesCast: number;
  turnoutPercentage: string;
  constituencies: number;
}

const ElectionStats = ({ 
  totalRegisteredVoters, 
  totalVotesCast, 
  turnoutPercentage,
  constituencies 
}: ElectionStatsProps) => {
  return (
    <>
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Registered Voters</p>
            <h4 className="text-2xl font-bold">{totalRegisteredVoters.toLocaleString()}</h4>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full p-3 bg-green-100 dark:bg-green-900">
            <BarChart className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Votes Cast</p>
            <h4 className="text-2xl font-bold">{totalVotesCast.toLocaleString()}</h4>
            <p className="text-sm text-muted-foreground">{turnoutPercentage}% Turnout</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900">
            <Building className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Constituencies</p>
            <h4 className="text-2xl font-bold">{constituencies}</h4>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ElectionStats;
