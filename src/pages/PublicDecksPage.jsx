import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/authentication/services/userSlice";
import { Oval } from "react-loader-spinner";

import { PublicDecksContainer } from "../features/decks/components"

import "./MyDecksPage.scss";

const PublicDecksPage = () => {
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
    <div className="my_decks_page_container">
      <PublicDecksContainer />
    </div>
  );
}

export default PublicDecksPage;
