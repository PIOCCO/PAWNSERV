import React, { useState } from "react";
import "./Searchbar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:9090/search?query=${query}`);
      const data = await response.json();
      setResults(data); // Store search results
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="header-search">
          <span className="visually-hidden">Search for users</span>
        </label>
        <input
          type="text"
          id="header-search"
          placeholder="Search for users"
          name="s"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
    
      </form>

      <div>
        {results.length > 0 && (
          <ul>
            {results.map((user) => (
              <li key={user._id}>
                {user.username} - {user.storeName || "Buyer"} {/* Display either seller store name or buyer */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
