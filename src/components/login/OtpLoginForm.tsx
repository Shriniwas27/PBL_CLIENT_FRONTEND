
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Send, RotateCw, ArrowRight, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

const OtpLoginForm = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

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

  if (!otpSent) {
    return (
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
    );
  }

  return (
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
  );
};

export default OtpLoginForm;
