import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Calendar as CalendarIcon, MapPin, Euro, Users, 
  Clock, Camera, Upload, Save, Eye, Send
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface EventFormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
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
  images: string[];
  amenities: string[];
  ageRestriction: string;
  refundPolicy: string;
  visibility: "public" | "private" | "invite";
}

const categories = [
  "Musica", "Business", "Sport", "Arte", "Food & Drink", 
  "Tecnologia", "Salute & Benessere", "Famiglia", "Educazione", "Social"
];

const amenitiesList = [
  "Parcheggio", "WiFi Gratuito", "Accessibile", "Cibo e Bevande", 
  "Foto/Video Permessi", "Area VIP", "Sicurezza", "Guardaroba"
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    eventType: "physical",
    location: "",
    address: "",
    onlineLink: "",
    date: undefined,
    startTime: "",
    endTime: "",
    maxCapacity: "",
    ticketTypes: [
      { name: "Standard", price: "", description: "", quantity: "" }
    ],
    images: [],
    amenities: [],
    ageRestriction: "none",
    refundPolicy: "flexible",
    visibility: "public"
  });

  const updateFormData = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTicketType = () => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, { name: "", price: "", description: "", quantity: "" }]
    }));
  };

  const updateTicketType = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map((ticket, i) => 
        i === index ? { ...ticket, [field]: value } : ticket
      )
    }));
  };

  const removeTicketType = (index: number) => {
    if (formData.ticketTypes.length > 1) {
      setFormData(prev => ({
        ...prev,
        ticketTypes: prev.ticketTypes.filter((_, i) => i !== index)
      }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: "Bozza salvata!",
      description: "Il tuo evento è stato salvato come bozza."
    });
  };

  const handlePreview = () => {
    toast({
      title: "Anteprima",
      description: "Funzionalità anteprima in arrivo!"
    });
  };

  const handlePublish = () => {
    // Simulate saving
    toast({
      title: "Evento pubblicato! 🎉",
      description: "Il tuo evento è ora visibile al pubblico.",
    });
    
    // Redirect to host dashboard after a delay
    setTimeout(() => {
      navigate("/host/dashboard");
    }, 2000);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Informazioni Generali";
      case 2: return "Location e Logistica";
      case 3: return "Data e Orari";
      case 4: return "Biglietteria e Prezzi";
      case 5: return "Contenuti Multimediali";
      case 6: return "Impostazioni Finali";
      default: return "Crea Evento";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titolo Evento *</Label>
              <Input
                id="title"
                placeholder="es. Live Music Festival 2024"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                {formData.title.length}/100 caratteri
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrizione Evento *</Label>
              <Textarea
                id="description"
                placeholder="Descrivi il tuo evento in dettaglio..."
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                rows={6}
                maxLength={5000}
              />
              <p className="text-xs text-muted-foreground">
                {formData.description.length}/5000 caratteri (minimo 100)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria *</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Sottocategoria</Label>
                <Input
                  id="subcategory"
                  placeholder="es. Rock, Pop, Jazz..."
                  value={formData.subcategory}
                  onChange={(e) => updateFormData("subcategory", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Tipo di Evento *</Label>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer transition-all ${formData.eventType === "physical" ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => updateFormData("eventType", "physical")}
                >
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Evento Fisico</h3>
                    <p className="text-sm text-muted-foreground">In una location specifica</p>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all ${formData.eventType === "online" ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => updateFormData("eventType", "online")}
                >
                  <CardContent className="p-4 text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Evento Online</h3>
                    <p className="text-sm text-muted-foreground">Streaming o videoconferenza</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {formData.eventType === "physical" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Nome Location *</Label>
                  <Input
                    id="location"
                    placeholder="es. Stadio San Siro"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Indirizzo Completo *</Label>
                  <Input
                    id="address"
                    placeholder="es. Via Piccolomini, 5, 20151 Milano MI"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capienza Massima</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="es. 500"
                    value={formData.maxCapacity}
                    onChange={(e) => updateFormData("maxCapacity", e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="onlineLink">Link Streaming *</Label>
                  <Input
                    id="onlineLink"
                    placeholder="es. https://zoom.us/j/123456789"
                    value={formData.onlineLink}
                    onChange={(e) => updateFormData("onlineLink", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Numero Massimo Partecipanti</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="es. 100"
                    value={formData.maxCapacity}
                    onChange={(e) => updateFormData("maxCapacity", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Data Evento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "dd MMMM yyyy", { locale: it }) : "Seleziona data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => updateFormData("date", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Orario Inizio *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateFormData("startTime", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Orario Fine *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateFormData("endTime", e.target.value)}
                />
              </div>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2 text-blue-800">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Suggerimento</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Considera il tempo per setup e breakdown. Un evento musicale potrebbe richiedere 2-3 ore extra.
              </p>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Tipologie di Biglietti</h3>
              <Button onClick={addTicketType} variant="outline" size="sm">
                Aggiungi Tipologia
              </Button>
            </div>

            <div className="space-y-4">
              {formData.ticketTypes.map((ticket, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Biglietto #{index + 1}</h4>
                      {formData.ticketTypes.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeTicketType(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Rimuovi
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome Tipologia *</Label>
                        <Input
                          placeholder="es. Standard, VIP, Early Bird"
                          value={ticket.name}
                          onChange={(e) => updateTicketType(index, "name", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Prezzo (€) *</Label>
                        <Input
                          type="number"
                          placeholder="es. 45"
                          value={ticket.price}
                          onChange={(e) => updateTicketType(index, "price", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Quantità Disponibile *</Label>
                        <Input
                          type="number"
                          placeholder="es. 100"
                          value={ticket.quantity}
                          onChange={(e) => updateTicketType(index, "quantity", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Descrizione</Label>
                        <Input
                          placeholder="es. Accesso completo all'evento"
                          value={ticket.description}
                          onChange={(e) => updateTicketType(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-2 text-green-800">
                <Euro className="h-4 w-4" />
                <span className="text-sm font-medium">Commissioni EventHub</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Applichiamo una commissione del 5% + €0.50 per biglietto venduto.
              </p>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Immagini Evento</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Carica Immagini</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Trascina le immagini qui o clicca per selezionare
                </p>
                <Button variant="outline">
                  Seleziona File
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Formati supportati: JPG, PNG, WebP. Dimensione massima: 10MB per immagine.
              </p>
            </div>

            <div className="space-y-4">
              <Label>Video Promozionale (Opzionale)</Label>
              <Input
                placeholder="https://youtube.com/watch?v=... o Vimeo URL"
                type="url"
              />
              <p className="text-xs text-muted-foreground">
                Aggiungi un video da YouTube o Vimeo per promuovere il tuo evento.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Visibilità Evento</Label>
              <Select value={formData.visibility} onValueChange={(value: any) => updateFormData("visibility", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Pubblico - Visibile a tutti</SelectItem>
                  <SelectItem value="private">Privato - Solo con link</SelectItem>
                  <SelectItem value="invite">Solo su invito</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Servizi Inclusi</Label>
              <div className="grid grid-cols-2 gap-3">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Limite di Età</Label>
              <Select value={formData.ageRestriction} onValueChange={(value) => updateFormData("ageRestriction", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nessun limite</SelectItem>
                  <SelectItem value="18+">18+</SelectItem>
                  <SelectItem value="21+">21+</SelectItem>
                  <SelectItem value="family">Solo famiglie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Politica di Rimborso</Label>
              <Select value={formData.refundPolicy} onValueChange={(value) => updateFormData("refundPolicy", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flexible">Flessibile - Rimborso fino a 24h prima</SelectItem>
                  <SelectItem value="moderate">Moderata - Rimborso fino a 7 giorni prima</SelectItem>
                  <SelectItem value="strict">Rigorosa - Nessun rimborso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link to="/host/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna alla Dashboard
        </Link>

        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Crea Nuovo Evento</h1>
            <Badge variant="outline">
              Step {currentStep} di {totalSteps}
            </Badge>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Step Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Progresso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                  <div 
                    key={step}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      step === currentStep 
                        ? 'bg-primary/10 text-primary' 
                        : step < currentStep 
                          ? 'text-green-600' 
                          : 'text-muted-foreground'
                    }`}
                    onClick={() => setCurrentStep(step)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      step === currentStep 
                        ? 'bg-primary text-white' 
                        : step < currentStep 
                          ? 'bg-green-600 text-white' 
                          : 'bg-secondary'
                    }`}>
                      {step}
                    </div>
                    <span className="text-sm font-medium">
                      {step === 1 && "Info Generali"}
                      {step === 2 && "Location"}
                      {step === 3 && "Data e Orari"}
                      {step === 4 && "Biglietteria"}
                      {step === 5 && "Media"}
                      {step === 6 && "Impostazioni"}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{getStepTitle()}</CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Inserisci le informazioni di base del tuo evento"}
                  {currentStep === 2 && "Specifica dove si svolgerà l'evento"}
                  {currentStep === 3 && "Imposta data e orari dell'evento"}
                  {currentStep === 4 && "Configura i prezzi e le tipologie di biglietti"}
                  {currentStep === 5 && "Aggiungi immagini e video promozionali"}
                  {currentStep === 6 && "Finalizza le impostazioni del tuo evento"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="h-4 w-4 mr-2" />
                  Salva Bozza
                </Button>
                <Button variant="outline" onClick={handlePreview}>
                  <Eye className="h-4 w-4 mr-2" />
                  Anteprima
                </Button>
              </div>

              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    Indietro
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button onClick={nextStep} variant="hero">
                    Continua
                  </Button>
                ) : (
                  <Button onClick={handlePublish} variant="hero">
                    <Send className="h-4 w-4 mr-2" />
                    Pubblica Evento
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateEvent;