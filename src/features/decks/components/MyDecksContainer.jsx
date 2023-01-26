import { useState } from 'react';
import { Oval } from 'react-loader-spinner';

import { useFetchDecksQuery } from '../services/decksSlice';

import CreateDeck from './CreateDeck';
import Deck from './Deck';
import SeachBox from './SeachBox';
import CreateModal from './CreateModal';

import "./Decks.scss";

// const deckData = [
//   {id: 1, name: "Countries", category: "Geography", creator: "Billy", isPublic: false, isImported: false },
//   {id: 2, name: "Presidents", category: "History", creator: "Bob", isPublic: true, isImported: false },
//   {id: 3, name: "German", category: "Languages", creator: "John", isPublic: false, isImported: true },
//   {id: 4, name: "French", category: "Languages", creator: "Tom", isPublic: false, isImported: false },
//   {id: 5, name: "Revolutions", category: "History", creator: "Bob", isPublic: true, isImported: false },
//   {id: 6, name: "The Cell", category: "Biology", creator: "Sam", isPublic: false, isImported: true },
//   {id: 7, name: "Volcanoes", category: "Geography", creator: "Billy", isPublic: false, isImported: false },
//   {id: 8, name: "Countries", category: "Geography", creator: "Billy", isPublic: false, isImported: false },
//   {id: 9, name: "Presidents", category: "History", creator: "Bob", isPublic: true, isImported: false },
//   {id: 10, name: "German", category: "Languages", creator: "John", isPublic: false, isImported: true },
//   {id: 11, name: "French", category: "Languages", creator: "Tom", isPublic: false, isImported: false },
//   {id: 12, name: "Revolutions", category: "History", creator: "Bob", isPublic: true, isImported: false },
//   {id: 13, name: "The Cell", category: "Biology", creator: "Sam", isPublic: false, isImported: true },
//   {id: 14, name: "Volcanoes", category: "Geography", creator: "Billy", isPublic: false, isImported: false },
// ]

const MyDecksContainer = ({ userId }) => {
  const [ skip ] = useState(userId ? false : true);
  const { isUninitialized, data: decks, isLoading, isSuccess } = useFetchDecksQuery(userId, { skip });

  const [isPublic] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSearch = ({ searchTerm, searchOption }) => {
    console.log({ searchTerm, searchOption });
  }

  let content;
  if (isLoading || isUninitialized) {
    content = <div className='oval_spinner'> <Oval  height={80} width={80} color="#ffffff" wrapperStyle={{}} wrapperClass=""
      visible={true} ariaLabel='oval-loading' secondaryColor="#ffffff" strokeWidth={5} strokeWidthSecondary={4}
    /></div>;
  } else if (isSuccess) {
    content = Object.keys(decks).map(deckId => <Deck key={deckId} isPublic={isPublic} deckId={deckId} deck={decks[deckId]} />)
  } 

  return (
    <>
      <div className='decks_container'>
        <SeachBox handleSearch={handleSearch} isPublic={isPublic} />

        <div className='decks_grid'>
          <CreateDeck setShowCreateModal={setShowCreateModal} />
          {content}
        </div>
      </div>

      {showCreateModal ? (
        <CreateModal setShowCreateModal={setShowCreateModal} />
      ) : null}
    </>
  );
}

export default MyDecksContainer