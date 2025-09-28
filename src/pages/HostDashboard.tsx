import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  BarChart3, Users, Calendar, Euro, TrendingUp, Eye, 
  Heart, MessageSquare, Plus, Settings, Share2, Edit,
  Star, Clock, MapPin, CheckCircle, AlertCircle
} from "lucide-react";

// Import images
import concertImage from "@/assets/event-concert.jpg";
import workshopImage from "@/assets/event-workshop.jpg";
import outdoorImage from "@/assets/event-outdoor.jpg";

// Mock host data
const mockHostData = {
  profile: {
    name: "MusicEvents Italia",
    joinDate: "2019",
    verified: true,
    rating: 4.9,
    totalEvents: 127,
    totalParticipants: 45000
  },
  stats: {
    thisMonth: {
      revenue: 12500,
      events: 8,
      participants: 1200,
      avgRating: 4.8
    },
    growth: {
      revenue: 15.3,
      events: 12.5,
      participants: 8.7,
      rating: 2.1
    }
  },
  upcomingEvents: [
    {
      id: "1",
      title: "Live Music Festival 2024",
      image: concertImage,
      date: "15 Nov 2024",
      status: "active",
      ticketsSold: 847,
      totalTickets: 2000,
      revenue: 42350,
      views: 15420
    },
    {
      id: "2",
      title: "Jazz Night Special",
      image: workshopImage,
      date: "20 Nov 2024", 
      status: "draft",
      ticketsSold: 0,
      totalTickets: 150,
      revenue: 0,
      views: 0
    },
    {
      id: "3",
      title: "Summer Concert Series",
      image: outdoorImage,
      date: "25 Nov 2024",
      status: "pending",
      ticketsSold: 23,
      totalTickets: 500,
      revenue: 1150,
      views: 892
    }
  ],
  recentReviews: [
    {
      id: 1,
      eventTitle: "Rock Festival Milano",
      user: "Marco R.",
      rating: 5,
      comment: "Evento fantastico! Organizzazione perfetta.",
      date: "2 giorni fa"
    },
    {
      id: 2,
      eventTitle: "Workshop Musicale",
      user: "Laura S.",
      rating: 4,
      comment: "Molto interessante, consigliato!",
      date: "1 settimana fa"
    }
  ]
};

const HostDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Attivo</Badge>;
      case "draft":
        return <Badge variant="secondary">Bozza</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">In Revisione</Badge>;
      default:
        return <Badge variant="outline">Sconosciuto</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Host</h1>
            <p className="text-muted-foreground">
              Benvenuto, {mockHostData.profile.name}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Impostazioni
            </Button>
            <Link to="/host/create-event">
              <Button variant="hero">
                Crea Nuovo Evento
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ricavi Mensili</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{mockHostData.stats.thisMonth.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{mockHostData.stats.growth.revenue}%</span> dal mese scorso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventi Attivi</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHostData.stats.thisMonth.events}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{mockHostData.stats.growth.events}%</span> dal mese scorso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partecipanti</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHostData.stats.thisMonth.participants.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{mockHostData.stats.growth.participants}%</span> dal mese scorso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating Medio</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHostData.stats.thisMonth.avgRating}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{mockHostData.stats.growth.rating}%</span> dal mese scorso
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events">I Miei Eventi</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reviews">Recensioni</TabsTrigger>
            <TabsTrigger value="settings">Impostazioni</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">I Miei Eventi</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Tutti</Button>
                  <Button variant="outline" size="sm">Attivi</Button>
                  <Button variant="outline" size="sm">Bozze</Button>
                </div>
              </div>

              <div className="grid gap-6">
                {mockHostData.upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                        <div className="aspect-square md:aspect-auto">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="md:col-span-3 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold">{event.title}</h3>
                                {getStatusBadge(event.status)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {event.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {event.views.toLocaleString()} visualizzazioni
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Modifica
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4 mr-1" />
                                Condividi
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Vendite Biglietti</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Venduti: {event.ticketsSold}</span>
                                  <span>Totale: {event.totalTickets}</span>
                                </div>
                                <Progress 
                                  value={(event.ticketsSold / event.totalTickets) * 100} 
                                  className="h-2"
                                />
                                <div className="text-xs text-muted-foreground">
                                  {Math.round((event.ticketsSold / event.totalTickets) * 100)}% venduto
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">Ricavi</h4>
                              <div className="text-2xl font-bold text-primary">
                                €{event.revenue.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Ricavo totale attuale
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">Performance</h4>
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>Visualizzazioni</span>
                                  <span>{event.views.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Tasso conversione</span>
                                  <span>{event.views > 0 ? ((event.ticketsSold / event.views) * 100).toFixed(1) : 0}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Analytics</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={selectedPeriod === "thisWeek" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedPeriod("thisWeek")}
                  >
                    Questa Settimana
                  </Button>
                  <Button 
                    variant={selectedPeriod === "thisMonth" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedPeriod("thisMonth")}
                  >
                    Questo Mese
                  </Button>
                  <Button 
                    variant={selectedPeriod === "thisYear" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedPeriod("thisYear")}
                  >
                    Quest'Anno
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Andamento Ricavi</CardTitle>
                    <CardDescription>Ricavi degli ultimi 6 mesi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Grafico ricavi</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Partecipanti per Categoria</CardTitle>
                    <CardDescription>Distribuzione per tipo di evento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
                      <div className="text-center">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Grafico partecipanti</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Eventi</CardTitle>
                  <CardDescription>Statistiche dettagliate dei tuoi eventi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">89%</div>
                        <div className="text-sm text-muted-foreground">Tasso di Soddisfazione</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">76%</div>
                        <div className="text-sm text-muted-foreground">Eventi Sold Out</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">3.2h</div>
                        <div className="text-sm text-muted-foreground">Tempo Medio Vendita</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">€78</div>
                        <div className="text-sm text-muted-foreground">Ricavo Medio/Biglietto</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Recensioni</h2>
                <Badge variant="secondary">
                  {mockHostData.recentReviews.length} recensioni recenti
                </Badge>
              </div>

              <div className="grid gap-4">
                {mockHostData.recentReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{review.eventTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            di {review.user} • {review.date}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm italic">"{review.comment}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline">Vedi Tutte le Recensioni</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Impostazioni Host</h2>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profilo Organizzatore</CardTitle>
                    <CardDescription>Gestisci le informazioni del tuo profilo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="orgName">Nome Organizzazione</Label>
                        <Input id="orgName" value={mockHostData.profile.name} />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value="info@musicevents.it" />
                      </div>
                    </div>
                    <Button>Salva Modifiche</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Impostazioni Pagamenti</CardTitle>
                    <CardDescription>Configura i metodi di pagamento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Conto Bancario</h4>
                          <p className="text-sm text-muted-foreground">••••••••••••3456</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <Button variant="outline">Aggiungi Metodo di Pagamento</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifiche</CardTitle>
                    <CardDescription>Gestisci le tue preferenze di notifica</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Nuove prenotazioni</h4>
                          <p className="text-sm text-muted-foreground">Ricevi notifiche per nuove prenotazioni</p>
                        </div>
                        <input type="checkbox" defaultChecked className="scale-125" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Recensioni eventi</h4>
                          <p className="text-sm text-muted-foreground">Ricevi notifiche per nuove recensioni</p>
                        </div>
                        <input type="checkbox" defaultChecked className="scale-125" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default HostDashboard;