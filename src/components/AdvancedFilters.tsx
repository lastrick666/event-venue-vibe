import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SlidersHorizontal, Calendar as CalendarIcon, MapPin, Euro, Clock, X } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface FilterState {
  category: string[];
  priceRange: [number, number];
  dateRange: { from?: Date; to?: Date };
  location: string;
  distance: number;
  timeOfDay: string[];
  eventType: string[];
  amenities: string[];
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

const categories = [
  "Musica", "Business", "Sport", "Arte", "Food & Drink", 
  "Tecnologia", "Salute & Benessere", "Famiglia", "Educazione", "Social"
];

const timeSlots = [
  { id: "morning", label: "Mattina (6:00-12:00)" },
  { id: "afternoon", label: "Pomeriggio (12:00-18:00)" },
  { id: "evening", label: "Sera (18:00-24:00)" },
  { id: "night", label: "Notte (24:00-6:00)" }
];

const eventTypes = [
  { id: "free", label: "Eventi Gratuiti" },
  { id: "paid", label: "Eventi a Pagamento" },
  { id: "online", label: "Eventi Online" },
  { id: "physical", label: "Eventi in Presenza" },
  { id: "recurring", label: "Eventi Ricorrenti" }
];

const amenitiesList = [
  { id: "parking", label: "Parcheggio" },
  { id: "wifi", label: "WiFi Gratuito" },
  { id: "accessible", label: "Accessibile" },
  { id: "food", label: "Cibo e Bevande" },
  { id: "photography", label: "Foto/Video Permessi" }
];

const AdvancedFilters = ({ onFiltersChange }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [0, 200],
    dateRange: {},
    location: "",
    distance: 50,
    timeOfDay: [],
    eventType: [],
    amenities: []
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
    
    // Count active filters
    let count = 0;
    if (updated.category.length > 0) count++;
    if (updated.priceRange[0] > 0 || updated.priceRange[1] < 200) count++;
    if (updated.dateRange.from || updated.dateRange.to) count++;
    if (updated.location.trim()) count++;
    if (updated.distance < 50) count++;
    if (updated.timeOfDay.length > 0) count++;
    if (updated.eventType.length > 0) count++;
    if (updated.amenities.length > 0) count++;
    
    setActiveFiltersCount(count);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    updateFilters({ category: newCategories });
  };

  const handleArrayToggle = (array: string[], item: string, key: keyof FilterState) => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
    updateFilters({ [key]: newArray } as Partial<FilterState>);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      category: [],
      priceRange: [0, 200],
      dateRange: {},
      location: "",
      distance: 50,
      timeOfDay: [],
      eventType: [],
      amenities: []
    };
    setFilters(clearedFilters);
    setActiveFiltersCount(0);
    onFiltersChange(clearedFilters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtri Avanzati
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Filtri Avanzati</SheetTitle>
            {activeFiltersCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Cancella tutti
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-8 py-6">
          {/* Categories */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Categorie</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filters.category.includes(category) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryToggle(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-primary" />
              <Label className="text-base font-semibold">Fascia di Prezzo</Label>
            </div>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                max={200}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>€{filters.priceRange[0]}</span>
                <span>€{filters.priceRange[1]}+</span>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              <Label className="text-base font-semibold">Periodo</Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.from ? (
                      format(filters.dateRange.from, "dd MMM", { locale: it })
                    ) : (
                      "Da"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.from}
                    onSelect={(date) => updateFilters({ 
                      dateRange: { ...filters.dateRange, from: date }
                    })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.to ? (
                      format(filters.dateRange.to, "dd MMM", { locale: it })
                    ) : (
                      "A"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.to}
                    onSelect={(date) => updateFilters({ 
                      dateRange: { ...filters.dateRange, to: date }
                    })}
                    disabled={(date) => date < new Date() || (filters.dateRange.from && date < filters.dateRange.from)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <Label className="text-base font-semibold">Posizione</Label>
            </div>
            <Input
              placeholder="Milano, Roma, Online..."
              value={filters.location}
              onChange={(e) => updateFilters({ location: e.target.value })}
            />
            
            <div className="space-y-2">
              <Label className="text-sm">Distanza massima: {filters.distance} km</Label>
              <Slider
                value={[filters.distance]}
                onValueChange={(value) => updateFilters({ distance: value[0] })}
                max={100}
                min={1}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          {/* Time of Day */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <Label className="text-base font-semibold">Orario</Label>
            </div>
            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <div key={slot.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={slot.id}
                    checked={filters.timeOfDay.includes(slot.id)}
                    onCheckedChange={() => handleArrayToggle(filters.timeOfDay, slot.id, "timeOfDay")}
                  />
                  <Label htmlFor={slot.id} className="text-sm font-normal">
                    {slot.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Event Type */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Tipo di Evento</Label>
            <div className="space-y-3">
              {eventTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={filters.eventType.includes(type.id)}
                    onCheckedChange={() => handleArrayToggle(filters.eventType, type.id, "eventType")}
                  />
                  <Label htmlFor={type.id} className="text-sm font-normal">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Servizi</Label>
            <div className="space-y-3">
              {amenitiesList.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={filters.amenities.includes(amenity.id)}
                    onCheckedChange={() => handleArrayToggle(filters.amenities, amenity.id, "amenities")}
                  />
                  <Label htmlFor={amenity.id} className="text-sm font-normal">
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="sticky bottom-0 bg-background border-t pt-4">
          <Button className="w-full" size="lg" variant="hero">
            Applica Filtri ({activeFiltersCount})
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdvancedFilters;