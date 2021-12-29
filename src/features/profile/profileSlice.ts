import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../app/store";
import { Profile } from "./types";
import { axiosConfig, fetchProfile, postPresence } from "../../api/api";
import { loadBetting } from "../betting/bettingSlice";
import axios from "axios";

let timer: any = null;

const initialState: Profile = {
  isAuthenticated: false,
  displayName: "",
  balance: 0,
  initialBalance: 0,
  lastTransactionId: 0,
  roles: [],
  twitchId: ""
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(_, action: PayloadAction<Profile>) {
      return {
        ...action.payload,
        balance: +action.payload.balance,
        initialBalance: +action.payload.balance,
        lastTransactionId: +action.payload.lastTransactionId,
      };
    },
    updateBalance(state, action: PayloadAction<Profile>) {
      if (+action.payload.lastTransactionId <= state.lastTransactionId) {
        return state;
      }
      var initialBalance = state.initialBalance;
      if (state.lastTransactionId === 0) {
        initialBalance = +action.payload.balance;
      }

      return {
        ...state,
        balance: +action.payload.balance,
        initialBalance: initialBalance,
        lastTransactionId: +action.payload.lastTransactionId,
      };
    },
  },
});

const startPresenceTicker = (): AppThunk => async (dispatch: AppDispatch) => {
  clearInterval(timer);
  postPresence(dispatch);
  timer = setInterval(() => {
    postPresence(dispatch);
  }, 60000);
};

export const loadProfile = (): AppThunk => async (dispatch: AppDispatch) => {
  const profile = await fetchProfile();
  dispatch(profileSlice.actions.updateProfile(profile));
  if (profile.isAuthenticated) {
    dispatch(startPresenceTicker());
    dispatch(loadBetting(profile.twitchId));
  }
};

export const signOut = (): AppThunk => async (dispatch: AppDispatch) => {
  clearInterval(timer);
  await axios.get("/api/logout", axiosConfig);
  dispatch(profileSlice.actions.updateProfile(initialState));
};

export const { updateProfile, updateBalance } = profileSlice.actions;
export default profileSlice.reducer;
