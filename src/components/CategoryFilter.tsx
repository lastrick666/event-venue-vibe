import { Button } from "@/components/ui/button";
import { Music, Briefcase, Dumbbell, Camera, Palette, Utensils, Coffee, BookOpen } from "lucide-react";

const categories = [
  { id: "all", name: "Tutti", icon: null },
  { id: "music", name: "Musica", icon: Music },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "sports", name: "Sport", icon: Dumbbell },
  { id: "photo", name: "Fotografia", icon: Camera },
  { id: "art", name: "Arte", icon: Palette },
  { id: "food", name: "Food & Drink", icon: Utensils },
  { id: "social", name: "Social", icon: Coffee },
  { id: "education", name: "Educazione", icon: BookOpen },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 p-1">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "gradient" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-2 min-w-0 transition-all duration-200"
          >
            {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
            <span className="whitespace-nowrap">{category.name}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;