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
    <div className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white/90 backdrop-blur">
            <Heart className="h-4 w-4 text-gray-700" />
          </Button>
        </div>
        {isOnline && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full backdrop-blur">
              Online
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Organizzato da {organizer}
          </p>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="font-medium">{rating}</span>
          <span className="mx-2">•</span>
          <Users className="h-4 w-4 mr-1" />
          <span>{attendees} partecipanti</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
            <span>{date} alle {time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-lg font-bold text-primary">{price}</span>
            <span className="text-sm text-muted-foreground ml-1">a persona</span>
          </div>
          <Button variant="accent" size="sm">
            Prenota
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;