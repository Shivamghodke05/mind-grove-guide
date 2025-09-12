import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import MoodTracker from '@/components/MoodTracker';
import BreathingExercise from '@/components/BreathingExercise';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Sun, 
  Moon, 
  Zap,
  Target,
  Clock,
  Award
} from 'lucide-react';

interface User {
  email: string;
  name: string;
  userType: string;
  institution: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to auth if not logged in
      window.location.href = '/auth';
    }
  }, []);

  // Mock data for dashboard
  const mockStats = {
    weeklyMoodAverage: 3.8,
    streak: 12,
    completedSessions: 45,
    totalMinutes: 890
  };

  const recentActivities = [
    { type: 'mood', date: 'Today', description: 'Completed mood check-in' },
    { type: 'breathing', date: 'Today', description: '5-minute breathing exercise' },
    { type: 'mood', date: 'Yesterday', description: 'Completed mood check-in' },
    { type: 'meditation', date: '2 days ago', description: 'Guided meditation session' },
  ];

  const achievements = [
    { 
      title: 'First Steps', 
      description: 'Completed your first mood check-in', 
      icon: Heart, 
      completed: true 
    },
    { 
      title: 'Mindful Week', 
      description: 'Used breathing exercises 7 days in a row', 
      icon: Brain, 
      completed: true 
    },
    { 
      title: 'Consistency Champion', 
      description: 'Daily check-ins for 30 days', 
      icon: Trophy, 
      completed: false 
    },
    { 
      title: 'Zen Master', 
      description: 'Completed 50 meditation sessions', 
      icon: Award, 
      completed: false 
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="gradient-hero text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                <p className="text-primary-foreground/80">
                  Ready to continue your wellness journey today?
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{mockStats.streak}</div>
                <div className="text-sm text-primary-foreground/80">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            icon: Heart, 
            label: 'Weekly Mood Avg', 
            value: mockStats.weeklyMoodAverage.toFixed(1),
            color: 'text-red-500' 
          },
          { 
            icon: Zap, 
            label: 'Current Streak', 
            value: `${mockStats.streak} days`,
            color: 'text-yellow-500' 
          },
          { 
            icon: Target, 
            label: 'Sessions Done', 
            value: mockStats.completedSessions,
            color: 'text-blue-500' 
          },
          { 
            icon: Clock, 
            label: 'Total Minutes', 
            value: `${mockStats.totalMinutes}m`,
            color: 'text-green-500' 
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Today's Wellness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              className="gradient-primary text-primary-foreground border-0 h-auto py-4 px-6"
              onClick={() => setActiveTab('mood')}
            >
              <div className="text-center">
                <Heart className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Mood Check-in</div>
                <div className="text-sm text-primary-foreground/80">
                  How are you feeling today?
                </div>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto py-4 px-6"
              onClick={() => setActiveTab('breathing')}
            >
              <div className="text-center">
                <Brain className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Breathing Exercise</div>
                <div className="text-sm text-muted-foreground">
                  Take a mindful moment
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{activity.description}</div>
                  <div className="text-xs text-muted-foreground">{activity.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.title}
                className={`p-4 rounded-lg border ${
                  achievement.completed 
                    ? 'bg-success/10 border-success/20' 
                    : 'bg-muted/50 border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    achievement.completed ? 'bg-success/20' : 'bg-muted'
                  }`}>
                    <achievement.icon className={`h-5 w-5 ${
                      achievement.completed ? 'text-success' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                    {achievement.completed && (
                      <Badge variant="default" className="mt-2 bg-success text-success-foreground">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="border-b border-border bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">MindEase</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline">{user.institution}</Badge>
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'mood', label: 'Mood Tracker', icon: Heart },
            { id: 'breathing', label: 'Breathing', icon: Brain },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'gradient-primary text-primary-foreground border-0' 
                  : ''
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'mood' && <MoodTracker />}
          {activeTab === 'breathing' && (
            <div className="flex justify-center">
              <BreathingExercise />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;