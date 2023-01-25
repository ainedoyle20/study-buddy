import { useState } from 'react';

import Deck from './Deck';
import SeachBox from './SeachBox';

import "./Decks.scss";

const deckData = [
  {id: 1, name: "Countries", category: "Geography", creator: "Billy", isPublic: false, isImported: false },
  {id: 2, name: "Presidents", category: "History", creator: "Bob", isPublic: true, isImported: false },
  {id: 3, name: "German", category: "Languages", creator: "John", isPublic: false, isImported: true },
  {id: 4, name: "French", category: "Languages", creator: "Tom", isPublic: false, isImported: false },
  {id: 5, name: "Revolutions", category: "History", creator: "Bob", isPublic: true, isImported: false },
  {id: 6, name: "The Cell", category: "Biology", creator: "Sam", isPublic: false, isImported: true },
  {id: 7, name: "Volcanoes", category: "Geography", creator: "Billy", isPublic: false, isImported: false },
  {id: 8, name: "Countries", category: "Geography", creator: "Billy", isPublic: false, isImported: false },
  {id: 9, name: "Presidents", category: "History", creator: "Bob", isPublic: true, isImported: false },
  {id: 10, name: "German", category: "Languages", creator: "John", isPublic: false, isImported: true },
  {id: 11, name: "French", category: "Languages", creator: "Tom", isPublic: false, isImported: false },
  {id: 12, name: "Revolutions", category: "History", creator: "Bob", isPublic: true, isImported: false },
  {id: 13, name: "The Cell", category: "Biology", creator: "Sam", isPublic: false, isImported: true },
  {id: 14, name: "Volcanoes", category: "Geography", creator: "Billy", isPublic: false, isImported: false },
]

const PublicDecksContainer = () => {
  const [isPublic] = useState(true);

  const handleSearch = ({ searchTerm, searchOption }) => {
    console.log({ searchTerm, searchOption });
  }

  return (
    <div className='decks_container'>
      <SeachBox handleSearch={handleSearch} isPublic={isPublic} />

      <div className='decks_grid'>
        {deckData.map(deck => (
          <Deck key={deck.id} isPublic={isPublic} deck={deck} />
        ))}
      </div>
    </div>
  );
}

export default PublicDecksContainer