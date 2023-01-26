import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../app/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {
  userDetails: {}
};

export const registerUser = createAsyncThunk("user/registerUser", async (data) => {
  const { userDisplayName, email, password } = data;

  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: userDisplayName });
    }
    if (user) {
      const { uid, displayName, email } = user;
      return { userId: uid, displayName, email };
    } else {
      return {};
    }
  } catch (error) {
    console.log("error creating user: ", error);
  }
});

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const { email, password } = data;
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user) {
      const { uid, displayName, email } = user;
      return { userId: uid, displayName, email };
    } else {
      return {};
    }
  } catch (error) {
    console.log("Error signing in user: ", error);
  }
})

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error signing out user.");
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userDetails = {};
      })
  }
});

export const selectUserDetails = (state) => state.user.userDetails;

export default userSlice.reducer;
