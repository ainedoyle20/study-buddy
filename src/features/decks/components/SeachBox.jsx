import { useState } from 'react';
import { BiSearch } from "react-icons/bi";

import Select from './Select';

import "./SearchBox.scss";

const SeachBox = ({ isPublic, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("All");

  return (
    <div className='search_box_container'>
      <div className='search_input_container'>
        <input 
          className='search_input'
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={isPublic ? "Search Decks..." : "Search Your Decks..."}
        />

        <div 
          className='search_icon_container'
          onClick={() => {
            handleSearch({ searchTerm, searchOption });
          }}
        >
          <BiSearch />
        </div>
        
      </div>

      <Select searchOption={searchOption} setSearchOption={setSearchOption} />
    </div>
  );
}

export default SeachBox;
