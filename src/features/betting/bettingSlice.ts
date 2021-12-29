import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../app/store";
import { Bet, BetResult, BetStore, BettingGame } from "./types";
import { axiosConfig, baseUrl, handleErrors } from "../../api/api";
import { UseFormSetError } from "react-hook-form";

const initialState: BetStore = {
  game: {
    objective: "",
    status: "Never",
    options: [],
  },
  winners: [],
  bet: {
    optionsID: "",
    amount: -1,
  },
};//fix dis? and style

const bettingSlice = createSlice({
  name: "betting",
  initialState,
  reducers: {
    updateBettingGame(state: BetStore, action: PayloadAction<BettingGame>) {
      if (!state.game.id || state.game.id === action.payload.id || action.payload.status === "Open") {
        return {
          ...state,
          game: {
            ...action.payload,
            total: +action.payload.total!,
            options: action.payload.options.map((item) => {
              return {
                ...item,
                total: +item.total!,
              };
            }),
          },
        };
      }

      return state;
    },
    updateBets(state: BetStore, action: PayloadAction<BetResult[]>) {
      return {
        ...state,
        bets: action.payload,
      };
    },
    updateBet(state: BetStore, action: PayloadAction<Bet>){
      return {
        ...state,
        bet: action.payload,
      };
    },
  },
});


export const viewerBet =
  (option: string, BetAmount: number, betId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const payload = {
      optionId: option,
      amount: BetAmount
    }
    
    const response = await axios.post(baseUrl + `betting/${betId}/bet`, payload, axiosConfig);
    const BetObj:Bet = {optionsID: payload.optionId, amount: payload.amount};


    if(response.status === 200){
      dispatch(bettingSlice.actions.updateBettingGame(response.data));
      dispatch(bettingSlice.actions.updateBet(BetObj));
    }

    await handleErrors(dispatch, response);
  };

export const loadViewerBet = 
  (TwitchId: string, betId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.get(baseUrl + `betting/${betId}/bets?userId=${TwitchId}`);
    const BetObj:Bet = {optionsID: response.data.optionId, amount: +response.data.amount};

    if(response.status === 200){
      dispatch(bettingSlice.actions.updateBet(BetObj));
    }

    await handleErrors(dispatch, response);
  }

const loadBets =
  (gameId: string, winningOptionId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.get(baseUrl + `betting/${gameId}/bets?optionId=${winningOptionId}`, axiosConfig);

    if (response.status === 200) {
      dispatch(bettingSlice.actions.updateBet(response.data));
    }

    await handleErrors(dispatch, response);
  };

export const loadBetting = (twitchId:string): AppThunk => async (dispatch: AppDispatch) => {
  const response = await axios.get(baseUrl + "betting", axiosConfig);

  if (response.status === 200) {
    dispatch(bettingSlice.actions.updateBettingGame(response.data));
    if (response.data.winningOption) {
      dispatch(loadBets(response.data.id, response.data.winningOption));
    }
    dispatch(loadViewerBet(twitchId, response.data.id));
  }

  await handleErrors(dispatch, response);
};

export const openBetting =
  (resource: BettingGame, setError: UseFormSetError<any>): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.post<BettingGame>(baseUrl + "betting", resource, axiosConfig);

    if (response.status === 201) {
      dispatch(bettingSlice.actions.updateBettingGame(response.data));
    }

    await handleErrors(dispatch, response);
  };

export const closeBetting =
  (gameId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.patch(baseUrl + `betting/${gameId}`, { status: "Closed" }, axiosConfig);

    if (response.status === 200) {
      dispatch(bettingSlice.actions.updateBettingGame(response.data));
    }

    await handleErrors(dispatch, response);
  };

export const cancelBetting =
  (gameId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const response = await axios.patch(baseUrl + `betting/${gameId}`, { status: "Canceled" }, axiosConfig);

    if (response.status === 200) {
      dispatch(bettingSlice.actions.updateBettingGame(response.data));
    }

    await handleErrors(dispatch, response);
  };

export const chooseWinner =
  (gameId: string, winningOptionId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const payload = {
      status: "Done",
      winningOption: winningOptionId,
    };

    const response = await axios.patch(baseUrl + `betting/${gameId}`, payload, axiosConfig);

    if (response.status === 200) {
      dispatch(bettingSlice.actions.updateBettingGame(response.data));
      dispatch(loadBets(gameId, winningOptionId));
    }

    await handleErrors(dispatch, response);
  };

export const { updateBettingGame } = bettingSlice.actions;
export default bettingSlice.reducer;
