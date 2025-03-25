
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Shield, 
  Smartphone, 
  Send, 
  RotateCw,
  Wallet,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('otp');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleSendOTP = () => {
    // Validate phone number (basic validation)
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Simulate sending OTP
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setOtpSent(true);
      toast.success('OTP sent to your phone');
    }, 1500);
  };

  const handleVerifyOTP = () => {
    // Validate OTP (basic validation)
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    // Simulate OTP verification
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.success('OTP verified successfully');
      navigate('/candidates');
    }, 2000);
  };

  const handleConnectWallet = () => {
    // Simulate connecting to MetaMask
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setWalletConnected(true);
      toast.success('Wallet connected successfully');
    }, 2000);
  };

  const handleWalletLogin = () => {
    // Simulate wallet authentication
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.success('Authentication successful');
      navigate('/candidates');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8 stagger-animation">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Secure Login</h1>
              <p className="text-foreground/80">
                Access your voting account through our secure authentication system
              </p>
            </div>
            
            <Card className="glass-card">
              <CardHeader>
                <Tabs defaultValue="otp" className="w-full" onValueChange={setLoginMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="otp">OTP Login</TabsTrigger>
                    <TabsTrigger value="wallet">MetaMask</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              
              <CardContent>
                <TabsContent value="otp" className="mt-0">
                  {!otpSent ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex gap-2">
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your registered phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={handleSendOTP}
                        disabled={isVerifying}
                      >
                        {isVerifying ? (
                          <>
                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                            Sending OTP
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send OTP
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 bg-primary/10 p-3 rounded-lg">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <span className="text-sm">OTP sent to {phoneNumber}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <InputOTP 
                          maxLength={6} 
                          value={otpValue}
                          onChange={(value) => setOtpValue(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setOtpSent(false)}
                        >
                          Back
                        </Button>
                        <Button 
                          className="flex-1" 
                          onClick={handleVerifyOTP}
                          disabled={isVerifying || otpValue.length !== 6}
                        >
                          {isVerifying ? (
                            <>
                              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                              Verifying
                            </>
                          ) : (
                            <>
                              Verify OTP
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <div className="text-center">
                        <Button 
                          variant="link" 
                          className="text-sm text-foreground/70"
                          onClick={handleSendOTP}
                          disabled={isVerifying}
                        >
                          Didn't receive OTP? Resend
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="wallet" className="mt-0">
                  <div className="space-y-4">
                    {!walletConnected ? (
                      <>
                        <div className="p-6 border border-dashed border-primary/40 rounded-lg bg-primary/5 text-center">
                          <Wallet className="h-12 w-12 text-primary/60 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
                          <p className="text-sm text-foreground/70 mb-4">
                            You'll need MetaMask wallet to authenticate and sign your vote transactions securely.
                          </p>
                          <Button
                            onClick={handleConnectWallet}
                            disabled={isConnecting}
                            className="w-full"
                          >
                            {isConnecting ? (
                              <>
                                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                              </>
                            ) : (
                              <>
                                <Wallet className="mr-2 h-4 w-4" />
                                Connect MetaMask
                              </>
                            )}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 border border-green-200 rounded-lg bg-green-50 flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-green-800">Wallet Connected</p>
                            <p className="text-sm text-green-700">0x71c...93a4</p>
                          </div>
                        </div>
                        
                        <Button
                          className="w-full"
                          onClick={handleWalletLogin}
                          disabled={isVerifying}
                        >
                          {isVerifying ? (
                            <>
                              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                              Authenticating...
                            </>
                          ) : (
                            <>
                              Proceed to Voting
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </TabsContent>
              </CardContent>
              
              <CardFooter className="flex-col gap-2">
                <div className="w-full border-t border-border pt-4 text-center text-sm text-foreground/70">
                  By logging in, you agree to our Terms of Service and Privacy Policy.
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
