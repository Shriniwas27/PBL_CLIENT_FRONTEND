
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Filter,
  User,
  MapPin,
  FileText,
  ChevronRight,
  Vote,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock candidate data
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
  {
    id: 3,
    name: 'Sophia Chen',
    party: 'Democratic Front',
    constituency: 'East Province',
    age: 38,
    education: 'Master in International Relations',
    experience: 'Former Diplomat, NGO Director',
    manifesto: 'International cooperation and human rights',
    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 4,
    name: 'James Wilson',
    party: 'Liberty Party',
    constituency: 'East Province',
    age: 41,
    education: 'Bachelor of Economics',
    experience: 'Small Business Owner, Community Organizer',
    manifesto: 'Individual freedom and minimal government',
    imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: 5,
    name: 'Elena Rodriguez',
    party: 'Green Future',
    constituency: 'West Region',
    age: 36,
    education: 'PhD in Environmental Science',
    experience: 'Environmental Activist, University Professor',
    manifesto: 'Climate action and ecological preservation',
    imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: 6,
    name: 'Daniel Kim',
    party: 'People\'s Coalition',
    constituency: 'West Region',
    age: 49,
    education: 'Master in Social Work',
    experience: 'Labor Union Leader, Social Worker',
    manifesto: 'Workers\' rights and social welfare',
    imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    id: 7,
    name: 'Olivia Martinez',
    party: 'National Unity',
    constituency: 'South Territory',
    age: 44,
    education: 'JD, Master in Public Administration',
    experience: 'State Attorney, Legal Advisor',
    manifesto: 'Law and order, national security',
    imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    id: 8,
    name: 'Robert Thompson',
    party: 'Reform Movement',
    constituency: 'South Territory',
    age: 55,
    education: 'MD, Master in Health Policy',
    experience: 'Hospital Director, Health Policy Advisor',
    manifesto: 'Healthcare reform and medical innovation',
    imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
];

// Mock constituencies
const constituencies = [
  'All Constituencies',
  'North District',
  'East Province',
  'West Region',
  'South Territory',
];

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('All Constituencies');
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);

  // Filter candidates based on search and constituency
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.party.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesConstituency = selectedConstituency === 'All Constituencies' || 
                               candidate.constituency === selectedConstituency;
    return matchesSearch && matchesConstituency;
  });

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="container-custom py-12">
          <div className="text-center max-w-2xl mx-auto mb-12 stagger-animation">
            <h1 className="text-4xl font-bold mb-4">Candidates</h1>
            <p className="text-lg text-foreground/80">
              Learn about the candidates in your constituency and make an informed choice.
            </p>
          </div>
          
          {/* Filters and search */}
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  placeholder="Search candidates or parties"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-64">
                <Filter className="h-4 w-4 text-foreground/50" />
                <Select 
                  value={selectedConstituency} 
                  onValueChange={setSelectedConstituency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Constituency" />
                  </SelectTrigger>
                  <SelectContent>
                    {constituencies.map((constituency) => (
                      <SelectItem key={constituency} value={constituency}>
                        {constituency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Candidate grid with detailed view */}
          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">
                {filteredCandidates.length} Candidates
                {selectedConstituency !== 'All Constituencies' && ` in ${selectedConstituency}`}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredCandidates.map((candidate) => (
                  <Card 
                    key={candidate.id} 
                    className={`overflow-hidden card-hover cursor-pointer ${
                      selectedCandidateId === candidate.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedCandidateId(candidate.id)}
                  >
                    <CardContent className="p-0">
                      <div className="flex gap-4 p-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                          <img 
                            src={candidate.imageUrl} 
                            alt={candidate.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg">{candidate.name}</h3>
                          <div className="text-sm text-foreground/70">{candidate.party}</div>
                          <div className="flex items-center mt-2 text-sm text-foreground/70">
                            <MapPin className="h-3 w-3 mr-1" />
                            {candidate.constituency}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredCandidates.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-lg font-medium text-foreground/70">No candidates found</div>
                  <div className="text-sm text-foreground/50 mt-2">Try adjusting your filters</div>
                </div>
              )}
            </div>
            
            {/* Detailed candidate information */}
            <div className="h-fit sticky top-20">
              {selectedCandidate ? (
                <Card className="overflow-hidden glass-card">
                  <div className="h-40 bg-gradient-to-r from-primary/20 to-accent/20 relative">
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/90 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-xs px-3 py-1 rounded-full bg-primary/20 text-primary">
                      Candidate #{selectedCandidate.id}
                    </div>
                  </div>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-end -mt-10 mb-6">
                      <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-background">
                        <img 
                          src={selectedCandidate.imageUrl} 
                          alt={selectedCandidate.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold">{selectedCandidate.name}</h3>
                        <div className="text-foreground/70">{selectedCandidate.party}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background/50 p-3 rounded-lg">
                          <div className="text-sm text-foreground/70">Age</div>
                          <div className="font-medium">{selectedCandidate.age} years</div>
                        </div>
                        <div className="bg-background/50 p-3 rounded-lg">
                          <div className="text-sm text-foreground/70">Constituency</div>
                          <div className="font-medium">{selectedCandidate.constituency}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium text-foreground/70 mb-1 flex items-center gap-1">
                            <User className="h-3 w-3" /> Education
                          </div>
                          <div className="text-sm">{selectedCandidate.education}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-foreground/70 mb-1 flex items-center gap-1">
                            <FileText className="h-3 w-3" /> Experience
                          </div>
                          <div className="text-sm">{selectedCandidate.experience}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-foreground/70 mb-1 flex items-center gap-1">
                            <FileText className="h-3 w-3" /> Manifesto
                          </div>
                          <div className="text-sm">{selectedCandidate.manifesto}</div>
                        </div>
                      </div>
                      
                      <Link to="/voting" state={{ candidateId: selectedCandidate.id }}>
                        <Button className="w-full mt-4 group">
                          <Vote className="mr-2 h-4 w-4" />
                          Vote for this Candidate
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full glass-card">
                  <CardContent className="flex flex-col items-center justify-center p-8 h-full text-center">
                    <User className="h-16 w-16 text-foreground/20 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Select a Candidate</h3>
                    <p className="text-foreground/70 mb-4">
                      Click on a candidate card to view detailed information
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
