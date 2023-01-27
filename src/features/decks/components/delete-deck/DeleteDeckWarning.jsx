import { useEffect } from 'react';
import { ImCancelCircle } from "react-icons/im";

import { useRemoveDeckMutation } from "../../services/decksSlice";

import "./DeleteDeckWarning.scss";

const DeleteDeckWarning = ({ 
  setShowDeleteDeckWarning, selectedDeck, setSelectedDeck, setSelectDeck, userId, setSkip
}) => {

  const [ removeDeck, { isLoading }] = useRemoveDeckMutation();

  useEffect(() => {
    setSelectDeck(false);
  
    return () => {
      setSelectedDeck(null);
    }
  }, []);

  const handleDeleteDeck = async () => {
    setSkip(true);
    try {
      await removeDeck({ deckId: selectedDeck.deckId, userId });
      setShowDeleteDeckWarning(false);
    } catch (error) {
      console.log("Error removing deck from firebase.", error);
    }
  }

  return (
    <>
      <div className='delete_deck_warning_background'>
        <div className="delete_deck_warning_close_btn_container">
          <ImCancelCircle 
            className="delete_deck_warning_close_btn"
            onClick={() => setShowDeleteDeckWarning(false)}
          />
        </div>
      </div>

      <div className="delete_deck_warning_container">
        <div className="delete_deck_warning_text_container">
          <span className="delete_deck_warning_text">
            Deleting a deck is permanent. 
          </span>
          <span className="delete_deck_warning_text">
            {`Delete "${selectedDeck?.name}" ?`}
          </span>
        </div>

        <button disabled={isLoading} className="confirm_delete_deck_btn" onClick={handleDeleteDeck}>
          Confirm Delete
        </button>

        <button disabled={isLoading} className="cancel_delete_deck_btn" onClick={() => setShowDeleteDeckWarning(false)}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default DeleteDeckWarning;
