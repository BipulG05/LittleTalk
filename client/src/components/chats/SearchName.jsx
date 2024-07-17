import React, { useEffect, useState } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs"; // Assuming you are using React Icons for the search icon
import "./css/searchName.css"; // Import your CSS file for styling
import SearchResult from "./SearchResult";

const SearchName = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleChange = (event) => {
     setInputValue(event.target.value);
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }, [inputValue]);

  return (
    <>
      <div className="search-container">
        <div className="input-container">
          <input
            type="text"
            id="search-id"
            className="search-input"
            maxLength={150}
            placeholder="Search..."
            value={inputValue}
            onChange={handleChange}
          />
        </div>
        <div className="search-icon-div">
          <BsFillSearchHeartFill className="search-icon" size={20} />
        </div>
      </div>
      { isSearch && <SearchResult Name={inputValue} setInputValue={setInputValue} />}
    </>
  );
};

export default SearchName;
