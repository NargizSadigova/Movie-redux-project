import React, { useState } from "react";
import "./Search.css";

const Search = ({ onSearch, showSearch = true }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  if (!showSearch) return null;

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
