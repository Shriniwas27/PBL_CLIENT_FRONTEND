
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, Smartphone } from 'lucide-react';
import WalletLoginForm from './WalletLoginForm';
import OtpLoginForm from './OtpLoginForm';

const AuthLoginForm = () => {
  const [authMethod, setAuthMethod] = useState<'wallet' | 'otp'>('wallet');

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs defaultValue="wallet" className="w-full" onValueChange={(value) => setAuthMethod(value as 'wallet' | 'otp')}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="wallet" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              MetaMask
            </TabsTrigger>
            <TabsTrigger value="otp" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Phone OTP
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallet">
            <WalletLoginForm />
          </TabsContent>
          
          <TabsContent value="otp">
            <OtpLoginForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthLoginForm;
