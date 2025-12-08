import { useState } from "react";
import { FilterChips } from "../FilterChips";

export default function FilterChipsExample() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["Fiction"]);

  return (
    <div className="p-6">
      <FilterChips
        label="Genre:"
        options={["Fiction", "Non-Fiction", "Science", "History", "Biography", "Mystery"]}
        selected={selectedGenres}
        onChange={setSelectedGenres}
      />
    </div>
  );
}
