import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { 
  User, Mail, Phone, MapPin, Calendar, Heart, 
  Settings, Bell, CreditCard, Shield, Edit2,
  Star, Award, Users, BarChart3 
} from "lucide-react";

// Import images
import concertImage from "@/assets/event-concert.jpg";
import workshopImage from "@/assets/event-workshop.jpg";
import outdoorImage from "@/assets/event-outdoor.jpg";

// Mock user data
const mockUser = {
  id: "user123",
  name: "Marco Rossi",
  email: "marco.rossi@email.com",
  phone: "+39 333 123 4567",
  location: "Milano, Italia",
  joinDate: "Gennaio 2023",
  avatar: "",
  bio: "Appassionato di eventi musicali e culturali. Organizzo workshop creativi nel tempo libero.",
  stats: {
    eventsAttended: 24,
    eventsOrganized: 8,
    reviewsGiven: 15,
    averageRating: 4.8
  },
  preferences: {
    categories: ["Musica", "Arte", "Business"],
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  }
};

// Mock wishlist events
const wishlistEvents = [
  {
    id: "w1",
    title: "Workshop di Fotografia Urbana",
    image: workshopImage,
    category: "Arte",
    date: "20 Nov 2024",
    time: "14:00",
    location: "Centro Storico Milano",
    price: "€75",
    organizer: "PhotoMaster Studio",
    rating: 4.7,
    attendees: 25,
    isOnline: false,
  },
  {
    id: "w2",
    title: "Concerto Jazz al Tramonto",
    image: concertImage,
    category: "Musica",
    date: "25 Nov 2024",
    time: "19:30",
    location: "Blue Note Milano",
    price: "€35",
    organizer: "Jazz Milano",
    rating: 4.9,
    attendees: 120,
    isOnline: false,
  }
];

// Mock attended events
const attendedEvents = [
  {
    id: "a1",
    title: "Festival della Tecnologia",
    image: outdoorImage,
    category: "Tecnologia",
    date: "15 Ott 2024",
    time: "09:00",
    location: "Fiera Milano",
    price: "€45",
    organizer: "TechEvents Italia",
    rating: 4.6,
    attendees: 1200,
    isOnline: false,
    userRating: 5,
    userReview: "Evento fantastico! Tanti speaker interessanti e networking eccezionale."
  }
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(mockUser);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Profile Card */}
              <div className="p-6 border rounded-2xl bg-card space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Il Mio Profilo</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center space-y-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src={userInfo.avatar} />
                    <AvatarFallback className="text-xl font-bold bg-gradient-to-r from-primary to-accent text-white">
                      {userInfo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input 
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        className="text-center"
                      />
                      <Input 
                        value={userInfo.bio}
                        onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                        placeholder="La tua bio..."
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveProfile}>Salva</Button>
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                          Annulla
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{userInfo.name}</h3>
                      <p className="text-sm text-muted-foreground">{userInfo.bio}</p>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Iscritto dal {userInfo.joinDate}</span>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{userInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{userInfo.location}</span>
                  </div>
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{userInfo.stats.eventsAttended}</div>
                    <div className="text-xs text-muted-foreground">Eventi Partecipati</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{userInfo.stats.eventsOrganized}</div>
                    <div className="text-xs text-muted-foreground">Eventi Organizzati</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{userInfo.stats.reviewsGiven}</div>
                    <div className="text-xs text-muted-foreground">Recensioni</div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold">{userInfo.stats.averageRating}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 border rounded-2xl bg-card space-y-3">
                <h3 className="font-semibold text-sm">Azioni Rapide</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Impostazioni
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifiche
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pagamenti
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="wishlist" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="attended">Partecipati</TabsTrigger>
                <TabsTrigger value="organized">Organizzati</TabsTrigger>
                <TabsTrigger value="reviews">Recensioni</TabsTrigger>
              </TabsList>

              <TabsContent value="wishlist" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">I Miei Eventi Preferiti</h2>
                    <Badge variant="secondary">{wishlistEvents.length} eventi</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlistEvents.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>

                  {wishlistEvents.length === 0 && (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Nessun evento in wishlist</h3>
                      <p className="text-muted-foreground mb-4">
                        Aggiungi eventi alla tua wishlist per trovarli facilmente qui
                      </p>
                      <Button variant="outline">Esplora Eventi</Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="attended" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Eventi Partecipati</h2>
                    <Badge variant="secondary">{attendedEvents.length} eventi</Badge>
                  </div>
                  
                  <div className="space-y-6">
                    {attendedEvents.map((event) => (
                      <div key={event.id} className="border rounded-2xl p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="aspect-[4/3] rounded-lg overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="md:col-span-2 space-y-3">
                            <div>
                              <Badge variant="secondary" className="mb-2">{event.category}</Badge>
                              <h3 className="text-xl font-bold">{event.title}</h3>
                              <p className="text-muted-foreground">
                                {event.date} • {event.location}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">La tua valutazione:</span>
                                <div className="flex">
                                  {[...Array(event.userRating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {event.userReview && (
                              <div className="p-3 bg-secondary/30 rounded-lg">
                                <p className="text-sm italic">"{event.userReview}"</p>
                              </div>
                            )}
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Rivedi Evento
                              </Button>
                              <Button variant="outline" size="sm">
                                Altri Eventi Simili
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="organized" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Eventi Organizzati</h2>
                    <Button variant="hero">
                      Crea Nuovo Evento
                    </Button>
                  </div>
                  
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nessun evento organizzato ancora</h3>
                    <p className="text-muted-foreground mb-4">
                      Inizia a organizzare eventi per la tua community
                    </p>
                    <Button variant="hero">Crea il Tuo Primo Evento</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Le Mie Recensioni</h2>
                    <Badge variant="secondary">{userInfo.stats.reviewsGiven} recensioni</Badge>
                  </div>
                  
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nessuna recensione ancora</h3>
                    <p className="text-muted-foreground mb-4">
                      Partecipa agli eventi e lascia le tue recensioni per aiutare la community
                    </p>
                    <Button variant="outline">Esplora Eventi</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;