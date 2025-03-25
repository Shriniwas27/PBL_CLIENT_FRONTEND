
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trophy, BarChart, PieChart, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ElectionResultsChart from '@/components/results/ElectionResultsChart';
import ElectionStats from '@/components/results/ElectionStats';
import TurnoutChart from '@/components/results/TurnoutChart';

// Mock election data
const electionData = {
  totalRegisteredVoters: 24589,
  totalVotesCast: 18742,
  lastUpdated: "2023-11-15T14:30:00",
  constituencies: [
    {
      name: "North District",
      turnout: 76.2,
      candidates: [
        { id: 1, name: "Alexandra Johnson", party: "Progressive Alliance", votes: 5842, percentage: 42.8, winner: true },
        { id: 2, name: "Michael Roberts", party: "Conservative Union", votes: 4981, percentage: 36.5, winner: false },
        { id: 3, name: "David Chen", party: "Liberal Democrats", votes: 2836, percentage: 20.7, winner: false }
      ]
    },
    {
      name: "South District",
      turnout: 74.5,
      candidates: [
        { id: 4, name: "Jennifer Williams", party: "Conservative Union", votes: 6184, percentage: 45.2, winner: true },
        { id: 5, name: "Robert Martinez", party: "Progressive Alliance", votes: 5213, percentage: 38.1, winner: false },
        { id: 6, name: "Sarah Khan", party: "Liberal Democrats", votes: 2288, percentage: 16.7, winner: false }
      ]
    },
    {
      name: "East District",
      turnout: 79.1,
      candidates: [
        { id: 7, name: "Thomas Nelson", party: "Progressive Alliance", votes: 5924, percentage: 41.9, winner: true },
        { id: 8, name: "Emily Wilson", party: "Conservative Union", votes: 5621, percentage: 39.8, winner: false },
        { id: 9, name: "James Rodriguez", party: "Liberal Democrats", votes: 2586, percentage: 18.3, winner: false }
      ]
    }
  ]
};

const Results = () => {
  const [selectedConstituency, setSelectedConstituency] = useState("all");
  
  // Calculate total counts by party
  const partyTotals = electionData.constituencies.reduce((acc, constituency) => {
    constituency.candidates.forEach(candidate => {
      if (!acc[candidate.party]) {
        acc[candidate.party] = { votes: 0, seats: 0 };
      }
      acc[candidate.party].votes += candidate.votes;
      if (candidate.winner) {
        acc[candidate.party].seats += 1;
      }
    });
    return acc;
  }, {} as Record<string, { votes: number, seats: number }>);

  // Convert to array and sort by seats then votes
  const partySummary = Object.entries(partyTotals)
    .map(([party, data]) => ({ party, ...data }))
    .sort((a, b) => b.seats - a.seats || b.votes - a.votes);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="container-custom py-12">
          <div className="text-center max-w-2xl mx-auto mb-8 stagger-animation">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Election Results
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">2023 Election Results</h1>
            <p className="text-lg text-foreground/80">
              View the official blockchain-verified election results
            </p>
          </div>
          
          <div className="grid gap-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ElectionStats 
                totalRegisteredVoters={electionData.totalRegisteredVoters}
                totalVotesCast={electionData.totalVotesCast}
                turnoutPercentage={(electionData.totalVotesCast / electionData.totalRegisteredVoters * 100).toFixed(1)}
                constituencies={electionData.constituencies.length}
              />
            </div>
            
            {/* Winner Banner */}
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="rounded-full p-3 bg-primary/20">
                    <Trophy className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Election Winner</h3>
                    <p className="text-lg font-semibold">{partySummary[0].party} with {partySummary[0].seats} seats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Tabs for Different Views */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overall Results</TabsTrigger>
                <TabsTrigger value="constituency">By Constituency</TabsTrigger>
                <TabsTrigger value="turnout">Voter Turnout</TabsTrigger>
              </TabsList>
              
              {/* Overall Results Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Party Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ElectionResultsChart data={partySummary} />
                    </div>
                    
                    <Table className="mt-6">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Party</TableHead>
                          <TableHead>Seats Won</TableHead>
                          <TableHead>Total Votes</TableHead>
                          <TableHead className="text-right">Vote Share</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partySummary.map((party, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{party.party}</TableCell>
                            <TableCell>{party.seats}</TableCell>
                            <TableCell>{party.votes.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              {((party.votes / electionData.totalVotesCast) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Constituency Results Tab */}
              <TabsContent value="constituency" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Results by Constituency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {electionData.constituencies.map((constituency, idx) => (
                        <Card key={idx} className="overflow-hidden">
                          <CardHeader className="bg-muted/50">
                            <CardTitle className="text-xl">{constituency.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Candidate</TableHead>
                                  <TableHead>Party</TableHead>
                                  <TableHead>Votes</TableHead>
                                  <TableHead className="text-right">Percentage</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {constituency.candidates
                                  .sort((a, b) => b.votes - a.votes)
                                  .map((candidate, idx) => (
                                    <TableRow 
                                      key={idx} 
                                      className={candidate.winner ? "bg-primary/10" : ""}
                                    >
                                      <TableCell className="font-medium flex items-center gap-2">
                                        {candidate.winner && (
                                          <Trophy className="h-4 w-4 text-primary" />
                                        )}
                                        {candidate.name}
                                      </TableCell>
                                      <TableCell>{candidate.party}</TableCell>
                                      <TableCell>{candidate.votes.toLocaleString()}</TableCell>
                                      <TableCell className="text-right">
                                        {candidate.percentage}%
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Turnout Tab */}
              <TabsContent value="turnout" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Voter Turnout
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <TurnoutChart constituencies={electionData.constituencies} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Data Notice */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Results last updated on {formatDate(electionData.lastUpdated)}. All votes 
                verified on the blockchain.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
