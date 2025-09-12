import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Sun, Cloud, CloudRain, Heart, Zap, Coffee } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  energy: number;
  note: string;
  tags: string[];
}

const moodEmojis = [
  { icon: Frown, color: 'text-red-500', label: 'Struggling' },
  { icon: CloudRain, color: 'text-orange-500', label: 'Low' },
  { icon: Cloud, color: 'text-yellow-500', label: 'Okay' },
  { icon: Sun, color: 'text-blue-500', label: 'Good' },
  { icon: Smile, color: 'text-green-500', label: 'Great' },
];

const energyLevels = [
  { icon: Coffee, label: 'Exhausted' },
  { icon: Cloud, label: 'Tired' },
  { icon: Meh, label: 'Neutral' },
  { icon: Zap, label: 'Energetic' },
  { icon: Heart, label: 'Vibrant' },
];

const commonTags = [
  'anxious', 'stressed', 'grateful', 'accomplished', 'lonely',
  'excited', 'overwhelmed', 'peaceful', 'motivated', 'tired'
];

const MoodTracker: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [currentEnergy, setCurrentEnergy] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('mood-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = (newEntries: MoodEntry[]) => {
    localStorage.setItem('mood-entries', JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const handleSubmitEntry = () => {
    if (currentMood === null || currentEnergy === null) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      energy: currentEnergy,
      note,
      tags: selectedTags,
    };

    const updatedEntries = [newEntry, ...entries];
    saveEntries(updatedEntries);
    
    // Reset form
    setCurrentMood(null);
    setCurrentEnergy(null);
    setNote('');
    setSelectedTags([]);
    setShowForm(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const todayEntry = entries.find(entry => entry.date === new Date().toISOString().split('T')[0]);
  const recentEntries = entries.slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Daily Mood Check-in</CardTitle>
          <p className="text-muted-foreground">
            Track your emotions and reflect on your day
          </p>
        </CardHeader>
      </Card>

      {/* Today's Entry or Form */}
      {todayEntry && !showForm ? (
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Today's Check-in Complete!</h3>
              
              <div className="flex justify-center items-center gap-8">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Mood</div>
                  <div className="flex items-center justify-center">
                    {React.createElement(moodEmojis[todayEntry.mood].icon, {
                      className: `h-8 w-8 ${moodEmojis[todayEntry.mood].color}`
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {moodEmojis[todayEntry.mood].label}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Energy</div>
                  <div className="flex items-center justify-center">
                    {React.createElement(energyLevels[todayEntry.energy].icon, {
                      className: 'h-8 w-8 text-accent'
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {energyLevels[todayEntry.energy].label}
                  </div>
                </div>
              </div>

              {todayEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {todayEntry.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Button 
                variant="outline" 
                onClick={() => setShowForm(true)}
                className="mt-4"
              >
                Update Today's Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mood Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Your mood right now:
              </label>
              <div className="flex justify-between gap-2">
                {moodEmojis.map((mood, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentMood(index)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      currentMood === index 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {React.createElement(mood.icon, {
                      className: `h-6 w-6 mx-auto ${mood.color}`
                    })}
                    <div className="text-xs mt-1 text-muted-foreground">
                      {mood.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Your energy level:
              </label>
              <div className="flex justify-between gap-2">
                {energyLevels.map((energy, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentEnergy(index)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      currentEnergy === index 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border hover:border-accent/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {React.createElement(energy.icon, {
                      className: 'h-6 w-6 mx-auto text-accent'
                    })}
                    <div className="text-xs mt-1 text-muted-foreground">
                      {energy.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                What describes your day? (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {commonTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Any thoughts to capture? (optional)
              </label>
              <Textarea
                placeholder="What's on your mind today..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-20"
              />
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmitEntry}
              disabled={currentMood === null || currentEnergy === null}
              className="w-full gradient-primary text-primary-foreground border-0"
              size="lg"
            >
              Save Today's Check-in
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      {React.createElement(moodEmojis[entry.mood].icon, {
                        className: `h-5 w-5 ${moodEmojis[entry.mood].color}`
                      })}
                      {React.createElement(energyLevels[entry.energy].icon, {
                        className: 'h-5 w-5 text-accent'
                      })}
                    </div>
                  </div>
                  {entry.tags.length > 0 && (
                    <div className="flex gap-1">
                      {entry.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MoodTracker;