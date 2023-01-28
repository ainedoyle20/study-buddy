import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdToggleOff, MdToggleOn, MdOutlineClose, MdCheck } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import { useUpdateDeckStatusMutation, useUpdateDeckSettingsMutation } from "../../services/decksSlice";

import Loader from "../loader/Loader";
import Select from "../select/Select";

import "./DeckSettings.scss";

const DeckSettings = ({ deck, userId, setSkip, inPublicDeck }) => {
  const { deckId } = useParams();
  const [showSelect, setShowSelect] = useState(false);
  const [showCreatorInput, setShowCreatorInput] = useState(false);
  const [creatorText, setCreatorText] = useState("");
  const [showDeckNameInput, setShowDeckNameInput] = useState(false);
  const [deckNameText, setDeckNameText] = useState("");
  const [categoryOption, setCategoryOption] = useState(deck ? `${deck.category}` : "All");
  const [activeSetting, setActiveSetting] = useState(null);

  const [ toggleDeckStatus, { isLoading }] = useUpdateDeckStatusMutation();
  const [ updateDeckSettings, { isLoading: updatingSettings }] = useUpdateDeckSettingsMutation();

  useEffect(() => {
    if (!activeSetting) return;

    setTimeout(() => {
      setActiveSetting(null);
    }, 1000);

  }, [activeSetting])
  

  const updateDeckSetting = async (field, value) => {
    if (isLoading || updatingSettings || !userId) return;

    setSkip(true);

    try {
      await updateDeckSettings({ deckId, field, value, userId, isPublic: deck.isPublic });
      setCreatorText("");
      setDeckNameText("");
      setShowDeckNameInput(false);
      setShowSelect(false);
      setShowCreatorInput(false);
    } catch (error) {
      console.log("Error updating deck setting: ", error);
    }
  }

  const updateDeckStatus = async () => {
    if (isLoading || updatingSettings || !userId) return;

    if (deck.name === deck.originalName) {
      alert(`This deck was saved from public decks. 
      If you want to make it public with your changes you must change the deck name.`);
      return;
    }

    const updatedDeck = { ...deck, isPublic: !deck.isPublic };

    setSkip(true);

    try {
      await toggleDeckStatus({ deckId, deck: updatedDeck, userId });
    } catch (error) {
      console.log("Error updating deck status.", error);
    }
  }

  return (
    <div className="deck_settings_container">
      {deck ? (
        <>
          <div className="deck_name_container">
            {activeSetting !== "DeckName" && !updatingSettings ? (
              <>
                {showDeckNameInput ? (
                  <input 
                    className="deck_name_input"
                    type="text"
                    value={deckNameText}
                    onChange={(e) => setDeckNameText(e.target.value)}
                    placeholder={`${deck?.name}`}
                  />
                ) : (
                  <span>{deck?.name}</span>
                )}

                {!inPublicDeck ? (
                  <div className="name_icons">
                    {showDeckNameInput ? (
                      <>
                        <span
                          className="icon"
                          onClick={() => {
                            if (!deckNameText.length) {
                              alert("This field cannot be empty.");
                              return;
                            } else {
                              updateDeckSetting("name", deckNameText);
                              setActiveSetting("DeckName");
                            }
                          }}
                        >
                          <MdCheck />
                        </span>
                        <span className="icon" 
                          onClick={() => setShowDeckNameInput(false)}
                        >
                          <MdOutlineClose />
                        </span>
                      </>
                    ) : (
                      <span className="icon"
                        onClick={() => {
                          if (!isLoading && !updatingSettings) {
                            setShowDeckNameInput(true);
                          }
                        }}
                      >
                        <AiFillEdit />
                      </span>
                    )}
                  </div>
                ) : null}

              </>              
            ) : (
              <Loader size={"small"} />
            )}
          </div>

          <div className="deck_settings">

            {/*   Creator Settings   */}
            <div className="deck_setting_container">
              <span className="deck_setting_label">Creator: </span>
              {activeSetting !== "Creator" && !updatingSettings ? (
                <>
                  <div className="deck_setting">
                    {showCreatorInput ? (
                      <input 
                        className="creator_input"
                        type="text"
                        value={creatorText}
                        onChange={(e) => setCreatorText(e.target.value)}
                        placeholder={`${deck?.creatorName}`}
                      />
                    ) : (
                      <>{deck?.creatorName}</>
                    )}
                  </div>
                  {!inPublicDeck ? (
                    <div className="icons">
                      {showCreatorInput 
                        ? (
                          <div className="confirm_cancel_container">
                            <span
                              className="confirm_icon"
                              onClick={() => {
                                if (!creatorText.length) {
                                  alert("This field cannot be empty.");
                                  return;
                                } else {
                                  updateDeckSetting("creatorName", creatorText);
                                  setActiveSetting("Creator");
                                }
                              }}
                            >
                              <MdCheck />
                            </span>
                            <span className="cancel_icon" 
                              onClick={() => setShowCreatorInput(false)}
                            >
                              <MdOutlineClose />
                            </span>
                          </div>
                        ) : (
                          <span className="edit_icon"
                            onClick={() => {
                              if (!isLoading && !updatingSettings) {
                                setShowCreatorInput(true);
                              }
                            }}
                          >
                            <AiFillEdit />
                          </span>
                        )}
                    </div>                    
                  ) : null}
                </>
              ) : (
                <Loader size={"small"} />
              )}
            </div>

            {/*   Category Settings   */}
            <div className="deck_setting_container">
              <span className="deck_setting_label">Category: </span>
              {activeSetting === "Category" ? (
                <Loader size={"small"}/>
              ) : (
                <>
                 <span className="deck_setting">
                  {showSelect 
                    ? (
                      <Select searchOption={categoryOption} setSearchOption={setCategoryOption} />
                    ) : (
                      <>{deck?.category}</>
                    )}
                </span>

                {!inPublicDeck ? (
                  <div className="icons">
                    {showSelect 
                      ? (
                        <div className="confirm_cancel_container">
                          <span
                            className="confirm_icon"
                            onClick={() => {
                              updateDeckSetting("category", categoryOption);
                              setActiveSetting("Category");
                            }}
                          ><MdCheck /></span>
                          <span className="cancel_icon" onClick={() => setShowSelect(false)}><MdOutlineClose /></span>
                        </div>
                      ) : (
                        <span className="edit_icon"
                        onClick={() => {
                          if (!isLoading && !updatingSettings) {
                            setShowSelect(true);
                          }
                        }}><AiFillEdit /></span>
                      )}
                  </div>
                ) : null}

                </>
              )}
            </div>

            {/*   Private Status Settings   */}
            <div className="deck_setting_container">
              <span className="deck_setting_label">Public: </span>

              <span className="deck_setting">
                {activeSetting !== "PublicStatus" && !isLoading ? (
                  <>{`${deck?.isPublic}`}</>
                ) : (
                  <Loader size={"small"} />
                )}
              </span>

              {!inPublicDeck ? (
                <span className="edit_setting_icon" onClick={()=> {
                  if (!isLoading && !updatingSettings) {
                    setActiveSetting("PublicStatus");
                    updateDeckStatus();
                  }
                }}>
                  {deck?.isPublic ? (
                    <MdToggleOn />
                  ) : (
                    <MdToggleOff />
                  )}
                </span>
              ) : null}
            </div>
            
            {!inPublicDeck 
            ? deck?.isImported 
              ? (
                <div className="deck_setting_container">
                  <span className="deck_imported_setting">Saved From Public Decks</span>
                </div>
              ) 
              : null
            : null
            }
            
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default DeckSettings;
