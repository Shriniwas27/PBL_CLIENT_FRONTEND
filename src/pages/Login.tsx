
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import LoginHeader from '@/components/login/LoginHeader';
import OtpLoginForm from '@/components/login/OtpLoginForm';
import WalletLoginForm from '@/components/login/WalletLoginForm';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('otp');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto">
            <LoginHeader />
            
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
                  <OtpLoginForm />
                </TabsContent>
                
                <TabsContent value="wallet" className="mt-0">
                  <WalletLoginForm />
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
