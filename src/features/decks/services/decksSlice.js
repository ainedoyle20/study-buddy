import { apiSlice } from "../../api/apiSlice";
import { db } from "../../../app/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchDecks: builder.query({
      async queryFn(userId) {
        const docRef = doc(db, "decks", userId);
        try {
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {

            return { data: docSnap.data() };

          } else {
            await setDoc(docRef, {})

            return { data: {} };
          }
        } catch (error) {
          console.log("Error fetching decks: ", error);
          return { error: error.message };
        }
      },
      providesTags: ["Decks"],
    }),
    addDeck: builder.mutation({
      async queryFn({ deckId, newDeck, userId }) {
        const docRef = doc(db, "decks", userId);
        try {
          await updateDoc(docRef, {
            [deckId]: { ...newDeck }
          });
          return { data: null };
        } catch (error) {
          console.log("Error createing deck.: ", error);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Decks"]
    }),
    addCard: builder.mutation({
      async queryFn({ deckId, cardId, newCard, userId }) {
        console.log("Got here", deckId, cardId, newCard, userId);
        const docRef = doc(db, "decks", userId);
        try {
          await updateDoc(docRef, {
            [`${deckId}.cards.${cardId}`]: {...newCard}
          })
          return {data: null}
        } catch (error) {
          console.log("Error adding card: ", error);
          return { error: error.message}
        }
      },
      invalidatesTags: ["Decks"]
    })
  })
});

export const { useFetchDecksQuery, useAddDeckMutation, useAddCardMutation } = extendedApiSlice;
