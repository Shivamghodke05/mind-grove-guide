import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MoodTracker from '@/components/MoodTracker';
import BreathingExercise from '@/components/BreathingExercise';
import AIChatbot from '@/components/AIChatbot';
import Resources from '@/components/Resources';
import Support from '@/components/Support';
import Booking from '@/components/Booking';
import { motion } from 'framer-motion';
import { 
  Heart, 
  LogOut,
  Brain, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Sun, 
  Moon, 
  Zap,
  Target,
  Clock,
  Award,
  MessageCircle,
  BookOpen,
  Phone,
  CalendarDays,
  LucideIcon
} from 'lucide-react';
import { signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';

interface User {
  email: string;
  name: string;
  userType: string;
  institution: string;
}

interface MoodEntry {
  id: string;
  mood: number;
  note: string;
  date: string;
  energy: number;
  tags: string[];
}

interface Appointment {
  id: string;
  therapist: string;
  date: Timestamp;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  userEmail: string;
}

interface DashboardStats {
  streak: number;
  weeklyMoodAverage: number;
  completedSessions: number;
  totalMinutes: number;
}

interface Activity {
  type: string;
  description: string;
  createdAt: Date;
}

const iconMap: { [key: string]: LucideIcon } = {
  Heart,
  Brain,
  Trophy,
  Award,
};

const mockActivities: Activity[] = [
  {
    type: 'breathing',
    description: 'Completed a 5-minute breathing exercise',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    type: 'chat',
    description: 'Chatted with the AI therapy bot',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    type: 'resources',
    description: 'Read an article on mindfulness',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({ 
    streak: 0, weeklyMoodAverage: 0, completedSessions: 0, totalMinutes: 0 
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>(mockActivities); // Initialize with mock data

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      window.location.href = '/auth';
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        setFirebaseUser(user);
        fetchDashboardData(user.uid, user.email);
      } else {
        setFirebaseUser(null);
        window.location.href = '/auth';
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchDashboardData = async (userId: string, userEmail: string) => {
    try {
      // Fetch appointments
      const appointmentsQuery = query(collection(db, "appointments"), where("userEmail", "==", userEmail));
      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      const appointments = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      const completedSessions = appointments.filter(a => a.status === 'completed').length;

      // Fetch mood entries
      const moodQuery = query(collection(db, "users", userId, "moodEntries"), orderBy("date", "desc"));
      const moodSnapshot = await getDocs(moodQuery);
      const moodEntries = moodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MoodEntry));

      // Calculate stats
      const weeklyMoodAverage = moodEntries.length > 0 ? moodEntries.reduce((acc, entry) => acc + entry.mood, 0) / moodEntries.length : 0;
      const streak = calculateStreak(moodEntries);
      const totalMinutes = completedSessions * 50; // Assuming 50 mins per session

      setDashboardStats({ streak, weeklyMoodAverage, completedSessions, totalMinutes });

      // Combine and sort recent activity
      const moodActivities: Activity[] = moodEntries.slice(0, 3).map(entry => ({
        type: 'mood',
        description: `Logged a mood of ${entry.mood}/5`,
        createdAt: new Date(entry.date),
      }));

      const appointmentActivities: Activity[] = appointments.slice(0, 2).map(app => ({
        type: 'appointment',
        description: `Session with ${app.therapist} - ${app.status}`,
        createdAt: app.date.toDate(),
      }));

      let combinedActivities = [...moodActivities, ...appointmentActivities]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      // If no real activity, use the mock data
      if (combinedActivities.length === 0) {
        setRecentActivity(mockActivities);
      } else {
        setRecentActivity(combinedActivities.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // In case of error, you can still show mock data
      setRecentActivity(mockActivities);
    }
  };

  const calculateStreak = (moodEntries: MoodEntry[]): number => {
    if (moodEntries.length === 0) return 0;
    
    let streak = 1;
    let lastDate = new Date(moodEntries[0].date);
    lastDate.setHours(0, 0, 0, 0);

    for (let i = 1; i < moodEntries.length; i++) {
      const currentDate = new Date(moodEntries[i].date);
      currentDate.setHours(0, 0, 0, 0);
      
      const diffTime = lastDate.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak++;
        lastDate = currentDate;
      } else if (diffDays > 1) {
        break;
      }
    }
    return streak;
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      window.location.href = '/auth';
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user || !firebaseUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 mx-auto text-primary mb-4 animate-pulse" />
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
                <div className="text-3xl font-bold">{dashboardStats.streak}</div>
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
            value: dashboardStats.weeklyMoodAverage.toFixed(1),
            color: 'text-red-500' 
          },
          { 
            icon: Zap, 
            label: 'Current Streak', 
            value: `${dashboardStats.streak} days`,
            color: 'text-yellow-500' 
          },
          { 
            icon: Target, 
            label: 'Sessions Done', 
            value: dashboardStats.completedSessions,
            color: 'text-blue-500' 
          },
          { 
            icon: Clock, 
            label: 'Total Minutes', 
            value: `${dashboardStats.totalMinutes}m`,
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
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{activity.description}</div>
                  <div className="text-xs text-muted-foreground">{new Date(activity.createdAt).toLocaleDateString()}</div>
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
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Heart className="h-6 w-6 text-primary" />
              <span className="hidden font-bold sm:inline-block">
                MindEase
              </span>
            </a>
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Badge variant="outline">{user.institution}</Badge>
            <Button variant="outline" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'mood', label: 'Mood Tracker', icon: Heart },
            { id: 'breathing', label: 'Breathing', icon: Brain },
            { id: 'chatbot', label: 'AI Therapy', icon: MessageCircle },
            { id: 'resources', label: 'Resources', icon: BookOpen },
            { id: 'support', label: 'Support', icon: Phone },
            { id: 'booking', label: 'Book Session', icon: CalendarDays },
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
          {activeTab === 'mood' && <MoodTracker userId={firebaseUser.uid} />}
          {activeTab === 'breathing' && (
            <div className="flex justify-center">
              <BreathingExercise />
            </div>
          )}
          {activeTab === 'chatbot' && <AIChatbot />}
          {activeTab === 'resources' && <Resources />}
          {activeTab === 'support' && <Support />}
          {activeTab === 'booking' && <Booking />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
