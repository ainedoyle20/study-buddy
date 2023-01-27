import { useState, useEffect } from 'react';
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";

import { useFetchDecksQuery } from '../../services/decksSlice';

import CreateDeckModal from "../create-deck/CreateDeckModal";
import DeleteDeckWarning from '../delete-deck/DeleteDeckWarning';
import CreateDeck from "../deck/CreateDeck";
import Deck from "../deck/Deck";
import SearchBox from "../search/SearchBox";
import Loader from '../loader/Loader';

import "./DecksContainers.scss";

const MyDecksContainer = ({ userId }) => {
  const [isPublic] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectDeck, setSelectDeck] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [showDeleteDeckWarning, setShowDeleteDeckWarning] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("All");

  const [ skip, setSkip ] = useState(userId ? false : true);
  const { isUninitialized, data: decks, isLoading, isSuccess } = useFetchDecksQuery(userId, { skip });

  // useEffect(() => {
    
  
  // }, [searchTerm])
  

  useEffect(() => {
    if (!skip) return;

    setTimeout(() => {
      setSkip(false);
    }, 1000);

  }, [skip])

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
              selectDeck={selectDeck}
              setSelectedDeck={setSelectedDeck} setShowDeleteDeckWarning={setShowDeleteDeckWarning}
            />
          );
        }
      }
    })
  } 

  return (
    <>
      <div className='decks_container'>
        <SearchBox 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          searchOption={searchOption} setSearchOption={setSearchOption}
          isPublic={isPublic} 
        />

        <div className="toggle_select_icons_container">
          {selectDeck ? (
            <span className="select_card_for_edit_text_container">
              Select a deck to delete.
            </span>
          ): null}

          <div className="select_icons">
            {selectDeck ? (
              <span className="select_icon" onClick={() => setSelectDeck(false)}>
                <MdOutlineClose />
              </span>
            ) : (
              <span className="select_icon" onClick={() => setSelectDeck(true)}>
                <RiDeleteBin2Line />
              </span>
            )}
          </div>
        </div>

        <div className='decks_grid'>
          <CreateDeck setShowCreateModal={setShowCreateModal} selectDeck={selectDeck} />
          {content}
        </div>
      </div>

      {showCreateModal ? (
        <CreateDeckModal setShowCreateModal={setShowCreateModal} />
      ) : null}

      {showDeleteDeckWarning ? (
        <DeleteDeckWarning 
          setSelectDeck={setSelectDeck} selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} 
          userId={userId} setSkip={setSkip} setShowDeleteDeckWarning={setShowDeleteDeckWarning}
        />
      ) : null}
    </>
  );
}

export default MyDecksContainer