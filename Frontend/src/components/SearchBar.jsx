import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    search: "",
    cuisine: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        name="search"
        placeholder="Search recipes..."
        value={filters.search}
        onChange={handleChange}
      />

      <select name="cuisine" value={filters.cuisine} onChange={handleChange}>
        <option value="">All Cuisines</option>
        <option value="indian">Indian</option>
        <option value="italian">Italian</option>
        <option value="chinese">Chinese</option>
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;