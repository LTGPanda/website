import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../app/store";
import { axiosConfig, baseUrl, handleErrors } from "../../api/api";
import axios from "axios";
import { User } from "./types";

const initialState: User[] = [];

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    updateLeaderboard(state, action: PayloadAction<{ users: User[]; append: boolean }>) {
      if (action.payload.append) {
        return state.concat(action.payload.users);
      }
      return action.payload.users;
    },
  },
});

export const loadLeaderboard =
  (pageNumber: number, append: boolean): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.get(baseUrl + "leaderboard?pageSize=40&pageNum=" + pageNumber, axiosConfig);

    if (response.status === 200) {
      dispatch(leaderboardSlice.actions.updateLeaderboard({ users: response.data, append: append }));
    }

    handleErrors(dispatch, response);
  };

export const { updateLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
