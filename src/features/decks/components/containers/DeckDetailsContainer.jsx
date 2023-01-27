import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import { selectUserDetails } from "../../../authentication/services/userSlice";
import { useFetchDecksQuery } from '../../services/decksSlice';

import Card from "../card/Card";
import AddCardModal from "../add-card/AddCardModal";
import EditDeleteCardModal from "../edit-delete-card/EditDeleteCardModal";

import "./DeckDetailsContainer.scss";

const DeckDetailsContainer = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [selectCard, setSelectCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const {deckId} = useParams();
  const userDetails = useSelector(selectUserDetails);

  const [ skip, setSkip ] = useState(userDetails?.userId ? false : true);
  const { isUninitialized, data: decks, isLoading, isSuccess } = useFetchDecksQuery(userDetails?.userId, { skip });

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

  }, [skip])

  let content;
  if (isUninitialized || isLoading) {
    content = <div className='oval_spinner'> <Oval  height={40} width={40} color="#ffffff" wrapperStyle={{}} wrapperClass=""
      visible={true} ariaLabel='oval-loading' secondaryColor="#ffffff" strokeWidth={5} strokeWidthSecondary={4}
    /></div>;
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
      <div className="deck_details_container">
        <div className="deck_details_heading">
          <div className="deck_details_heading_deck">
            <span>{deck?.name}</span>
          </div>

          <div className="deck_details_heading_deck_details">
            
          </div>
        </div>

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
        />
      ) : null}
    </>
  );
}

export default DeckDetailsContainer;
