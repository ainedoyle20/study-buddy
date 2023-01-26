import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/authentication/services/userSlice";
import { Oval } from "react-loader-spinner";

// import { useFetchDecksQuery } from "../features/decks/services/decksSlice";

import { MyDecksContainer } from "../features/decks/components"

import "./MyDecksPage.scss";

const MyDecksPage = () => {
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);

  // const [skip ] = useState(userDetails?.userId ? false : true);
  // const { isUninitialized, data: decks, isLoading, isSuccess } = useFetchDecksQuery(userDetails?.userId, { skip });

  useEffect(() => {
    if (!userDetails || !Object.keys(userDetails).length) {
      navigate("/auth");
    }

    console.log("userDetails: ", userDetails);
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
