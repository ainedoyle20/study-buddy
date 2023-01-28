import { useState, useEffect } from 'react';

import "./SavedDeckBanner.scss";

const SavedDeckBanner = ({ setShowSavedBanner }) => {
  const [hideSavedBanner, setHideSavedBanner] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSavedBanner(false);
    }, [3000])
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setHideSavedBanner(true);
    }, [1000])
  }, [])

  return (
    <div className={`saved_deck_banner_container ${hideSavedBanner ? "hide_saved_banner" : ""}`}>
      <div className='saved_deck_banner'>
        <span>
          Saved Deck!
        </span>
      </div>
    </div>
  );
}

export default SavedDeckBanner;
