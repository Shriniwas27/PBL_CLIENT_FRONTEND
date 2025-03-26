
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Vote, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for user voting history
const votingHistory = [
  {
    electionId: 1,
    electionName: 'General Elections 2023',
    votedDate: '2023-05-12T14:30:00',
    candidateName: 'Alexandra Johnson',
    party: 'Progressive Alliance',
    transactionHash: '0x7a3b5c21d8e9f456a7b3c2d1e0f9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1',
  }
];

interface VoterHistoryProps {
  userId?: string; // This would be used to fetch user-specific voting history
}

const VoterHistory = ({ userId }: VoterHistoryProps) => {
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center">
          <Vote className="h-5 w-5 mr-2 text-primary" />
          Your Voting History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {votingHistory.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            You haven't voted in any elections yet.
          </div>
        ) : (
          <div className="space-y-6">
            {votingHistory.map((vote) => (
              <div key={vote.electionId} className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-medium">{vote.electionName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Voted on {formatDate(vote.votedDate)}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 font-normal">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Vote Recorded
                  </Badge>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
                  <p className="font-medium mb-1">You voted for:</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-primary font-bold">
                      {vote.candidateName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{vote.candidateName}</p>
                      <p className="text-sm text-muted-foreground">{vote.party}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-primary/10">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Transaction ID:</p>
                    <p className="text-xs font-mono bg-muted/50 p-2 rounded overflow-x-auto">
                      {vote.transactionHash}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoterHistory;
