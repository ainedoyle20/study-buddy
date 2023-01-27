import { useState } from 'react';
import { BiSearch } from "react-icons/bi";

import Select from '../select/Select';

import "./SearchBox.scss";

const SearchBox = ({ isPublic, setSearchTerm, searchTerm, setSearchOption, searchOption }) => {

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
        >
          <BiSearch />
        </div>
        
      </div>

      <Select searchOption={searchOption} setSearchOption={setSearchOption} />
    </div>
  );
}

export default SearchBox;
