import React from "react";

const Search = ({ handleChange, onSearch, value }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="search"
        name="search"
        onChange={handleChange}
        value={value}
      />
      <button className="search-button" type="submit" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
