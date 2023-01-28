import { useEffect, useState } from 'react';
import { ImCancelCircle } from "react-icons/im";
import { BsQuestionCircle } from "react-icons/bs";
import { SlBookOpen } from "react-icons/sl";

import { useAddCardMutation, useRemoveCardMutation } from "../../services/decksSlice";

import "./EditDeleteCardModal.scss";

const EditDeleteCardModal = ({ setShowEditCardModal, userId, setSkip, setSelectCard, setSelectedCard, deckId, selectedCard, isPublicDeck }) => {
  const [editedQuestion, setEditedQuestion] = useState(selectedCard?.question || "");
  const [editedAnswer, setEditedAnswer] = useState(selectedCard?.answer ||  "");
  const [showDeleteCardWarning, setShowDeleteCardWarning] = useState(false);

  const [editCard, { isLoading }] = useAddCardMutation();
  const [removeCard, { isLoading: deletingCard }] = useRemoveCardMutation();

  useEffect(() => {
    if (!selectedCard) {
      setShowEditCardModal(false);
    }
  }, []);

  useEffect(() => {
    setSelectCard(false);

    return () => {
      setSelectedCard(null);
    }
  }, []);

  const handleEditCard = async () => {
    const fieldEmpty = ![editedQuestion, editedAnswer].every(Boolean);

    if (fieldEmpty) {
      alert("Please fill out all fields");
      return;
    }

    if (!selectedCard) {
      alert("Something went wrong please try again later.");
      setShowEditCardModal(false);
      return;
    }

    setSkip(true);

    const { cardId, timestamp } = selectedCard;

    try {
      await editCard({ deckId, cardId, newCard: { question: editedQuestion, answer: editedAnswer, timestamp }, userId, isPublic: isPublicDeck });
      setShowEditCardModal(false);
    } catch (error) {
      console.log("Error editing card: ", error);
    }
  }

  const handleDeleteCard = async () => {
    setSkip(true);
    try {
      await removeCard({ deckId, cardId: selectedCard.cardId, userId, isPublic: isPublicDeck }).unwrap();
      setShowEditCardModal(false);
    } catch (error) {
      console.log("Error removing card from deck: ", error);
    }
  }

  return (
    <>
      <div className='edit_card_modal_background'>
        <div className="edit_card_modal_close_btn_container">
          <ImCancelCircle 
            className="edit_card_modal_close_btn"
            onClick={() => setShowEditCardModal(false)}
          />
        </div>
      </div>

      <div className="edit_card_form_container">
        <div className="edit_card_question_container">
          <span className="edit_card_question_icon">
            <BsQuestionCircle />
          </span>
          <textarea 
            className="edit_card_form_textarea"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
            placeholder="Question"
          />
        </div>

        <div className="edit_card_answer_container">
          <span className="edit_card_answer_icon">
            <SlBookOpen />
          </span>
          <textarea 
            className="edit_card_form_textarea"
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
            placeholder="Answer"
          />
        </div>

        <button disabled={isLoading} className="edit_card_form_btn" onClick={handleEditCard}>
          Edit
        </button>

        <button disabled={isLoading} className="edit_card_form_btn" onClick={() => setShowDeleteCardWarning(true)}>
          Delete
        </button>
      </div>

      {showDeleteCardWarning ? (
        <div className="delete_card_warning_container">
          <div className="delete_card_warning_text_container">
            <span className="delete_card_warning_text">
              Deleting cards is permanent. 
            </span>
            <span className="delete_card_warning_text">
              Are you sure you want to delete this card?
            </span>
          </div>

          {/* swap isLoading with isDeleting */}
          <button disabled={deletingCard} className="confirm_delete_card_btn" onClick={handleDeleteCard}>
            Confirm Delete
          </button>

          <button disabled={deletingCard} className="cancel_delete_card_btn" onClick={() => setShowDeleteCardWarning(false)}>
            Cancel
          </button>
        </div>
      ) 
      : null}
    </>
  )
}

export default EditDeleteCardModal;
