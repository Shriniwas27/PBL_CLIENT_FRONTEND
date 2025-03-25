
import React from 'react';
import { Shield } from 'lucide-react';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8 stagger-animation">
      <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
        <Shield className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Secure Login</h1>
      <p className="text-foreground/80">
        Access your voting account through our secure authentication system
      </p>
    </div>
  );
};

export default LoginHeader;
