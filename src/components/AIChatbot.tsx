import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Heart, 
  Brain,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: string;
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI therapy companion. I'm here to listen and support you through your mental health journey. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses based on keywords
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      return "I understand you're feeling anxious. That's completely valid. Try this: Take three deep breaths with me. Breathe in for 4 counts, hold for 4, and exhale for 6. Remember, anxiety is temporary, and you have the strength to get through this. What specifically is making you feel anxious?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      return "I hear that you're feeling down, and I want you to know that your feelings are valid. Depression can make everything feel overwhelming, but you're not alone. Have you been able to do any small self-care activities today? Even tiny steps count. What's one thing you're grateful for right now?";
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
      return "Feeling stressed and overwhelmed is so common, especially in today's world. Let's break this down together. What's the biggest source of stress for you right now? Sometimes just naming it can help reduce its power over us. Would you like to try a quick mindfulness exercise?";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      return "Sleep issues can really impact our mental health. Good sleep hygiene is crucial for emotional wellbeing. Try creating a bedtime routine: no screens 1 hour before sleep, keep your room cool and dark, and try some gentle stretching or meditation. What's your current sleep routine like?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('better') || lowerMessage.includes('helped')) {
      return "I'm so glad I could help! Remember, healing isn't linear - you'll have good days and challenging days, and that's completely normal. You're doing great by reaching out and taking care of your mental health. What's one thing you're looking forward to?";
    }
    
    if (lowerMessage.includes('how are you')) {
      return "Thank you for asking! As an AI, I don't have feelings, but I'm here and ready to support you. I'm designed to listen without judgment and offer coping strategies. What brings you here today? How can I help you feel better?";
    }

    // Default responses
    const defaultResponses = [
      "That sounds really challenging. Can you tell me more about how this is affecting you?",
      "I hear you, and I want you to know that your feelings are completely valid. What do you think might help you feel better right now?",
      "Thank you for sharing that with me. It takes courage to open up. What support do you have in your life?",
      "I'm here to listen. Sometimes just talking through our thoughts can help us process them better. What's on your mind?",
      "That's a lot to handle. Remember, you don't have to face this alone. What coping strategies have you tried before?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI therapy companion. I'm here to listen and support you through your mental health journey. How are you feeling today?",
        sender: 'ai',
        timestamp: new Date(),
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-foreground/20 rounded-lg">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">AI Therapy Assistant</h2>
                  <p className="text-primary-foreground/80">
                    Your 24/7 mental health companion
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
                  Online
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearChat}
                  className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chat Interface */}
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Therapy Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="h-96 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/30 rounded-lg">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-border'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-background border border-border p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... I'm here to listen."
              className="flex-1 min-h-[60px] resize-none"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="gradient-primary text-primary-foreground border-0 self-end"
              size="lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Anxiety Support",
            description: "Get help with anxiety and panic",
            icon: Brain,
            prompt: "I'm feeling anxious and need some coping strategies"
          },
          {
            title: "Mood Check",
            description: "Talk about how you're feeling",
            icon: Heart,
            prompt: "I'd like to talk about my mood today"
          },
          {
            title: "Self-Care Tips",
            description: "Learn self-care techniques",
            icon: Sparkles,
            prompt: "Can you give me some self-care suggestions?"
          }
        ].map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="bg-background/50 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => setInputText(action.prompt)}
            >
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <action.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{action.title}</h4>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <Card className="bg-warning/10 border-warning/20">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Important:</strong> This AI assistant provides support and coping strategies but is not a replacement for professional therapy. 
            If you're experiencing a mental health crisis, please contact a healthcare provider or crisis hotline immediately.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatbot;