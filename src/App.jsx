import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import { LandingPage, AuthPage, MyDecksPage, PublicDecksPage, DeckDetailsPage} from "./pages"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<LandingPage />} />

        <Route path="auth" element={<AuthPage />} />

        <Route path="my-decks">
          <Route index element={<MyDecksPage />} />
          <Route path=":deckId" element={<DeckDetailsPage />} />
        </Route>

        <Route path="public-decks">
          <Route index element={<PublicDecksPage />} />
          <Route path=":deckId" element={<DeckDetailsPage />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
