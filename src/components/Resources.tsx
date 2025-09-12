import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Play, 
  ExternalLink, 
  Download, 
  Clock, 
  Star,
  Headphones,
  Video,
  FileText,
  Book,
  Podcast,
  Music,
  Heart,
  Brain
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article' | 'podcast';
  duration?: string;
  rating: number;
  category: string;
  url: string;
  thumbnail?: string;
}

const Resources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videoResources: Resource[] = [
    {
      id: '1',
      title: '10-Minute Guided Meditation for Anxiety',
      description: 'A calming meditation to help reduce anxiety and promote inner peace.',
      type: 'video',
      duration: '10:45',
      rating: 4.8,
      category: 'meditation',
      url: 'https://www.youtube.com/watch?v=ZToicYcHIOU',
      thumbnail: 'https://img.youtube.com/vi/ZToicYcHIOU/hqdefault.jpg'
    },
    {
      id: '2',
      title: 'Breathing Exercises for Stress Relief',
      description: 'Learn powerful breathing techniques to manage stress and anxiety.',
      type: 'video',
      duration: '8:30',
      rating: 4.9,
      category: 'breathing',
      url: 'https://www.youtube.com/watch?v=tybOi4hjZFQ',
      thumbnail: 'https://img.youtube.com/vi/tybOi4hjZFQ/hqdefault.jpg'
    },
    {
      id: '3',
      title: 'Progressive Muscle Relaxation',
      description: 'Complete body relaxation technique for better sleep and stress relief.',
      type: 'video',
      duration: '15:20',
      rating: 4.7,
      category: 'relaxation',
      url: 'https://www.youtube.com/watch?v=86HUcX8ZtAk',
      thumbnail: 'https://img.youtube.com/vi/86HUcX8ZtAk/hqdefault.jpg'
    },
    {
      id: '4',
      title: 'Morning Mindfulness Routine',
      description: 'Start your day with intention and mindfulness practices.',
      type: 'video',
      duration: '12:15',
      rating: 4.6,
      category: 'mindfulness',
      url: 'https://www.youtube.com/watch?v=ZAHKhiRUJS8',
      thumbnail: 'https://img.youtube.com/vi/ZAHKhiRUJS8/hqdefault.jpg'
    }
  ];

  const audioResources: Resource[] = [
    {
      id: '5',
      title: 'Nature Sounds for Deep Sleep',
      description: 'Relaxing forest sounds to help you fall asleep naturally.',
      type: 'audio',
      duration: '60:00',
      rating: 4.9,
      category: 'sleep',
      url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA'
    },
    {
      id: '6',
      title: 'Calming Rain Sounds',
      description: 'Gentle rain sounds for stress relief and concentration.',
      type: 'audio',
      duration: '45:30',
      rating: 4.8,
      category: 'relaxation',
      url: 'https://www.youtube.com/watch?v=q76bMs-NwRk'
    },
    {
      id: '7',
      title: 'Guided Body Scan Meditation',
      description: 'Audio-only body scan meditation for mindfulness practice.',
      type: 'audio',
      duration: '20:00',
      rating: 4.7,
      category: 'meditation',
      url: 'https://www.youtube.com/watch?v=15q-N-_kkrU'
    },
    {
      id: '8',
      title: 'Anxiety Relief Affirmations',
      description: 'Positive affirmations to help calm anxiety and build confidence.',
      type: 'audio',
      duration: '25:10',
      rating: 4.6,
      category: 'affirmations',
      url: 'https://www.youtube.com/watch?v=K8AamN8XLIg'
    }
  ];

  const articles: Resource[] = [
    {
      id: '9',
      title: 'Understanding Anxiety: A Complete Guide',
      description: 'Comprehensive guide to understanding and managing anxiety disorders.',
      type: 'article',
      rating: 4.8,
      category: 'education',
      url: '#'
    },
    {
      id: '10',
      title: '5 Daily Habits for Better Mental Health',
      description: 'Simple daily practices that can significantly improve your mental wellbeing.',
      type: 'article',
      rating: 4.7,
      category: 'wellness',
      url: '#'
    },
    {
      id: '11',
      title: 'The Science of Meditation',
      description: 'How meditation changes your brain and improves mental health.',
      type: 'article',
      rating: 4.9,
      category: 'education',
      url: '#'
    },
    {
      id: '12',
      title: 'Building Resilience in Difficult Times',
      description: 'Strategies for developing emotional resilience and coping skills.',
      type: 'article',
      rating: 4.6,
      category: 'coping',
      url: '#'
    }
  ];

  const podcasts: Resource[] = [
    {
      id: '13',
      title: 'The Mental Health Podcast',
      description: 'Weekly discussions about mental health, wellness, and recovery.',
      type: 'podcast',
      duration: '45-60 min',
      rating: 4.8,
      category: 'education',
      url: 'https://www.youtube.com/playlist?list=PLrAVreHko6QvGuy_fZmva78iaw9Q6a5tj'
    },
    {
      id: '14',
      title: 'Mindfulness Matters',
      description: 'Exploring mindfulness practices and their benefits for mental health.',
      type: 'podcast',
      duration: '30-45 min',
      rating: 4.7,
      category: 'mindfulness',
      url: 'https://www.youtube.com/playlist?list=PLjF2cUBTGAGWX8G0F2D3ByC6lX5u9F5rQ'
    }
  ];

  const allResources = [...videoResources, ...audioResources, ...articles, ...podcasts];

  const filteredResources = selectedCategory === 'all' 
    ? allResources 
    : allResources.filter(resource => resource.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Resources', icon: Heart },
    { id: 'meditation', label: 'Meditation', icon: Brain },
    { id: 'breathing', label: 'Breathing', icon: Heart },
    { id: 'relaxation', label: 'Relaxation', icon: Music },
    { id: 'sleep', label: 'Sleep', icon: Clock },
    { id: 'mindfulness', label: 'Mindfulness', icon: Star },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'article': return FileText;
      case 'podcast': return Podcast;
      default: return Book;
    }
  };

  const openResource = (url: string) => {
    if (url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="gradient-secondary text-secondary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Wellness Resources</h2>
                <p className="text-secondary-foreground/80">
                  Curated content to support your mental health journey
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{allResources.length}</div>
                <div className="text-sm text-secondary-foreground/80">Resources Available</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Filter */}
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 ${
                  selectedCategory === category.id 
                    ? 'gradient-primary text-primary-foreground border-0' 
                    : ''
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources Tabs */}
      <Tabs defaultValue="videos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="podcasts" className="flex items-center gap-2">
            <Podcast className="h-4 w-4" />
            Podcasts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoResources
              .filter(resource => selectedCategory === 'all' || resource.category === selectedCategory)
              .map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative">
                    <img 
                      src={resource.thumbnail || 'https://via.placeholder.com/300x180?text=Video+Thumbnail'}
                      alt={resource.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button 
                        size="lg"
                        onClick={() => openResource(resource.url)}
                        className="gradient-primary text-primary-foreground border-0"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        Watch Now
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      {resource.duration}
                    </Badge>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{resource.title}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-xs">{resource.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {resource.category}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openResource(resource.url)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        YouTube
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audioResources
              .filter(resource => selectedCategory === 'all' || resource.category === selectedCategory)
              .map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Headphones className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{resource.title}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{resource.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{resource.duration}</span>
                            </div>
                            <Badge variant="secondary">{resource.category}</Badge>
                          </div>
                          <Button 
                            onClick={() => openResource(resource.url)}
                            className="gradient-primary text-primary-foreground border-0"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Listen
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles
              .filter(resource => selectedCategory === 'all' || resource.category === selectedCategory)
              .map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <FileText className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{resource.title}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{resource.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{resource.category}</Badge>
                          <Button variant="outline">
                            <Book className="h-4 w-4 mr-2" />
                            Read Article
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="podcasts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {podcasts
              .filter(resource => selectedCategory === 'all' || resource.category === selectedCategory)
              .map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/20 rounded-lg">
                        <Podcast className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{resource.title}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{resource.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{resource.duration}</span>
                            </div>
                            <Badge variant="secondary">{resource.category}</Badge>
                          </div>
                          <Button 
                            onClick={() => openResource(resource.url)}
                            className="gradient-accent text-accent-foreground border-0"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Listen
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;