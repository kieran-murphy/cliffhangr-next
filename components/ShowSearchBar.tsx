import React, { useState, ChangeEvent, FormEvent } from "react";

type ShowSearchBarProps = {
  setSearchTerm: (term: string) => void;
}

const ShowSearchBar = ({ setSearchTerm }: ShowSearchBarProps): React.JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSearchTerm(inputValue);
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

export default ShowSearchBar;
