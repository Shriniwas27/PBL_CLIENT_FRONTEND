
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
  XCircle,
  MapPin,
  Globe,
  Calendar,
  Flag,
} from 'lucide-react';
import { toast } from 'sonner';

// Interface for election data
interface Election {
  id: number;
  name: string;
  type: string;
  date: string;
  region: string;
  status: string;
}

// Mock elections data - in a real app, this would come from an API
const elections: Election[] = [
  {
    id: 1,
    name: "General Elections 2023",
    type: "General",
    date: "2023-11-30",
    region: "North District",
    status: "Active",
  },
  {
    id: 2,
    name: "Local Council Election 2023",
    type: "Local",
    date: "2023-12-15", 
    region: "East District",
    status: "Upcoming",
  }
];

// Filter candidates based on region/constituency
const getCandidatesByRegion = (candidates: any[], region: string) => {
  return candidates.filter(candidate => candidate.constituency === region);
};

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
    electionId: 1,
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
    electionId: 1,
  },
  {
    id: 3,
    name: 'Sarah Chen',
    party: 'Democratic Reform',
    constituency: 'East District',
    age: 38,
    education: 'Master of Public Administration',
    experience: '10 years in Civil Service',
    manifesto: 'Government transparency and educational reforms',
    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    electionId: 1,
  },
  {
    id: 4,
    name: 'James Wilson',
    party: 'Liberal Democrats',
    constituency: 'South District',
    age: 41,
    education: 'Bachelor of Economics',
    experience: '6 years as District Council Member',
    manifesto: 'Economic innovation and social equality',
    imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
    electionId: 2,
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
  const [metamaskError, setMetamaskError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [hasVotedBefore, setHasVotedBefore] = useState(false);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [locationAnomaly, setLocationAnomaly] = useState(false);
  
  // Mock voter information that would come from backend
  // In a real application, this would be fetched from an API
  const voterInfo = {
    name: sessionStorage.getItem('voterName') || 'John Smith',
    constituency: sessionStorage.getItem('constituency') || 'North District',
    voterId: sessionStorage.getItem('voterId') || 'ABC1234567',
  };
  
  // Check authentication and previous voting status on component mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      toast.error('You must be logged in to vote');
      navigate('/login');
      return;
    }
    
    // Check if user has voted before (in a real app, this would come from the backend)
    const checkVotingStatus = async () => {
      // Simulate API call to check if user has voted
      const mockHasVoted = localStorage.getItem(`voted_${voterInfo.voterId}_${location.state?.electionId || 1}`) === 'true';
      setHasVotedBefore(mockHasVoted);
      
      if (mockHasVoted) {
        toast.warning('You have already cast your vote in this election');
      }
    };
    
    checkVotingStatus();
    
    // Set the selected election
    const electionId = location.state?.electionId || 1;
    const election = elections.find(e => e.id === electionId);
    
    if (election) {
      setSelectedElection(election);
    }
    
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          
          // Simplified anomaly detection - in a real app this would be more sophisticated
          // For demo we'll randomly set an anomaly 20% of the time
          if (Math.random() < 0.2) {
            setLocationAnomaly(true);
            
            // Log the anomaly - in a real app this would be sent to a backend
            console.log("Location anomaly detected", {
              userId: voterInfo.voterId,
              timestamp: new Date().toISOString(),
              location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [navigate, voterInfo.voterId, location.state]);
  
  // Get candidate information based on ID
  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
  
  // Check if candidate belongs to voter's constituency
  const isSameConstituency = selectedCandidate?.constituency === voterInfo.constituency;
  
  // Check if candidate belongs to selected election
  const isInElection = selectedCandidate?.electionId === selectedElection?.id;
  
  // Combined validation
  const canVoteForCandidate = isSameConstituency && isInElection;
  
  // Time limit for voting: 2 minutes (120 seconds)
  const votingTimeLimit = 120;
  
  // Check if MetaMask is installed
  const [hasMetaMask, setHasMetaMask] = useState(false);
  
  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum?.isMetaMask) {
      setHasMetaMask(true);
    }
  }, []);
  
  // Handle timeout when voting period ends
  const handleTimeout = () => {
    setIsTimeoutOpen(true);
  };
  
  // Handle MetaMask transaction signing
  const signTransaction = async () => {
    setMetamaskError(null);
    
    if (!window.ethereum) {
      setMetamaskError('MetaMask is not installed. Please install MetaMask to vote.');
      return false;
    }
    
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      // Verify if account matches the one used to log in
      const loggedInAddress = sessionStorage.getItem('walletAddress');
      if (loggedInAddress && loggedInAddress.toLowerCase() !== account.toLowerCase()) {
        throw new Error('The selected account does not match the account you logged in with');
      }
      
      // Simulating a transaction to be signed
      // In a real application, this would be a call to a smart contract
      const transactionParameters = {
        from: account,
        to: '0x0000000000000000000000000000000000000000', // Replace with actual contract address
        data: `0x${Buffer.from(`Vote for candidate ${selectedCandidateId} from ${voterInfo.voterId} in election ${selectedElection?.name}`).toString('hex')}`,
        gas: '0x76c0', // 30400
      };
      
      // Sign the transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      
      setTransactionHash(txHash);
      return true;
    } catch (error: any) {
      console.error('Error signing transaction:', error);
      setMetamaskError(error.message || 'Failed to sign transaction with MetaMask');
      return false;
    }
  };
  
  // Handle confirm vote action
  const handleConfirmVote = async () => {
    setIsConfirmOpen(false);
    setIsVoting(true);
    
    // Sign the transaction with MetaMask
    const success = await signTransaction();
    
    if (success) {
      // Simulate blockchain transaction processing
      setTimeout(() => {
        setIsVoting(false);
        setIsVotingComplete(true);
        
        // Store voting record in local storage (in a real app, this would be on the blockchain)
        localStorage.setItem(`voted_${voterInfo.voterId}_${selectedElection?.id}`, 'true');
        
        // Store voting details for history
        const votingRecord = {
          electionId: selectedElection?.id,
          electionName: selectedElection?.name,
          votedDate: new Date().toISOString(),
          candidateName: selectedCandidate?.name,
          party: selectedCandidate?.party,
          transactionHash: transactionHash,
        };
        
        const existingHistory = JSON.parse(localStorage.getItem('votingHistory') || '[]');
        localStorage.setItem('votingHistory', JSON.stringify([...existingHistory, votingRecord]));
        
        toast.success('Your vote has been recorded successfully on the blockchain!');
      }, 3000);
    } else {
      setIsVoting(false);
      toast.error('Failed to record your vote. Please try again.');
    }
  };
  
  // Handle voting flow steps
  const handleVote = () => {
    if (votingStep === 0) {
      // First step - show confirmation dialog
      setIsConfirmOpen(true);
    }
  };

  // Show already voted view if user has voted before
  if (hasVotedBefore && !isVotingComplete) {
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
            
            <div className="max-w-2xl mx-auto">
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                    <Lock className="h-10 w-10 text-amber-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">You Have Already Voted</h2>
                  <p className="text-foreground/70 mb-6">
                    Our records show that you have already cast your vote in {selectedElection?.name}.
                    Each voter is allowed to vote only once per election.
                  </p>
                  
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={() => navigate('/voter-info')}>
                      View Voting History
                    </Button>
                    <Button onClick={() => navigate('/results')}>
                      View Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              {selectedElection?.name || "Election"}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Cast Your Vote</h1>
            <p className="text-lg text-foreground/80">
              You have 2 minutes to complete your vote. Please verify your choice carefully.
            </p>
          </div>
          
          {/* Election and Voter Info */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary/5 rounded-lg p-4 flex items-center gap-3">
                <Flag className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Participating in:</p>
                  <p className="font-semibold">{selectedElection?.name}</p>
                  <p className="text-xs text-foreground/70">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {selectedElection?.date}
                  </p>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">You are registered to vote in:</p>
                  <p className="font-semibold">{voterInfo.constituency}</p>
                  <p className="text-xs text-foreground/70">
                    <Globe className="h-3 w-3 inline mr-1" />
                    {selectedElection?.region}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {locationAnomaly && (
            <div className="max-w-3xl mx-auto mb-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Location Anomaly Detected</p>
                  <p className="text-sm text-amber-700">
                    Your current location appears to be different from your expected voting area. 
                    This has been logged for security purposes but will not affect your ability to vote.
                  </p>
                </div>
              </div>
            </div>
          )}
          
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
                          
                          {!canVoteForCandidate && (
                            <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20 text-sm flex items-start gap-2 mb-6">
                              <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                              <div>
                                {!isSameConstituency && (
                                  <div>
                                    <strong>Constituency Mismatch:</strong> You can only vote for candidates in your registered constituency ({voterInfo.constituency}).
                                  </div>
                                )}
                                {!isInElection && (
                                  <div className="mt-1">
                                    <strong>Election Mismatch:</strong> This candidate is not participating in the current election.
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {canVoteForCandidate && (
                            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-sm flex items-start gap-2 mb-6">
                              <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <strong>Secure Voting:</strong> Your vote will be securely recorded on the blockchain using MetaMask.
                                The record will be anonymous but verifiable.
                              </div>
                            </div>
                          )}
                          
                          {metamaskError && (
                            <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20 text-sm mb-6">
                              <p className="font-medium text-destructive mb-1">MetaMask Error</p>
                              <p>{metamaskError}</p>
                            </div>
                          )}
                          
                          <Button 
                            size="lg"
                            className="w-full"
                            onClick={handleVote}
                            disabled={isVoting || !canVoteForCandidate || !hasMetaMask}
                          >
                            {isVoting ? (
                              <>
                                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                Recording Your Vote...
                              </>
                            ) : !hasMetaMask ? (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                MetaMask Required to Vote
                              </>
                            ) : !canVoteForCandidate ? (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Cannot Vote (Eligibility Issue)
                              </>
                            ) : (
                              <>
                                <Vote className="mr-2 h-4 w-4" />
                                Vote for {selectedCandidate.name}
                              </>
                            )}
                          </Button>
                          
                          {!hasMetaMask && (
                            <div className="mt-3 text-center">
                              <a 
                                href="https://metamask.io/download/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-primary underline"
                              >
                                Install MetaMask to vote
                              </a>
                            </div>
                          )}
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
                    Your vote has been securely recorded on the blockchain for {selectedElection?.name}.
                    Thank you for participating in the democratic process.
                  </p>
                  
                  <div className="bg-background/50 p-4 rounded-lg mb-6">
                    <div className="text-sm font-medium mb-2">Transaction Details</div>
                    <div className="font-mono text-xs bg-foreground/5 p-2 rounded overflow-x-auto">
                      {transactionHash || '0x7a3b5c21d8e9f456a7b3c2d1e0f9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1'}
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
              You are about to cast your vote for <strong>{selectedCandidate?.name}</strong> of the <strong>{selectedCandidate?.party}</strong> 
              in the <strong>{selectedElection?.name}</strong>. This action cannot be undone once confirmed. 
              Your vote will be signed using MetaMask.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmVote}>
              Sign & Confirm Vote
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
