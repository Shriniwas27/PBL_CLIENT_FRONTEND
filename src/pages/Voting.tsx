
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CountdownTimer from '@/components/CountdownTimer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Vote,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  RotateCw,
  ChevronLeft,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';

// Reusing mock candidate data from Candidates.tsx
const candidates = [
  {
    id: 1,
    name: 'Alexandra Johnson',
    party: 'Progressive Alliance',
    constituency: 'North District',
    age: 45,
    education: 'PhD in Public Policy',
    experience: '12 years as District Representative',
    manifesto: 'Focus on sustainable development and social justice',
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Michael Roberts',
    party: 'Conservative Union',
    constituency: 'North District',
    age: 52,
    education: 'MBA, Bachelor of Law',
    experience: '8 years as City Councilor, Former Business Executive',
    manifesto: 'Economic growth and traditional values',
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  // More candidates...
];

const Voting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVoting, setIsVoting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTimeoutOpen, setIsTimeoutOpen] = useState(false);
  const [isVotingComplete, setIsVotingComplete] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    location.state?.candidateId || null
  );
  const [votingStep, setVotingStep] = useState(0);
  
  // Get candidate information based on ID
  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
  
  // Time limit for voting: 2 minutes (120 seconds)
  const votingTimeLimit = 120;
  
  // Handle timeout when voting period ends
  const handleTimeout = () => {
    setIsTimeoutOpen(true);
  };
  
  // Handle confirm vote action
  const handleConfirmVote = () => {
    setIsConfirmOpen(false);
    setIsVoting(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsVoting(false);
      setIsVotingComplete(true);
      toast.success('Your vote has been recorded successfully on the blockchain!');
    }, 3000);
  };
  
  // Handle voting flow steps
  const handleVote = () => {
    if (votingStep === 0) {
      // First step - show confirmation dialog
      setIsConfirmOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="container-custom py-12">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-8" 
            onClick={() => navigate('/candidates')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Candidates
          </Button>
          
          <div className="text-center max-w-2xl mx-auto mb-8 stagger-animation">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Secure Voting Interface
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Cast Your Vote</h1>
            <p className="text-lg text-foreground/80">
              You have 2 minutes to complete your vote. Please verify your choice carefully.
            </p>
          </div>
          
          {!isVotingComplete ? (
            <div className="max-w-3xl mx-auto">
              {/* Countdown timer */}
              <div className="mb-8">
                <CountdownTimer 
                  duration={votingTimeLimit} 
                  onComplete={handleTimeout} 
                />
              </div>
              
              {/* Candidate selection */}
              <Card className="mb-8 glass-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {selectedCandidate ? (
                      <>
                        <div className="md:w-1/3">
                          <div className="h-40 w-40 md:h-auto md:w-full rounded-xl overflow-hidden mx-auto">
                            <img 
                              src={selectedCandidate.imageUrl} 
                              alt={selectedCandidate.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="md:w-2/3">
                          <h2 className="text-2xl font-bold mb-2">{selectedCandidate.name}</h2>
                          <div className="text-lg font-medium text-primary mb-2">{selectedCandidate.party}</div>
                          <div className="text-foreground/70 mb-4">{selectedCandidate.constituency}</div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div>
                              <div className="text-sm font-medium text-foreground/70 mb-1">Age</div>
                              <div>{selectedCandidate.age} years</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground/70 mb-1">Education</div>
                              <div>{selectedCandidate.education}</div>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <div className="text-sm font-medium text-foreground/70 mb-1">Manifesto</div>
                            <div>{selectedCandidate.manifesto}</div>
                          </div>
                          
                          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-sm flex items-start gap-2 mb-6">
                            <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>Secure Voting:</strong> Your vote will be securely recorded on the blockchain.
                              The record will be anonymous but verifiable.
                            </div>
                          </div>
                          
                          <Button 
                            size="lg"
                            className="w-full"
                            onClick={handleVote}
                            disabled={isVoting}
                          >
                            {isVoting ? (
                              <>
                                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                Recording Your Vote...
                              </>
                            ) : (
                              <>
                                <Vote className="mr-2 h-4 w-4" />
                                Vote for {selectedCandidate.name}
                              </>
                            )}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="w-full text-center py-8">
                        <div className="text-lg font-medium text-foreground/70">No candidate selected</div>
                        <div className="text-sm text-foreground/50 mt-2">Please go back and select a candidate</div>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => navigate('/candidates')}
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Browse Candidates
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Voting complete view
            <div className="max-w-2xl mx-auto">
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">Vote Successfully Recorded</h2>
                  <p className="text-foreground/70 mb-6">
                    Your vote has been securely recorded on the blockchain.
                    Thank you for participating in the democratic process.
                  </p>
                  
                  <div className="bg-background/50 p-4 rounded-lg mb-6">
                    <div className="text-sm font-medium mb-2">Transaction Details</div>
                    <div className="font-mono text-xs bg-foreground/5 p-2 rounded overflow-x-auto">
                      0x7a3b5c21d8e9f456a7b3c2d1e0f9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1
                    </div>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={() => navigate('/')}>
                      Return to Home
                    </Button>
                    <Button onClick={() => navigate('/results')}>
                      View Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to cast your vote for <strong>{selectedCandidate?.name}</strong> of the <strong>{selectedCandidate?.party}</strong>.
              This action cannot be undone once confirmed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmVote}>
              Confirm Vote
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Timeout Dialog */}
      <AlertDialog open={isTimeoutOpen} onOpenChange={setIsTimeoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Voting Time Expired
            </AlertDialogTitle>
            <AlertDialogDescription>
              The 2-minute voting period has expired. Please restart the voting process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setIsTimeoutOpen(false);
              navigate('/candidates');
            }}>
              Return to Candidates
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Voting;
