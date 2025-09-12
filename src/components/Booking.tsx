import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  CheckCircle,
  Video,
  Users,
  Heart,
  Brain,
  MessageCircle,
  DollarSign
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Therapist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  experience: string;
  rate: string;
  availability: string[];
  image: string;
  bio: string;
}

interface Appointment {
  id: string;
  therapist: string;
  date: Date;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTherapist, setSelectedTherapist] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  const therapists: Therapist[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Trauma', 'CBT'],
      rating: 4.9,
      experience: '12 years',
      rate: '$150/session',
      availability: ['Mon', 'Wed', 'Fri'],
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      bio: 'Specializing in cognitive behavioral therapy and trauma-informed care.'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      title: 'Licensed Marriage & Family Therapist',
      specialties: ['Couples Therapy', 'Family Counseling', 'Communication'],
      rating: 4.8,
      experience: '8 years',
      rate: '$130/session',
      availability: ['Tue', 'Thu', 'Sat'],
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      bio: 'Helping couples and families build stronger, healthier relationships.'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      title: 'Licensed Social Worker',
      specialties: ['Teen Counseling', 'ADHD', 'Behavioral Issues'],
      rating: 4.7,
      experience: '6 years',
      rate: '$120/session',
      availability: ['Mon', 'Tue', 'Thu'],
      image: 'https://images.unsplash.com/photo-1594824405743-1b42b8c9ac54?w=300&h=300&fit=crop&crop=face',
      bio: 'Passionate about helping adolescents navigate life challenges.'
    }
  ];

  const appointmentTypes = [
    { id: 'individual', name: 'Individual Therapy', icon: User, duration: '50 min', description: 'One-on-one therapy session' },
    { id: 'couples', name: 'Couples Therapy', icon: Users, duration: '60 min', description: 'Relationship counseling' },
    { id: 'family', name: 'Family Therapy', icon: Heart, duration: '60 min', description: 'Family counseling session' },
    { id: 'consultation', name: 'Initial Consultation', icon: MessageCircle, duration: '30 min', description: 'First meeting to discuss needs' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const mockAppointments: Appointment[] = [
    {
      id: '1',
      therapist: 'Dr. Sarah Johnson',
      date: new Date('2024-01-15'),
      time: '2:00 PM',
      type: 'Individual Therapy',
      status: 'upcoming'
    },
    {
      id: '2',
      therapist: 'Dr. Michael Chen',
      date: new Date('2024-01-08'),
      time: '10:00 AM',
      type: 'Couples Therapy',
      status: 'completed'
    }
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedTherapist || !appointmentType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appointment Booked!",
      description: "You'll receive a confirmation email shortly.",
      duration: 3000,
    });

    // Reset form
    setSelectedTime('');
    setNotes('');
    setContactInfo({ name: '', email: '', phone: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-primary/20 text-primary';
      case 'completed': return 'bg-success/20 text-success';
      case 'cancelled': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted/20 text-muted-foreground';
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
        <Card className="gradient-wellness text-wellness-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Book Your Therapy Session</h2>
                <p className="text-wellness-foreground/80">
                  Connect with licensed professionals who care about your wellbeing
                </p>
              </div>
              <div className="p-4 bg-wellness-foreground/20 rounded-lg">
                <CalendarIcon className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="book" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="book">Book Session</TabsTrigger>
          <TabsTrigger value="therapists">Our Therapists</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="book" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Booking Form */}
            <div className="space-y-6">
              {/* Appointment Type */}
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Session Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {appointmentTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          appointmentType === type.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-background hover:bg-muted/50'
                        }`}
                        onClick={() => setAppointmentType(type.id)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <type.icon className="h-4 w-4" />
                          <span className="font-medium text-sm">{type.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{type.description}</p>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{type.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Therapist Selection */}
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Select Therapist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedTherapist} onValueChange={setSelectedTherapist}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your therapist" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapists.map((therapist) => (
                        <SelectItem key={therapist.id} value={therapist.id}>
                          <div className="flex items-center gap-2">
                            <span>{therapist.name}</span>
                            <Badge variant="secondary">{therapist.rate}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Additional Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share any specific concerns, goals, or questions you'd like to discuss..."
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Calendar and Time Selection */}
            <div className="space-y-6">
              {/* Calendar */}
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border mx-auto"
                  />
                </CardContent>
              </Card>

              {/* Time Selection */}
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Available Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className={`${
                          selectedTime === time 
                            ? 'gradient-primary text-primary-foreground border-0' 
                            : ''
                        }`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Booking Summary */}
              {selectedDate && selectedTime && selectedTherapist && appointmentType && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-primary/10 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Booking Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">
                          {selectedDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">
                          {appointmentTypes.find(t => t.id === appointmentType)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Therapist:</span>
                        <span className="font-medium">
                          {therapists.find(t => t.id === selectedTherapist)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate:</span>
                        <span className="font-medium">
                          {therapists.find(t => t.id === selectedTherapist)?.rate}
                        </span>
                      </div>
                      <Button 
                        onClick={handleBooking}
                        className="w-full gradient-primary text-primary-foreground border-0 mt-4"
                      >
                        Confirm Booking
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="therapists">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapists.map((therapist, index) => (
              <motion.div
                key={therapist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <img
                        src={therapist.image}
                        alt={therapist.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                      />
                      <h3 className="font-semibold">{therapist.name}</h3>
                      <p className="text-sm text-muted-foreground">{therapist.title}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{therapist.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-1">
                          {therapist.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Experience:</span>
                        <span>{therapist.experience}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Rate:</span>
                        <span className="font-medium">{therapist.rate}</span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">{therapist.bio}</p>
                      
                      <Button 
                        className="w-full gradient-primary text-primary-foreground border-0"
                        onClick={() => {
                          setSelectedTherapist(therapist.id);
                          // Switch to booking tab
                          const bookTab = document.querySelector('[value="book"]') as HTMLElement;
                          bookTab?.click();
                        }}
                      >
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <div className="space-y-4">
            {mockAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <CalendarIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{appointment.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            with {appointment.therapist}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm">
                              {appointment.date.toLocaleDateString()}
                            </span>
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        {appointment.status === 'upcoming' && (
                          <div className="mt-2 space-y-1">
                            <Button size="sm" variant="outline">
                              <Video className="h-3 w-3 mr-1" />
                              Join Session
                            </Button>
                          </div>
                        )}
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

export default Booking;