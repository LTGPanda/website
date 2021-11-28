import React, { FunctionComponent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnimatedNumber from "react-animated-number";
import { RootState } from "../../app/store";
import BettingOpenForm from "./BettingOpenForm";
import BettingWinnerForm from "./BettingWinnerForm";
import { closeBetting } from "./bettingSlice";

const BettingAdmin: FunctionComponent = () => {
  const [state, setState] = useState({ openingBet: false, choosingWinner: false });
  const dispatch = useDispatch();
  const betting = useSelector((state: RootState) => state.betting);

  if (state.openingBet) {
    return <BettingOpenForm onCls={() => setState({ ...state, openingBet: false })} />;
  }
  if (state.choosingWinner) {
    return <BettingWinnerForm onCls={() => setState({ ...state, choosingWinner: false })} />;
  }

  switch (betting.game.status) {
    case "Cancelled":
      const cancelledOptions = betting.game.options.map((item) => (
        <tr>
          <td>{item.description}</td>
        </tr>
      ));
      return (
        <div className="text-center">
          <h1>
            Betting is <span className="text-red">cancelled</span>
          </h1>
          <p className="lead">{betting.game.objective}</p>
          <table className="table table-borderless">
            <tbody>{cancelledOptions}</tbody>
          </table>
          <p>All bets have been refunded.</p>
        </div>
      );

    case "Open":
      return (
        <div className="text-center">
          <h1>
            Betting is <span className="text-green">open</span>
          </h1>
          <p className="lead">{betting.game.objective}</p>
          <h2>
            <AnimatedNumber className="navbar-text px-1" value={betting.game.total} duration={1500} stepPrecision={0} />
          </h2>
          <p>scales wagered</p>
          <form>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={() => dispatch(closeBetting(betting.game.id!))}>
                Close betting
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" disabled={true}>
                Cancel betting
              </button>
            </div>
          </form>
        </div>
      );

    case "Closed":
      const options = betting.game.options.map((item) => (
        <tr key={item.id}>
          <td>{item.description}</td>
          <td>{item.total} scales</td>
        </tr>
      ));
      return (
        <div className="text-center">
          <h1>
            Betting is <span className="text-red">closed</span>
          </h1>
          <p className="lead">{betting.game.objective}</p>
          <table className="table table-borderless">
            <tbody>{options}</tbody>
          </table>
          <form>
            <div className="mb-3">
              <button className="btn btn-primary w-100" onClick={() => setState({ ...state, choosingWinner: true })}>
                Choose winner
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger w-100" disabled={true}>
                Cancel betting
              </button>
            </div>
          </form>
        </div>
      );

    case "Done":
      const winners = betting.bets.map((item) => (
        <tr key={item.id}>
          <td>{item.displayName}</td>
          <td>{item.amountWagered}</td>
          <td>{item.amountAwarded}</td>
        </tr>
      ));
      return (
        <div className="text-center">
          <h1>Betting is done</h1>
          <p className="lead">{betting.game.objective}</p>
          <table className="table table-borderless">
            <tbody>{winners}</tbody>
          </table>
          <form>
            <div className="mb-3">
              <button className="btn btn-primary w-100" onClick={() => setState({ ...state, openingBet: true })}>
                Start new bet
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger w-100" disabled={true}>
                Reverse payout
              </button>
            </div>
          </form>
        </div>
      );
  }

  return <div>oops {betting.game.status}</div>;
};

BettingAdmin.displayName = "Betting admin";
export default BettingAdmin;
