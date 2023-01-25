import { BsPlusLg } from "react-icons/bs";

import "./CreateDeck.scss";

const CreateDeck = ({ setShowCreateModal }) => {
  return (
    <div className="create_deck_container" onClick={() => setShowCreateModal(true)}>
      <div className="create_deck_button_container">
        <BsPlusLg />
      </div>

      <div className="create_deck_text_container">
        <span>Create Deck</span>
      </div>
    </div>
  );
}

export default CreateDeck;
