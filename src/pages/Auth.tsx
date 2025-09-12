import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Heart, Mail, Lock, User, GraduationCap, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

type AuthMode = 'signin' | 'signup' | 'userType';
type UserType = 'student' | 'institute' | null;

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('userType');
  const [userType, setUserType] = useState<UserType>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    institution: '',
  });

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setMode('signup');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in a real app, this would call an API
    console.log('Auth attempt:', { mode, userType, formData });
    
    // Simulate successful authentication
    localStorage.setItem('user', JSON.stringify({
      email: formData.email,
      name: formData.name,
      userType,
      institution: formData.institution,
    }));
    
    // Redirect based on user type
    if (userType === 'institute') {
      // Redirect to institute dashboard (mock)
      alert('Welcome to the Institute Dashboard! (Mock redirect)');
    } else {
      // Redirect to student dashboard
      window.location.href = '/dashboard';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (mode === 'userType') {
    return (
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
            <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              Welcome to MindEase
            </h1>
            <p className="text-muted-foreground mt-2">
              Choose how you'd like to continue
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm"
                onClick={() => handleUserTypeSelection('student')}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">I'm a Student</h3>
                    <p className="text-muted-foreground text-sm">
                      Access mental health tools, mood tracking, and peer support
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm"
                onClick={() => handleUserTypeSelection('institute')}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">I'm from an Institution</h3>
                    <p className="text-muted-foreground text-sm">
                      View analytics, manage resources, and support students
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode('signin')}
              className="text-primary hover:text-primary-dark text-sm transition-colors"
            >
              Already have an account? Sign in
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            {mode === 'signin' ? 'Welcome Back' : 'Join MindEase'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mode === 'signin' 
              ? 'Sign in to continue your wellness journey'
              : `Create your ${userType} account`
            }
          </p>
        </div>

        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {mode === 'signup' && userType === 'student' && (
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="institution"
                      name="institution"
                      type="text"
                      placeholder="Enter your school/university"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-primary text-primary-foreground border-0"
                size="lg"
              >
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="mb-4" />
              <Button variant="outline" className="w-full" type="button">
                Continue with Google
              </Button>
            </div>

            <div className="mt-4 text-center">
              {mode === 'signin' ? (
                <>
                  <button
                    onClick={() => setMode('signup')}
                    className="text-primary hover:text-primary-dark text-sm transition-colors"
                  >
                    Don't have an account? Sign up
                  </button>
                  <br />
                  <button
                    onClick={() => setMode('userType')}
                    className="text-muted-foreground hover:text-foreground text-xs transition-colors mt-2"
                  >
                    Change user type
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setMode('signin')}
                    className="text-primary hover:text-primary-dark text-sm transition-colors"
                  >
                    Already have an account? Sign in
                  </button>
                  <br />
                  <button
                    onClick={() => setMode('userType')}
                    className="text-muted-foreground hover:text-foreground text-xs transition-colors mt-2"
                  >
                    Change user type
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;