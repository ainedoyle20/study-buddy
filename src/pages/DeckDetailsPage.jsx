import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/authentication/services/userSlice";
import { Oval } from "react-loader-spinner";

import { DeckDetailsContainer } from "../features/decks/components"

import "./DeckDetailsPage.scss";

const DeckDetailsPage = () => {
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);

  useEffect(() => {
    if (!userDetails || !Object.keys(userDetails).length) {
      navigate("/auth");
    }
  }, [userDetails]);

  if (!userDetails || !Object.keys(userDetails).length) {
    return (
      <Oval
        height={80}
        width={80}
        color="#ffffff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#ffffff"
        strokeWidth={5}
        strokeWidthSecondary={4}
      />
    );
  }
  
  return (
    <div className="deck_details_page">
      <DeckDetailsContainer />
    </div>
  );
}

export default DeckDetailsPage
