
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  ChevronRight,
  FileText,
  Shield,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Guidelines = () => {
  const votingSteps = [
    {
      title: "Verify Your Identity",
      description: "Login using your registered mobile number and the OTP sent to you, or connect your MetaMask wallet.",
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
    {
      title: "Browse Candidates",
      description: "View detailed profiles of candidates in your constituency to make an informed decision.",
      icon: <FileText className="h-8 w-8 text-primary" />,
    },
    {
      title: "Cast Your Vote",
      description: "Select your preferred candidate and confirm your choice within the 2-minute voting window.",
      icon: <Vote className="h-8 w-8 text-primary" />,
    },
    {
      title: "Receive Confirmation",
      description: "Get a blockchain transaction receipt as proof that your vote was recorded securely.",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
    },
  ];

  const faqs = [
    {
      question: "What do I need to vote?",
      answer: "You need your registered mobile number for OTP verification or a MetaMask wallet connected to the supported blockchain network.",
    },
    {
      question: "How is my vote kept secure and private?",
      answer: "Your vote is encrypted and recorded on the blockchain. While the vote itself is recorded, your identity remains anonymous in the public ledger.",
    },
    {
      question: "What happens if I don't complete my vote within 2 minutes?",
      answer: "The voting session will expire, and you'll need to restart the process. This timeout ensures security and prevents voter manipulation.",
    },
    {
      question: "Can I change my vote after submitting?",
      answer: "No, once your vote is recorded on the blockchain, it cannot be changed. This ensures the integrity of the voting process.",
    },
    {
      question: "How can I verify my vote was counted?",
      answer: "After voting, you'll receive a transaction receipt that you can use to verify your vote was recorded on the blockchain without revealing who you voted for.",
    },
    {
      question: "What if I encounter technical issues?",
      answer: "You can file a complaint through our dedicated support portal, and our technical team will assist you promptly.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="container-custom py-12">
          <div className="text-center max-w-2xl mx-auto mb-12 stagger-animation">
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Voter Guidelines</h1>
            <p className="text-lg text-foreground/80">
              Everything you need to know about using our blockchain-based voting platform.
            </p>
          </div>
          
          {/* Voting process */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">The Voting Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {votingSteps.map((step, index) => (
                <Card key={index} className="relative card-hover">
                  <div className="absolute top-4 left-4 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="font-bold text-primary">{index + 1}</div>
                  </div>
                  <CardContent className="pt-16 pb-6 px-6 text-center">
                    <div className="mb-4">{step.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-foreground/80">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Important information */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Important Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Required documents */}
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Required Documents</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Valid government-issued ID (if voting in person)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Access to your registered mobile phone number</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>MetaMask wallet (if using blockchain wallet login)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Authentication methods */}
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Authentication Methods</h3>
                      <div className="space-y-4">
                        <div className="bg-background/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Smartphone className="h-4 w-4 text-primary" />
                            <span className="font-medium">OTP Authentication</span>
                          </div>
                          <p className="text-sm text-foreground/80">
                            Secure login using a one-time password sent to your registered mobile number.
                          </p>
                        </div>
                        
                        <div className="bg-background/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Wallet className="h-4 w-4 text-primary" />
                            <span className="font-medium">MetaMask Integration</span>
                          </div>
                          <p className="text-sm text-foreground/80">
                            Connect your MetaMask wallet to sign and verify your vote on the blockchain.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Card className="glass-card">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-7">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional help */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Need Additional Help?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="text-center p-6 card-hover">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">File a Complaint</h3>
                <p className="text-foreground/80 mb-4">
                  Encountered an issue with the voting process? Report it to our support team.
                </p>
                <Link to="/complaints">
                  <Button className="w-full">
                    File Complaint
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
              
              <Card className="text-center p-6 card-hover">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
                <p className="text-foreground/80 mb-4">
                  Our support team is available to assist you with any questions or concerns.
                </p>
                <Button className="w-full" variant="outline">
                  Contact Support
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Card>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Vote?</h2>
            <p className="text-foreground/80 mb-6">
              Now that you're familiar with the process, cast your vote in the upcoming election.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login">
                <Button size="lg">
                  Login to Vote
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/candidates">
                <Button size="lg" variant="outline">
                  Browse Candidates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
