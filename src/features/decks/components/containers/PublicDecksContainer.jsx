import { useState } from 'react';

import { useFetchPublicDecksQuery } from '../../services/decksSlice';

import Deck from "../deck/Deck";
import SearchBox from "../search/SearchBox";
import Loader from '../loader/Loader';

import "./DecksContainers.scss";

const PublicDecksContainer = ({ userId }) => {
  const [skip] = useState(userId ? false : true);
  const [isPublic] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("All");

  const { data: decks, isLoading, isUninitialized, isSuccess } = useFetchPublicDecksQuery({skip});

  let content;
  if (isLoading || isUninitialized) {
    content = <Loader />;
  } else if (isSuccess) {
    content = Object.keys(decks).map(deckId => {
      if (decks[deckId].category === searchOption || searchOption === "All") {
        if (decks[deckId]?.name?.toLowerCase().split(" ").join("").includes(searchTerm.toLowerCase().split(" ").join(""))) {
          return (
            <Deck 
              key={deckId} isPublic={isPublic} deckId={deckId} deck={decks[deckId]} 
            />
          );
        }
      }
    })
  } 

  return (
    <div className='decks_container'>
      <SearchBox 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        searchOption={searchOption} setSearchOption={setSearchOption}
        isPublic={isPublic} 
      />

      <div className='decks_grid'>
        {decks && !Object.keys(decks).length ? (
          <span>No Public Decks</span>
        ) : (
          <>{content}</>
        )}
      </div>
    </div>
  );
}

export default PublicDecksContainer