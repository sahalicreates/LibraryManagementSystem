import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterChipsProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
}

export function FilterChips({ options, selected, onChange, label }: FilterChipsProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && <span className="text-sm text-muted-foreground mr-1">{label}</span>}
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <Badge
            key={option}
            variant={isSelected ? "default" : "outline"}
            className="cursor-pointer toggle-elevate"
            onClick={() => toggleOption(option)}
            data-testid={`chip-filter-${option.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {option}
            {isSelected && <X className="ml-1 h-3 w-3" />}
          </Badge>
        );
      })}
    </div>
  );
}
