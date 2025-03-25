
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { 
  ChevronRight, 
  Shield, 
  Clock, 
  Vote, 
  Users, 
  BarChart4, 
  Check,
  Globe
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="stagger-animation">
              <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Secure • Transparent • Efficient
              </div>
              <h1 className="mb-6">Blockchain Voting <span className="text-primary">Reimagined</span></h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8">
                Experience voting like never before with our secure blockchain-based platform.
                Complete transparency, immutable records, and instant verification.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="group">
                    Cast Your Vote
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/guidelines">
                  <Button size="lg" variant="outline">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-6 md:p-8 rounded-2xl animate-float">
                <div className="absolute -top-3 -right-3 h-20 w-20 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-accent/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary">BlockVote</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Secure Voting</div>
                        <div className="text-sm text-foreground/70">Protected by blockchain</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium">Real-time Results</div>
                        <div className="text-sm text-foreground/70">Instant verification</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Vote className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Transparent Process</div>
                        <div className="text-sm text-foreground/70">Fully auditable</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-secondary/50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 stagger-animation">
            <h2 className="mb-4">How Our Platform Works</h2>
            <p className="text-lg text-foreground/80">
              Our blockchain-based voting system ensures security, transparency, and efficiency
              at every step of the electoral process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Secure Authentication",
                description: "Multi-factor authentication with OTP verification and MetaMask integration."
              },
              {
                icon: <Vote className="h-10 w-10 text-primary" />,
                title: "Transparent Voting",
                description: "Cast your vote securely with a 2-minute timeout window for focused decision making."
              },
              {
                icon: <BarChart4 className="h-10 w-10 text-primary" />,
                title: "Immutable Results",
                description: "All votes are recorded on the blockchain, ensuring tamper-proof electoral results."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Candidate Profiles",
                description: "Comprehensive information about candidates by constituency for informed decisions."
              },
              {
                icon: <Globe className="h-10 w-10 text-primary" />,
                title: "Multilingual Support",
                description: "Access the platform in multiple languages for inclusive participation."
              },
              {
                icon: <Check className="h-10 w-10 text-primary" />,
                title: "Instant Verification",
                description: "Verify your vote was counted correctly with blockchain confirmation."
              }
            ].map((feature, index) => (
              <div key={index} className="card-hover glass-card p-6 rounded-xl">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
            <h2 className="mb-6">Ready to Cast Your Vote?</h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of voters who have already experienced the future of secure and 
              transparent democratic participation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="group">
                  Login Now
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/guidelines">
                <Button size="lg" variant="outline">
                  View Voter Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-background/20 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-background"></div>
                </div>
                <span className="font-bold text-xl">BlockVote</span>
              </div>
              <p className="text-background/80">
                Secure, transparent, and efficient blockchain voting platform.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-background/80 hover:text-background transition-colors">Home</Link></li>
                <li><Link to="/candidates" className="text-background/80 hover:text-background transition-colors">Candidates</Link></li>
                <li><Link to="/guidelines" className="text-background/80 hover:text-background transition-colors">Voter Guidelines</Link></li>
                <li><Link to="/results" className="text-background/80 hover:text-background transition-colors">Results</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/complaints" className="text-background/80 hover:text-background transition-colors">File Complaint</Link></li>
                <li><Link to="/voter-info" className="text-background/80 hover:text-background transition-colors">Voter Information</Link></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">FAQ</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-12 pt-6 text-center text-background/60 text-sm">
            &copy; {new Date().getFullYear()} BlockVote. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
