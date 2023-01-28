import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import { selectUserDetails } from "../../../authentication/services/userSlice";
import { useFetchDecksQuery, useFetchPublicDecksQuery } from '../../services/decksSlice';

import SavedDeckBanner from "../saved-deck-banner/SavedDeckBanner";
import SaveDeck from "../save-deck/SaveDeck";
import DeckSettings from "../deck-settings/DeckSettings";
import Card from "../card/Card";
import AddCardModal from "../add-card/AddCardModal";
import EditDeleteCardModal from "../edit-delete-card/EditDeleteCardModal";
import Loader from "../loader/Loader";

import "./DeckDetailsContainer.scss";

const DeckDetailsContainer = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [selectCard, setSelectCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showSavedBanner, setShowSavedBanner] = useState(false);

  const {deckId} = useParams();
  const { pathname } = useLocation();
  const userDetails = useSelector(selectUserDetails);

  const [ skip, setSkip ] = useState(userDetails?.userId ? false : true);
  const { isUninitialized, data: decks, isLoading, isSuccess } = 
    pathname.split("/")[1] === "public-decks" 
      ? useFetchPublicDecksQuery() 
      : useFetchDecksQuery(userDetails?.userId, { skip });

  useEffect(() => {
    if (!isSuccess) return;

    setDeck(decks[deckId]);
    
  }, [isSuccess])

  useEffect(() => {
    if (!deck) return;

    const transformedCards = [];
    Object.keys(deck.cards).forEach(cardId => transformedCards.push({ cardId, ...deck.cards[cardId] }));

    setCards(transformedCards.sort((a, b) => b.timestamp - a.timestamp));

  }, [deck]);

  useEffect(() => {
    if (!skip) return;

    setTimeout(() => {
      setSkip(false);
    }, 1000);

  }, [skip]);

  // useEffect(() => {
  //   if (!showSavedBanner) return;

  //   setTimeout(() => {
  //     setShowSavedBanner(false);
  //   }, 5000);

  // }, [showSavedBanner]);

  let content;
  if (isUninitialized || isLoading) {
    content = <Loader />;
  } else {
    content = cards.length 
    ? cards.map(card => (
        <Card 
          key={card.cardId} 
          card={card} 
          setShowEditCardModal={setShowEditCardModal}
          selectCard={selectCard} 
          setSelectedCard={setSelectedCard} 
        />
      )) 
    :<span>No Cards in this Deck</span>
  }

  return (
    <>
      {showSavedBanner ? (
        <SavedDeckBanner setShowSavedBanner={setShowSavedBanner} />
      ) : null}

      <div className="deck_details_container">
        <SaveDeck 
          userId={userDetails?.userId} 
          inPublicDeck={pathname.split("/")[1] === "public-decks" ? true : false} 
          deck={deck}
          setShowSavedBanner={setShowSavedBanner}
        />

        <DeckSettings deck={deck} userId={userDetails?.userId} setSkip={setSkip} 
          inPublicDeck={pathname.split("/")[1] === "public-decks" ? true : false}
        />

        {pathname.split("/")[1] !== "public-decks" ? (
          <div className="toggle_modals_icons_container">
            {selectCard ? (
            <div className="select_card_for_edit_text_container">
              <span className="select_card_for_edit_text">Select a card to edit.</span>
            </div>)
            : null}

            <div className="toggle_edit_modal_icons">
              {selectCard ? (
                <span className="hide_edit_modal_icon" onClick={() => setSelectCard(false)}>
                  <MdOutlineClose />
                </span>
              ) : (
                <span className="show_edit_modal_icon" onClick={() => setSelectCard(true)}>
                  <AiFillEdit />
                </span>
              )}
            </div>

            <span onClick={() => setShowAddCardModal(true)} className="add_card_icon">
              <AiOutlinePlus />
            </span>
          </div>
        ) : null}

        <div className="deck_details_questions_list">
          {content}
        </div>
      </div>

      {showAddCardModal ? (
        <AddCardModal 
          setShowAddCardModal={setShowAddCardModal} 
          userId={userDetails?.userId} 
          setSkip={setSkip} 
          skip={skip}
          isPublicDeck={deck.isPublic}
        />
      ) : null}

      {showEditCardModal ? (
        <EditDeleteCardModal 
          setShowEditCardModal={setShowEditCardModal}
          userId={userDetails?.userId}
          setSkip={setSkip}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          deckId={deckId}
          setSelectCard={setSelectCard}
          isPublicDeck={deck.isPublic}
        />
      ) : null}
    </>
  );
}

export default DeckDetailsContainer;
