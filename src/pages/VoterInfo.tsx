
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  UserCheck, 
  Calendar, 
  MapPin, 
  Info, 
  ShieldCheck, 
  FileText,
  ChevronRight,
  Users,
  Clock,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const VoterInfo = () => {
  const voterDetails = {
    name: 'John Smith',
    voterId: 'ABC1234567',
    age: 32,
    address: '123 Main Street, Anytown',
    constituency: 'North District',
    pollingStation: 'Community Center, Block B',
    registrationDate: 'January 15, 2024',
    votingStatus: 'Not Voted',
  };

  const upcomingElections = [
    {
      id: 1,
      name: 'General Elections',
      date: 'May 12, 2025',
      votingHours: '8:00 AM - 6:00 PM',
    },
    {
      id: 2,
      name: 'Local Council Elections',
      date: 'August 24, 2025',
      votingHours: '9:00 AM - 5:00 PM',
    }
  ];

  const faqs = [
    {
      question: 'What ID do I need to bring on voting day?',
      answer: 'You must bring your voter ID card and a government-issued photo ID such as passport, driver\'s license, or national ID card.'
    },
    {
      question: 'Can I vote if I've recently moved?',
      answer: 'If you've moved to a new constituency, you need to update your voter registration at least 30 days before the election. If you've moved within the same constituency, you can vote at your assigned polling station.'
    },
    {
      question: 'What if I can't vote in person on election day?',
      answer: 'You may be eligible for early voting or mail-in ballots. Applications for these options must be submitted at least 14 days before the election.'
    },
    {
      question: 'How can I verify my voter registration status?',
      answer: 'You can verify your registration status online through our voter portal or by contacting your local election office.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="container-custom py-12">
          <div className="text-center max-w-2xl mx-auto mb-8 stagger-animation">
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Voter Information</h1>
            <p className="text-lg text-foreground/80">
              Access your voter profile and election details
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Voter Profile Card */}
            <Card className="glass-card lg:col-span-2">
              <CardHeader className="border-b border-border pb-4">
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-primary" />
                  Voter Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{voterDetails.name}</h3>
                      <p className="text-sm text-foreground/70">
                        Voter ID: <span className="font-mono">{voterDetails.voterId}</span>
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground/70">Age</p>
                        <p>{voterDetails.age} years</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground/70">Registration Date</p>
                        <p>{voterDetails.registrationDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground/70">Address</p>
                      <p>{voterDetails.address}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground/70">Constituency</p>
                      <p>{voterDetails.constituency}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground/70">Polling Station</p>
                      <p>{voterDetails.pollingStation}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="p-4 mb-4 bg-primary/10 rounded-lg">
                      <h3 className="font-medium mb-2">Voting Status</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span>{voterDetails.votingStatus}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 mt-auto">
                      <Button asChild>
                        <Link to="/candidates">
                          View Candidates 
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/voting">
                          Go to Voting
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" asChild>
                        <Link to="/guidelines">
                          Voting Guidelines
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Links Card */}
            <Card className="glass-card">
              <CardHeader className="border-b border-border pb-4">
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Quick Access
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/candidates">
                      <Users className="mr-2 h-4 w-4 text-primary" />
                      View Candidates
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/guidelines">
                      <FileText className="mr-2 h-4 w-4 text-primary" />
                      Voting Guidelines
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/results">
                      <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                      Election Results
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/complaints">
                      <AlertCircle className="mr-2 h-4 w-4 text-primary" />
                      Submit Complaint
                    </Link>
                  </Button>
                  <Separator className="my-2" />
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="flex items-center text-sm font-medium text-yellow-800 mb-2">
                      <Clock className="h-4 w-4 mr-1 text-yellow-600" />
                      Next Election
                    </h3>
                    <p className="text-sm text-yellow-700">
                      {upcomingElections[0].name}
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                      {upcomingElections[0].date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Elections */}
          <Card className="glass-card mb-12">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Upcoming Elections
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Election</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Voting Hours</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingElections.map((election) => (
                    <TableRow key={election.id}>
                      <TableCell className="font-medium">{election.name}</TableCell>
                      <TableCell>{election.date}</TableCell>
                      <TableCell>{election.votingHours}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/guidelines">
                            Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* FAQs */}
          <Card className="glass-card">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className="text-foreground/80">{faq.answer}</p>
                    {index < faqs.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoterInfo;
