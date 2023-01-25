import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineTopic, MdTitle } from "react-icons/md";

import Select from "./Select";

import "./CreateModal.scss";

const CreateModal = ({ setShowCreateModal }) => {
  const [categoryOption, setCategoryOption] = useState("Choose Category");
  const [deckName, setDeckName] = useState("");

  const handleCreate = () => {
    if (categoryOption === "Choose Category" && !deckName.length) {
      alert("Please fill out the create deck form.");
      return;
    }

    if (categoryOption === "Choose Category") {
      alert("Please Choose a Category.");
      return;
    }

    if (!deckName.length) {
      alert("You must create a deck name.");
      return;
    }
  }

  return (
    <>
      <div className='create_modal_container'>
        <div className="create_modal_close_button_container">
          <ImCancelCircle 
            className="create_modal_close_button"
            onClick={() => setShowCreateModal(false)}
          />
        </div>
      </div>

      <div className="create_modal_form_container">
        <div className="create_modal_deck_name_container">
          {/* <span className="create_modal_form_labels">Deck Name:</span> */}
          <span className="create_modal_name_icon">
            <MdTitle />
          </span>
          <input 
            className="create_modal_form_input"
            type="text"
            name="deckName"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="Deck Name"
          />
        </div>

        <div className="create_modal_deck_category_container">
          {/* <span className="create_modal_form_labels">Category</span> */}
          <span className="create_modal_category_icon">
            <MdOutlineTopic />
          </span>
          <Select searchOption={categoryOption} setSearchOption={setCategoryOption} />
        </div>

        <button className="create_modal_form_button" onClick={handleCreate}>
          Create
        </button>
      </div>
    </>
    
  );
}

export default CreateModal;
