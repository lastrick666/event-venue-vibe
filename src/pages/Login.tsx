import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Mail, Lock, Eye, EyeOff, 
  Facebook, Github, ArrowLeft 
} from "lucide-react";
import logoRevent from "@/assets/logo-revent.png";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login validation
    if (formData.email && formData.password) {
      toast({
        title: "Accesso effettuato! 🎉",
        description: "Benvenuto su EventHub!"
      });
      
      // Simulate login and redirect
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } else {
      toast({
        title: "Errore",
        description: "Inserisci email e password",
        variant: "destructive"
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Login con ${provider}`,
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
              <CardTitle className="text-2xl font-bold">Bentornato!</CardTitle>
              <CardDescription>
                Accedi al tuo account Revent per continuare
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Social Login */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continua con Google
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialLogin("Facebook")}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Continua con Facebook
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

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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
                  <Label htmlFor="password">Password</Label>
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded" />
                    <Label htmlFor="remember" className="text-sm">Ricordami</Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Password dimenticata?
                  </Link>
                </div>

                <Button type="submit" className="w-full" variant="hero">
                  Accedi
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
                  Non hai un account?{" "}
                  <Link to="/register" className="text-primary hover:underline font-medium">
                    Registrati qui
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

export default Login;