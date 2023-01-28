import { useState } from "react";
import { useParams } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { BsQuestionCircle } from "react-icons/bs";
import { SlBookOpen } from "react-icons/sl";
import { uuidv4 } from "@firebase/util";

import { useAddCardMutation } from "../../services/decksSlice";

import "./AddCardModal.scss";

const AddCardModal = ({ setShowAddCardModal, userId, setSkip, isPublicDeck }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { deckId } = useParams();

  const [ addNewCard, { isLoading }] = useAddCardMutation();

  const handleAddCard = async () => {
    if (isLoading) return;

    const fieldEmpty = ![question, answer].every(Boolean);

    if (fieldEmpty) {
      alert("Please fill out all fields.");
      return;
    }

    if (!userId) {
      alert("Something went wrong. Please try logging out and back in again.");
      return;
    }

    setSkip(true);

    try {
      await addNewCard({ 
        deckId, 
        cardId: uuidv4(), 
        newCard: { question, answer, timestamp: Date.now() }, 
        userId,
        isPublic: isPublicDeck
      }).unwrap();
    } catch (error) {
      console.log("Error adding card to deck.", error);
    }

    setQuestion("");
    setAnswer("");
    setShowAddCardModal(false);
  }

  return (
    <>
      <div className='add_card_modal_background'>
        <div className="add_card_modal_close_btn_container">
          <ImCancelCircle 
            className="add_card_modal_close_btn"
            onClick={() => setShowAddCardModal(false)}
          />
        </div>
      </div>

      <div className="add_card_form_container">
        <div className="add_card_question_container">
          <span className="add_card_question_icon">
            <BsQuestionCircle />
          </span>
          <textarea 
            className="add_card_form_textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
          />
        </div>

        <div className="add_card_answer_container">
          <span className="add_card_answer_icon">
            <SlBookOpen />
          </span>
          <textarea 
            className="add_card_form_textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
          />
        </div>

        <button disabled={isLoading} className="add_card_form_btn" onClick={handleAddCard}>
          Create
        </button>
      </div>
    </>
  );
}

export default AddCardModal;
