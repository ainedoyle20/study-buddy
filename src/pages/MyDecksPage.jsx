import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/authentication/services/userSlice";
import { Oval } from "react-loader-spinner";

import { MyDecksContainer } from "../features/decks/components"

import "./MyDecksPage.scss";

const MyDecksPage = () => {
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);

  useEffect(() => {
    if (!userDetails || !Object.keys(userDetails).length) {
      navigate("/auth");
    }
  }, [userDetails]);

  return (
    <div className="my_decks_page_container">
      {(!userDetails || !Object.keys(userDetails).length) ? (
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
      ) : (
        <MyDecksContainer userId={userDetails?.userId} />
      )}
    </div>
  );
}

export default MyDecksPage
