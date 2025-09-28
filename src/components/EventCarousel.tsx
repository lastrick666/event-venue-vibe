import React from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";

interface EventCarouselProps {
  events: Array<{
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
  }>;
  title: string;
  subtitle?: string;
}

const EventCarousel = ({ events, title, subtitle }: EventCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="hidden md:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="hidden md:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="flex-none w-full md:w-1/2 lg:w-1/3 pr-4 md:pr-6"
            >
              <Link 
                to={`/event/${event.id}`} 
                className="block hover:scale-[1.02] transition-transform duration-200"
              >
                <EventCard {...event} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex justify-center gap-2 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Precedente
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={scrollNext}
        >
          Successivo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default EventCarousel;