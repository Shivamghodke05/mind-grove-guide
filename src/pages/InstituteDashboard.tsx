import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const InstituteDashboard: React.FC = () => {

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Institute Dashboard</h1>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Institute!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is your dedicated dashboard. You can manage resources and view student analytics here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstituteDashboard;
