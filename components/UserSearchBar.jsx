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
    <div className="m-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search here..."
          aria-label="Search Bar"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </form>
    </div>
  );
};

export default UserSearchBar;
