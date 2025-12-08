import { useState } from "react";
import { SearchInput } from "../SearchInput";

export default function SearchInputExample() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 max-w-md">
      <SearchInput value={search} onChange={setSearch} />
      {search && <p className="mt-2 text-sm text-muted-foreground">Searching for: {search}</p>}
    </div>
  );
}
