
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VoterHistory from '@/components/voting/VoterHistory';
import { ArrowLeft, UserCircle, Shield, MapPin, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const VoterInfo = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [voterDetails, setVoterDetails] = useState({
    name: 'John Smith',
    voterId: 'ABC1234567',
    constituency: 'North District',
    registrationDate: '2022-03-15',
    lastLogin: new Date().toISOString().split('T')[0],
  });
  const [tab, setTab] = useState('profile');
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [locationAnomaly, setLocationAnomaly] = useState(false);
  const [registeredLocation, setRegisteredLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    address: "San Francisco, CA"
  });

  useEffect(() => {
    // Check if user is authenticated
    const authenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authenticated);
    
    if (!authenticated) {
      navigate('/login');
    }
    
    // Load voter details from sessionStorage/localStorage if available
    const storedVoterId = sessionStorage.getItem('voterId') || 'ABC1234567';
    
    // In a real app, this would come from the backend
    // For demo purposes, we're using mock data
    setVoterDetails({
      name: sessionStorage.getItem('voterName') || 'John Smith',
      voterId: storedVoterId,
      constituency: sessionStorage.getItem('constituency') || 'North District',
      registrationDate: '2022-03-15',
      lastLogin: new Date().toISOString().split('T')[0],
    });
  }, [navigate]);

  useEffect(() => {
    // Get user's current location if they allow
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(currentLocation);
          
          // Check for location anomaly - simplified distance calculation
          // In a real app, you would use a proper geolocation service
          const distance = calculateDistance(
            currentLocation.latitude, 
            currentLocation.longitude,
            registeredLocation.latitude,
            registeredLocation.longitude
          );
          
          // If user is more than 100km from registered location, flag as anomaly
          if (distance > 100) {
            setLocationAnomaly(true);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [registeredLocation]);

  // Simple haversine formula to calculate distance between two coordinates in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
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
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
          
          <div className="text-center max-w-2xl mx-auto mb-8 stagger-animation">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Voter Information</h1>
            <p className="text-lg text-foreground/80">
              View your voter profile, voting history, and verify your voting activity.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs value={tab} onValueChange={setTab} className="mb-8">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Voter Profile
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Voting History
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`col-span-full ${tab === 'profile' ? 'md:col-span-1' : 'hidden md:block'}`}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Voter Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-foreground/70 mb-1">Name</div>
                      <div className="font-medium">{voterDetails.name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground/70 mb-1">Voter ID</div>
                      <div className="font-medium">{voterDetails.voterId}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground/70 mb-1">Constituency</div>
                      <div className="font-medium">{voterDetails.constituency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground/70 mb-1">Registered On</div>
                      <div className="font-medium">{voterDetails.registrationDate}</div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <div className="text-sm font-medium">Registered Location</div>
                      </div>
                      <div className="text-sm mt-1">{registeredLocation.address}</div>
                    </div>
                    
                    {locationAnomaly && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mt-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <div className="text-sm font-medium text-amber-800">Location Anomaly Detected</div>
                        </div>
                        <div className="text-xs text-amber-700 mt-1">
                          Your current location is significantly different from your registered address.
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className={`col-span-full ${tab === 'profile' ? 'md:col-span-2' : 'md:col-span-3'}`}>
                <TabsContent value="profile" className="mt-0 space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Active & Upcoming Elections</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        {
                          id: 1,
                          name: "General Elections 2023",
                          type: "General",
                          constituency: "North District",
                          date: "2023-11-30",
                          status: "Active",
                          detail: "This is a general election for the North District. Voters will elect representatives for the next 4-year term.",
                          candidates: 5,
                          votingHours: "8:00 AM - 5:00 PM",
                          requiresId: true,
                          location: "All designated polling stations in North District"
                        },
                        {
                          id: 2,
                          name: "Local Council Election 2023",
                          type: "Local",
                          constituency: "North District",
                          date: "2023-12-15",
                          status: "Upcoming",
                          detail: "Election for local council positions including mayor, deputy mayor, and council members.",
                          candidates: 12,
                          votingHours: "9:00 AM - 6:00 PM",
                          requiresId: true,
                          location: "City Hall and Community Centers"
                        }
                      ].map((election) => (
                        <div key={election.id} className="p-4 border border-primary/20 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{election.name}</h3>
                              <div className="text-sm text-foreground/70 mb-2">
                                {election.type} Election • {election.date}
                              </div>
                            </div>
                            <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                              election.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {election.status}
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm font-medium mb-1 flex items-center gap-1">
                                  <Info className="h-3 w-3" />
                                  Description
                                </div>
                                <div className="text-sm">{election.detail}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-1">Location</div>
                                <div className="text-sm">{election.location}</div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm font-medium mb-1">Candidates</div>
                                <div className="text-sm">{election.candidates} candidates</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-1">Voting Hours</div>
                                <div className="text-sm">{election.votingHours}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-1">Requirements</div>
                                <div className="text-sm">
                                  {election.requiresId ? "Valid ID required" : "No special requirements"}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex gap-3">
                            {election.status === 'Active' ? (
                              <>
                                <Link to="/candidates">
                                  <Button size="sm">View Candidates</Button>
                                </Link>
                                <Link to="/voting">
                                  <Button size="sm" variant="outline">Cast Vote</Button>
                                </Link>
                              </>
                            ) : (
                              <Link to="/candidates">
                                <Button size="sm" variant="outline">Preview Candidates</Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <VoterHistory />
                </TabsContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterInfo;
