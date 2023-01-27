import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import "./Select.scss";

const Select = ({ searchOption, setSearchOption }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [options] = useState([ 
    "All", 
    "Geography", 
    "History", 
    "Biology", 
    "Physics", 
    "Chemistry", 
    "Maths", 
    "Art", 
    "Politics", 
    "Languages", 
    "Economics", 
    "Accounting"
  ]);

  return (
    <div className="custom_select_container">
      <span>{searchOption}</span>

      <div className="custom_select_button_container" onClick={() => setShowOptions(prev => !prev)}>
        {showOptions ? <BsChevronUp /> : <BsChevronDown />}
      </div>

      {showOptions ? (
        <div className="custom_select_options_container">
          {options.map((option, idx) => (
            <span 
              className={`custom_select_option ${searchOption === option ? "active_custom_select_option" : ""}`}
              key={idx} 
              onClick={() => {
                setSearchOption(option);
                setShowOptions(false);
              }}
            >
              {option}
            </span>
          ))}
        </div>
      ) : null
      }
      
    </div>
  );
}

export default Select;
