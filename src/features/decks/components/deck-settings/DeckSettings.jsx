import { useParams } from "react-router-dom";
import { MdOutlineClose, MdToggleOff, MdToggleOn } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import Loader from "../loader/Loader";

import "./DeckSettings.scss";

const DeckSettings = ({ deck }) => {
  const { deckId } = useParams();
  console.log("deckId: ", deckId);

  const updateDeckSettings = () => {

  }

  return (
    <div className="deck_settings_container">
      {deck ? (
        <>
          <div className="deck_name_container">
            <span>{deck?.name}</span>
          </div>

          <div className="deck_settings">
            <div className="deck_setting_container">
              <span className="deck_setting_label">Creator: </span>
              <span className="deck_setting">{deck?.creatorName}</span>
              <span className="edit_setting_icon"><AiFillEdit /></span>
            </div>

            <div className="deck_setting_container">
              <span className="deck_setting_label">Category: </span>
              <span className="deck_setting">{deck?.category}</span>
              <span className="edit_setting_icon"><AiFillEdit /></span>
            </div>

            <div className="deck_setting_container">
              <span className="deck_setting_label">Status: </span>
              <span className="deck_setting">{`${deck?.isPublic}`}</span>
              <span className="edit_setting_icon">
                {deck?.isPublic ? (
                  <MdToggleOff />
                ) : (
                  <MdToggleOn />
                )}
              </span>
            </div>
            
            {deck?.isImported ? (
              <div className="deck_setting_container">
                <span className="deck_imported_setting">Saved From Public Decks</span>
              </div>
            ) : null}
            
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default DeckSettings;
