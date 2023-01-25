import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import "./DeckQA.scss";

const DeckQA = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className={`deck_q_a_container ${showAnswer ? "showAnswer" : ""}`}>
      <div className="deck_question_button_container">
        <span className="deck_q_a_question">{question}</span>

        <div className="deck_q_a_buttons_container" onClick={() => setShowAnswer(prev => !prev)}>
          {showAnswer ? <BsChevronUp /> : <BsChevronDown />}
        </div>
      </div>

      <div className="deck_q_a_answer_container">
        <span className="deck_q_a_answer">{answer}</span>
      </div>
    </div>
  );
}

export default DeckQA;
