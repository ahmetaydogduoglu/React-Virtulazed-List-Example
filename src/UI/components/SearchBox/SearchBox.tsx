import React, { useState } from "react";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
//local files
import "./SearchBox.css";
//listener
type typeSearchBoxListener = {
  sendMessage: Function;
  getMessage: Function;
};

export default function SearchBox({
  searchBoxListener,
}: {
  searchBoxListener: typeSearchBoxListener;
}) {
  const [searchText, setSearchText] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchBoxListener.sendMessage(e.target.value);
    setSearchText(e.target.value);
  };
  const clearSearchBox = () => {
    searchBoxListener.sendMessage("");
    setSearchText("");
  };
  return (
    <div className="search-box-container">
      <FaSearch color="#E5E5E5" />
      <input
        value={searchText}
        onChange={onChange}
        placeholder="Takım Ara.."
        className="search-box-input"
      />
      {searchText.length !== 0 && (
        <button onClick={clearSearchBox} className="clear-searchbox-button">
          <FaTimesCircle size={17} color="#818181" />
        </button>
      )}
    </div>
  );
}
