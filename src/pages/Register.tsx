import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Mail, Lock, Eye, EyeOff, User, Users,
  Facebook, ArrowLeft, MapPin 
} from "lucide-react";
import logoRevent from "@/assets/logo-revent.png";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "user", // user or host
    city: "",
    acceptTerms: false,
    acceptMarketing: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Errore",
        description: "Le password non coincidono",
        variant: "destructive"
      });
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Errore",
        description: "Devi accettare i termini e condizioni",
        variant: "destructive"
      });
      return;
    }

    // Mock registration
    toast({
      title: "Registrazione completata! 🎉",
      description: `Benvenuto ${formData.firstName}! Il tuo account è stato creato.`
    });
    
    // Simulate registration and redirect
    setTimeout(() => {
      if (formData.accountType === "host") {
        navigate("/host/dashboard");
      } else {
        navigate("/profile");
      }
    }, 2000);
  };

  const handleSocialRegister = (provider: string) => {
    toast({
      title: `Registrazione con ${provider}`,
      description: "Funzionalità in arrivo!"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Link to="/home" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alla Home
          </Link>

          <Card className="w-full">
            <CardHeader className="space-y-1 text-center">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={logoRevent} 
                  alt="Revent" 
                  className="h-16 w-auto"
                  style={{
                    filter: 'drop-shadow(0 0 8px hsl(var(--primary)))'
                  }}
                />
              </div>
              <CardTitle className="text-2xl font-bold">Unisciti a Revent</CardTitle>
              <CardDescription>
                Crea il tuo account per iniziare a scoprire eventi fantastici
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Account Type Selection */}
              <div className="space-y-3">
                <Label>Tipo di Account</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Card 
                    className={`cursor-pointer transition-all ${formData.accountType === "user" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setFormData({...formData, accountType: "user"})}
                  >
                    <CardContent className="p-4 text-center">
                      <User className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium text-sm">Partecipante</h4>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all ${formData.accountType === "host" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setFormData({...formData, accountType: "host"})}
                  >
                    <CardContent className="p-4 text-center">
                      <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium text-sm">Organizzatore</h4>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Social Registration */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialRegister("Google")}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Registrati con Google
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialRegister("Facebook")}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Registrati con Facebook
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">oppure</span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome *</Label>
                    <Input
                      id="firstName"
                      placeholder="Mario"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Cognome *</Label>
                    <Input
                      id="lastName"
                      placeholder="Rossi"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="mario.rossi@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Città</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="city"
                      placeholder="Milano"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Conferma Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked as boolean})}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm">
                      Accetto i{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Termini e Condizioni
                      </Link>{" "}
                      e la{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptMarketing"
                      checked={formData.acceptMarketing}
                      onCheckedChange={(checked) => setFormData({...formData, acceptMarketing: checked as boolean})}
                    />
                    <Label htmlFor="acceptMarketing" className="text-sm">
                      Voglio ricevere email su eventi e promozioni
                    </Label>
                  </div>
                </div>

              <Button type="submit" className="w-full" variant="hero">
                {formData.accountType === "host" ? "Diventa Organizzatore" : "Crea Account"}
              </Button>
            </form>

            {/* Guest Access */}
            <div className="text-center">
              <Link to="/home">
                <Button variant="outline" className="w-full">
                  🎭 Accedi come Ospite
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-2">
                Esplora eventi senza registrarti
              </p>
            </div>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Hai già un account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Accedi qui
                </Link>
              </span>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;