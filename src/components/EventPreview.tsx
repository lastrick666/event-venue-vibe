import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users, Star, Euro } from "lucide-react";

interface EventPreviewData {
  title: string;
  description: string;
  category: string;
  eventType: "physical" | "online";
  location: string;
  address: string;
  onlineLink: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  maxCapacity: string;
  ticketTypes: {
    name: string;
    price: string;
    description: string;
    quantity: string;
  }[];
  amenities: string[];
  visibility: string;
}

interface EventPreviewProps {
  eventData: EventPreviewData;
}

const EventPreview = ({ eventData }: EventPreviewProps) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Data da definire";
    return date.toLocaleDateString("it-IT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    return time;
  };

  const getMainTicketPrice = () => {
    if (eventData.ticketTypes.length > 0 && eventData.ticketTypes[0].price) {
      return `€${eventData.ticketTypes[0].price}`;
    }
    return "Prezzo da definire";
  };

  const getTotalCapacity = () => {
    if (eventData.maxCapacity) {
      return `${eventData.maxCapacity} posti`;
    }
    return "Capienza da definire";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background">
      {/* Preview Header */}
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">
          🎭 ANTEPRIMA EVENTO
        </Badge>
        <p className="text-sm text-muted-foreground">
          Ecco come apparirà il tuo evento agli utenti
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Event Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Badge variant="secondary">{eventData.category || "Categoria"}</Badge>
                <h1 className="text-3xl font-bold leading-tight">
                  {eventData.title || "Titolo evento"}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">Nuovo evento</span>
                  </div>
                  <span>•</span>
                  <span>GoEvent Verified</span>
                </div>
              </div>
            </div>

            {/* Event Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-secondary/30 rounded-xl">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{formatDate(eventData.date)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(eventData.startTime)} - {formatTime(eventData.endTime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {eventData.eventType === "online" 
                        ? "Evento Online" 
                        : eventData.location || "Location da definire"
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {eventData.eventType === "online"
                        ? "Link fornito dopo l'acquisto"
                        : eventData.address || "Indirizzo da definire"
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{getTotalCapacity()}</p>
                    <p className="text-sm text-muted-foreground">Capienza massima</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {eventData.visibility === "public" ? "Pubblico" : 
                       eventData.visibility === "private" ? "Privato" : "Su invito"}
                    </p>
                    <p className="text-sm text-muted-foreground">Visibilità evento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Descrizione</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {eventData.description || "Inserisci una descrizione coinvolgente per il tuo evento..."}
              </p>
            </div>
          </div>

          {/* Amenities */}
          {eventData.amenities.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Servizi Inclusi</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {eventData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Pricing Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-primary">{getMainTicketPrice()}</span>
                  <span className="text-sm text-muted-foreground">a persona</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Ticket Types */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Tipologie Biglietti</h4>
                  {eventData.ticketTypes.length > 0 ? (
                    eventData.ticketTypes.map((ticket, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{ticket.name || `Biglietto ${index + 1}`}</span>
                          <span className="font-bold">€{ticket.price || "0"}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {ticket.description || "Descrizione biglietto"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {ticket.quantity ? `${ticket.quantity} disponibili` : "Quantità da definire"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Nessuna tipologia di biglietto configurata
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg" variant="hero" disabled>
                    Prenota Ora
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    Aggiungi al Carrello
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Anteprima - Pulsanti non funzionanti
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {eventData.eventType === "online" ? "Evento Online" : "Posizione"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium mb-1">
                  {eventData.eventType === "online" 
                    ? "Streaming Online" 
                    : eventData.location || "Location da definire"
                  }
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {eventData.eventType === "online"
                    ? "Il link verrà fornito dopo l'acquisto"
                    : eventData.address || "Indirizzo da definire"
                  }
                </p>
                <Button variant="outline" className="w-full" size="sm" disabled>
                  {eventData.eventType === "online" ? "Dettagli Accesso" : "Vedi su Mappa"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;