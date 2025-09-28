import { Button } from "@/components/ui/button";
import { Search, User, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GoEvent
          </span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca eventi, categorie, location..."
              className="w-full h-10 pl-10 pr-4 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/home" className="text-sm font-medium hover:text-primary transition-colors">
              Esplora Eventi
            </Link>
            <Link to="/host/create-event" className="text-sm font-medium hover:text-primary transition-colors">
              Diventa Host
            </Link>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Aiuto
            </a>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Link to="/login">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Accedi
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="hero" size="sm">
                Registrati
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;