import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Heart, 
  Users, 
  Shield,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  id: string;
  name: string;
  type: 'crisis' | 'support' | 'professional' | 'emergency';
  phone: string;
  availability: string;
  description: string;
  website?: string;
}

const Support: React.FC = () => {
  const { toast } = useToast();

  const contactNumbers: ContactInfo[] = [
    {
      id: '1',
      name: 'Crisis Text Line',
      type: 'crisis',
      phone: 'Text HOME to 741741',
      availability: '24/7',
      description: 'Free, confidential crisis support via text message',
      website: 'https://www.crisistextline.org'
    },
    {
      id: '2',
      name: 'National Suicide Prevention Lifeline',
      type: 'crisis',
      phone: '988',
      availability: '24/7',
      description: 'Free and confidential emotional support for people in suicidal crisis',
      website: 'https://suicidepreventionlifeline.org'
    },
    {
      id: '3',
      name: 'NAMI Helpline',
      type: 'support',
      phone: '1-800-950-NAMI (6264)',
      availability: 'Mon-Fri 10am-10pm ET',
      description: 'Information, support and referrals for mental health concerns',
      website: 'https://www.nami.org'
    },
    {
      id: '4',
      name: 'SAMHSA National Helpline',
      type: 'support',
      phone: '1-800-662-4357',
      availability: '24/7',
      description: 'Treatment referral and information service for mental health and substance abuse',
      website: 'https://www.samhsa.gov'
    },
    {
      id: '5',
      name: 'Emergency Services',
      type: 'emergency',
      phone: '911',
      availability: '24/7',
      description: 'For immediate medical emergencies and life-threatening situations'
    },
    {
      id: '6',
      name: 'Teen Line',
      type: 'support',
      phone: '1-800-852-8336',
      availability: 'Daily 6pm-10pm PT',
      description: 'Confidential support for teens by teens',
      website: 'https://teenline.org'
    }
  ];

  const localResources = [
    {
      name: 'Community Mental Health Centers',
      description: 'Local mental health services in your area',
      icon: MapPin,
      action: 'Find Locations'
    },
    {
      name: 'Support Groups',
      description: 'Connect with others who understand your experience',
      icon: Users,
      action: 'Find Groups'
    },
    {
      name: 'Therapy Providers',
      description: 'Licensed therapists and counselors near you',
      icon: Heart,
      action: 'Find Therapists'
    }
  ];

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${name} contact info copied`,
        duration: 2000,
      });
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crisis': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'emergency': return 'bg-warning/20 text-warning-foreground border-warning/30';
      case 'support': return 'bg-primary/20 text-primary border-primary/30';
      case 'professional': return 'bg-secondary/20 text-secondary border-secondary/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'crisis': return AlertTriangle;
      case 'emergency': return Shield;
      case 'support': return Heart;
      case 'professional': return Users;
      default: return Phone;
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
        <Card className="gradient-accent text-accent-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Support & Crisis Resources</h2>
                <p className="text-accent-foreground/80">
                  You're not alone. Help is available 24/7.
                </p>
              </div>
              <div className="p-4 bg-accent-foreground/20 rounded-lg">
                <Phone className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Crisis Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-destructive/10 border-destructive/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-destructive mb-2">In Crisis? Get Help Now</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're having thoughts of suicide or self-harm, please reach out immediately. 
                  You matter, and there are people who want to help.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="destructive"
                    onClick={() => window.open('tel:988')}
                    className="flex-shrink-0"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call 988
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('sms:741741')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Text HOME to 741741
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Numbers */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Crisis & Support Hotlines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactNumbers.map((contact, index) => {
            const IconComponent = getTypeIcon(contact.type);
            return (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getTypeColor(contact.type)}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{contact.name}</h4>
                          <Badge className={getTypeColor(contact.type)}>
                            {contact.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {contact.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm font-medium">
                              {contact.phone}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(contact.phone, contact.name)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{contact.availability}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm"
                            onClick={() => window.open(`tel:${contact.phone.replace(/[^0-9]/g, '')}`)}
                            className="gradient-primary text-primary-foreground border-0"
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call Now
                          </Button>
                          {contact.website && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(contact.website, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Website
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Local Resources */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Local Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {localResources.map((resource, index) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6 text-center">
                  <div className="p-4 bg-secondary/20 rounded-lg w-fit mx-auto mb-4">
                    <resource.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold mb-2">{resource.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <Button variant="outline" className="w-full">
                    {resource.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Online Support */}
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Online Support Communities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: '7 Cups of Tea',
                description: 'Free emotional support and online therapy',
                url: 'https://www.7cups.com'
              },
              {
                name: 'Mental Health America',
                description: 'Resources, screening tools, and support',
                url: 'https://www.mhanational.org'
              },
              {
                name: 'Reddit Mental Health',
                description: 'Community support and discussion forums',
                url: 'https://www.reddit.com/r/mentalhealth'
              },
              {
                name: 'NAMI Support Groups',
                description: 'Local and online support group finder',
                url: 'https://www.nami.org/Support-Education/Support-Groups'
              }
            ].map((community, index) => (
              <div 
                key={community.name}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
              >
                <div>
                  <h5 className="font-medium">{community.name}</h5>
                  <p className="text-sm text-muted-foreground">{community.description}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(community.url, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="bg-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2">Remember</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You are not alone in this journey</li>
                <li>• Seeking help is a sign of strength, not weakness</li>
                <li>• Recovery is possible with the right support</li>
                <li>• These services are confidential and free</li>
                <li>• Don't hesitate to reach out - help is always available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;