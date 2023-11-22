import React, { useState } from "react";

const UserSearchBar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    setSearchTerm(inputValue);
    event.preventDefault();
  };

  return (
    <div className="border border-cyan-400 m-4 w-1/3 bg-blue-400 text-black">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search here..."
          aria-label="Search Bar"
          className="w-full p-2 text-black"
        />
        <button type="submit" className="p-2 bg-cyan-500 text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default UserSearchBar;
