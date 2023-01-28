import { uuidv4 } from "@firebase/util";

import { useSaveDeckMutation } from "../../services/decksSlice";

import Loader from "../loader/Loader";

import "./SaveDeck.scss";

const SaveDeck = ({ userId, inPublicDeck, deck, setShowSavedBanner }) => {
  const [saveDeck, {isLoading}] = useSaveDeckMutation();

  const handleSaveDeck = async () => {
    if (isLoading) return;
    if (!userId || !deck) return;

    if (deck?.creatorId === userId) {
      alert("You are the creator of this deck. This deck will already be in your personal decks.");
      return;
    }

    try {
      await saveDeck({ deckId: uuidv4(), deck, userId }).unwrap();
      setShowSavedBanner(true);
    } catch (error) {
      console.log("Error saving deck: ", error);
    }
  }

  if (!inPublicDeck) {
    return null;
  }

  return (
    <div className="save_deck_container">
      <span className="save_deck_text" onClick={handleSaveDeck}>
        {isLoading ? (
          <Loader size={"small"} />
        ) : (
          "Save Deck"
        )}
      </span>
    </div>
  );
}

export default SaveDeck;
