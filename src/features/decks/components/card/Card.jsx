import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import "./Card.scss";

const DeckQA = ({ card, selectCard, setShowEditCardModal, setSelectedCard }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelectCard = () => {
    if (!selectCard) return;

    setSelectedCard(card);
    setShowEditCardModal(true);
  }

  return (
      <div 
        className={`deck_q_a_container ${showAnswer ? "showAnswer" : ""} ${selectCard ? "selectCard" : ""}`}
        onClick={handleSelectCard}
      >
        <div className="deck_question_button_container">
          <span className="deck_q_a_question">{card.question}</span>

          <div className="deck_q_a_buttons_container" onClick={() => setShowAnswer(prev => !prev)}>
            {showAnswer ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>


        <div className="deck_q_a_answer_container">
          <span className="deck_q_a_answer">{card.answer}</span>
        </div>
        
      </div>
  );
}

export default DeckQA;
