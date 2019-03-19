import React from "react";

const Search = ({ handleChange, onSearch, search }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="search"
        name="search"
        onChange={handleChange}
        value={search}
      />
      <button className="search-button" type="submit" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
