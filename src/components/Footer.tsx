import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logoRevent from "@/assets/logo-revent.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/home" className="flex items-center">
              <img 
                src={logoRevent} 
                alt="Revent" 
                className="h-10 w-auto rounded-xl"
                style={{
                  filter: 'drop-shadow(0 0 8px hsl(var(--primary)))'
                }}
              />
            </Link>
            <p className="text-muted-foreground text-sm">
              La piattaforma italiana per scoprire e creare eventi straordinari. 
              Connetti le persone attraverso esperienze memorabili.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Eventi */}
          <div>
            <h3 className="font-semibold mb-4">Eventi</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Esplora Eventi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Categorie</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Eventi Online</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Eventi Gratuiti</a></li>
            </ul>
          </div>

          {/* Host */}
          <div>
            <h3 className="font-semibold mb-4">Per Host</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Crea un Evento</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Diventa Host</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Strumenti Promozionali</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dashboard Host</a></li>
            </ul>
          </div>

          {/* Supporto */}
          <div>
            <h3 className="font-semibold mb-4">Supporto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Centro Assistenza</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contattaci</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Termini di Utilizzo</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Revent. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Termini</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;