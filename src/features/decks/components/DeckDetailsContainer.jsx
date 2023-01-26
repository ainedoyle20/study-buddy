import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import { selectUserDetails } from "../../authentication/services/userSlice";
import { useFetchDecksQuery, useAddCardMutation } from '../services/decksSlice';

import DeckQA from "./DeckQA";

import "./DeckDetailsContainer.scss";

// const deckData = [
//   {id: 1, name: "Countries", category: "Geography", creator: "Billy", isPublic: false, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", 
//       answer: 
//       "Answer 1"
//       },
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//       {id: "8-card", question: "Question 8", answer: "Answer 8"},
//       {id: "9-card", question: "Question 9", answer: "Answer 9"},
//       {id: "10-card", question: "Question 10", answer: "Answer 10"},
//     ]
//   },
//   {id: 2, name: "Presidents", category: "History", creator: "Bob", isPublic: true, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 3, name: "German", category: "Languages", creator: "John", isPublic: false, isImported: true,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 4, name: "French", category: "Languages", creator: "Tom", isPublic: false, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 5, name: "Revolutions", category: "History", creator: "Bob", isPublic: true, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 6, name: "The Cell", category: "Biology", creator: "Sam", isPublic: false, isImported: true,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 7, name: "Volcanoes", category: "Geography", creator: "Billy", isPublic: false, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 8, name: "Countries", category: "Geography", creator: "Billy", isPublic: false, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 9, name: "Presidents", category: "History", creator: "Bob", isPublic: true, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 10, name: "German", category: "Languages", creator: "John", isPublic: false, isImported: true,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 11, name: "French", category: "Languages", creator: "Tom", isPublic: false, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 12, name: "Revolutions", category: "History", creator: "Bob", isPublic: true, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 13, name: "The Cell", category: "Biology", creator: "Sam", isPublic: false, isImported: true,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
//   {id: 14, name: "Volcanoes", category: "Geography", creator: "Billy", isPublic: false, isImported: false,
//     questionCards: [
//       {id: "1-card", question: "Question 1", answer: "Answer 1"},
//       {id: "2-card", question: "Question 2", answer: "Answer 2"},
//       {id: "3-card", question: "Question 3", answer: "Answer 3"},
//       {id: "4-card", question: "Question 4", answer: "Answer 4"},
//       {id: "5-card", question: "Question 5", answer: "Answer 5"},
//       {id: "6-card", question: "Question 6", answer: "Answer 6"},
//       {id: "7-card", question: "Question 7", answer: "Answer 7"},
//     ]
//   },
// ]

const DeckDetailsContainer = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  const {deckId} = useParams();
  const userDetails = useSelector(selectUserDetails);

  const [ skip, setSkip ] = useState(userDetails?.userId ? false : true);
  const { isUninitialized, data: decks, isLoading, isSuccess } = useFetchDecksQuery(userDetails?.userId, { skip });

  const [ addNewCard, { isLoading: addingCard, isError, error }] = useAddCardMutation();

  useEffect(() => {
    if (!isSuccess) return;

    setDeck(decks[deckId]);
    
  }, [isSuccess])

  useEffect(() => {
    if (!deck) return;

    const transformedCards = [];
    Object.keys(deck.cards).forEach(cardId => transformedCards.push({ cardId, ...deck.cards[cardId] }));

    setCards(transformedCards);

  }, [deck]);

  const handleAddCard = async () => {
    if (addingCard) return;

    setSkip(true);

    const cardId = "card-3-id";
    const newCard = { question: "Question 3 (Updated)", answer: "Answer 3 (Updated)"};

    try {
      await addNewCard({ deckId, cardId, newCard, userId: userDetails?.userId }).unwrap();
    } catch (error) {
      console.error("Error adding new card: ", error);
    }

    setSkip(false);
  }

  let content;
  if (addingCard || isUninitialized || isLoading) {
    content = <div className='oval_spinner'> <Oval  height={80} width={80} color="#ffffff" wrapperStyle={{}} wrapperClass=""
      visible={true} ariaLabel='oval-loading' secondaryColor="#ffffff" strokeWidth={5} strokeWidthSecondary={4}
    /></div>;
  } else if (isError) {
    content = <p>{`${error}`}</p>
  }else {
    content = cards.length ? cards.map(card => <DeckQA key={card.cardId} question={card.question} answer={card.answer} />) 
    :<span>No Cards in this Deck</span>
  }

  return (
    <div className="deck_details_container">
      <div className="deck_details_heading">
        <div className="deck_details_heading_deck">
          <span>{deck?.name}</span>
        </div>

        <div className="deck_details_heading_deck_details">
          
        </div>
      </div>

      <div>
        <span onClick={handleAddCard}>Add Card</span>
      </div>

      <div className="deck_details_questions_list">
        {content}
        {/* {cards.length ? cards.map(card => (
          <DeckQA key={card.id} question={card.question} answer={card.answer} />
        )) :
          <span>No Cards in this Deck</span>
        } */}
      </div>
    </div>
  )
}

export default DeckDetailsContainer;
