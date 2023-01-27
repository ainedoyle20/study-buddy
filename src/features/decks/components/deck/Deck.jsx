import { useNavigate } from "react-router-dom";

const Deck = ({ isPublic, deck, deckId, selectDeck, setSelectedDeck, setShowDeleteDeckWarning }) => {
  const navigate = useNavigate();

  return (
    <div className={`deck ${selectDeck ? "selectDeck" : ""}`} 
      onClick={() => {
        if (selectDeck) {
          setSelectedDeck({ deckId, name: deck.name });
          setShowDeleteDeckWarning(true);
        } else {
          navigate(`${deckId}`);
        }
      }}
    >
      <span className='deck_name'>
        {deck?.name}
      </span>

      <span className='deck_category'>
        Category: {deck?.category}
      </span>

      {isPublic ? (
        <span className='deck_creator'>
          Created By: {deck?.creator}
        </span>
      ) : null}

      {deck?.isImported && !isPublic ? (
        <span className='deck_creator'>
          Original Creator: {deck?.creator}
        </span>
      ) : null}
    </div>
  );
}

export default Deck;
