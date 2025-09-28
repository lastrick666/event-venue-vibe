import { Button } from "@/components/ui/button";
import { Heart, MapPin, Calendar, Users, Star } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: string;
  organizer: string;
  rating: number;
  attendees: number;
  isOnline?: boolean;
}

const EventCard = ({
  title,
  image,
  category,
  date,
  time,
  location,
  price,
  organizer,
  rating,
  attendees,
  isOnline = false,
}: EventCardProps) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-large border border-border/50 hover:border-primary/30 hover:shadow-extra-large">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow-medium">
            {category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white shadow-soft backdrop-blur-sm">
            <Heart className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
        {isOnline && (
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1.5 bg-accent text-accent-foreground text-sm font-semibold rounded-full shadow-medium">
              Online
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-xl leading-tight text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground font-medium">
            Organizzato da {organizer}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-semibold text-foreground">{rating}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-primary mr-1" />
            <span>{attendees}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm font-medium text-foreground">
            <Calendar className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
            <span>{date} alle {time}</span>
          </div>
          <div className="flex items-center text-sm font-medium text-foreground">
            <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-black text-primary">{price}</span>
            <span className="text-sm text-muted-foreground ml-1">a persona</span>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent text-white font-semibold px-6 shadow-medium">
            Prenota
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;