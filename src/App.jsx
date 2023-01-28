import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import SuspenseLoader from "./components/SuspenseLoader";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const MyDecksPage = lazy(() => import("./pages/MyDecksPage"));
const PublicDecksPage = lazy(() => import("./pages/PublicDecksPage"));
const DeckDetailsPage = lazy(() => import("./pages/DeckDetailsPage"));

const App = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
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
    </Suspense>
  );
}

export default App;
