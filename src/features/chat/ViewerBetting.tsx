import { FunctionComponent, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { viewerBet } from "../betting/bettingSlice";

/*
pretty sure the Cancelled in the if statment is a bit wonky
btw thanks for the oppertunity i learned quite a lot, altough sad my three dots wont survive :(

and if the code is unreadeble i can explain.
*/

const TheBet: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const betting = useSelector((state: RootState) => state.betting);
  const [state, setState] = useState({ OptionId: "", amount: ""});
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  var BetCheck = [];
  var BetButt = [];

  if (profile.isAuthenticated)
  {
    if (betting.game.status === "Open" && !betting.game.alreadyBet)
    {
      BetCheck.push(
      <>
          <ButtonGroup vertical className="mb-2">
            {betting.game.options.map((item, idx) => (
              <ToggleButton
                className="btn btn-primary w-100"
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="secondary"
                name="radio"
                checked={checked}
                value={item.description}
                onChange={(e) => {setState({...state, OptionId : item.id!});  setChecked(e.currentTarget.checked);}}
              >
              {item.description}
            </ToggleButton>
            ))}
          </ButtonGroup>
      </>
      );
      BetButt.push(
        <div className="input-group mb-3 align-self-end d-flex p-3">
          <div className="input-group-append">
            <input name="BetAmount" type='number' min="0" max={profile.balance} className="form-control" onChange={e => setState({...state, amount : e.target.value})}></input>
          </div>
          <button className="btn" type="button" style={{backgroundColor: "#00db84"}} onClick={() => DisForm(state.OptionId, state.amount, betting.game.id!, dispatch)}>Bet!</button>
        </div>
      );
    }

    else if(betting.game.status === "Closed" || betting.game.alreadyBet)
    {
      BetCheck.push(
        <>
            <ButtonGroup vertical className="mb-2">
              {betting.game.options.map((item, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="secondary"
                name="radio"
                checked={item.id === betting.bet.optionsID}
                value={item.description}
              >
              {item.description}
              </ToggleButton>
              ))}
            </ButtonGroup>
        </>
        );
    }
  }
  else if(betting.game.status !== "Done" && betting.game.status !== "Cancelled")
  {
    for (let index = 0; index < betting.game.options.length; index++) 
    {
      BetCheck.push(<p key={Math.random().toString(36).substr(2, 9)}>{betting.game.options[index].description}</p>);
    }
  }
  else if(betting.game.status === "Cancelled")
  {
    BetCheck.push(<h2>Betting is cancelled and all point are refunded.</h2>);
  }
  else
  {
    return (null);
  }
  return(
    <form>
      <div>
        <h5>{betting.game.objective}</h5>
        <div className="d-flex justify-content-center p-3">
          {BetCheck}
        </div>
      </div>
      {BetButt}
    </form>
  );
}

function DisForm(OptId:string, Amount:string, Id:string, dispatch:AppDispatch) {
  var intAmount = Number(Amount);
  isNaN(intAmount)
  if (!isNaN(intAmount) && OptId !== "") {
    dispatch(viewerBet(OptId, intAmount, Id));
  }
}

function bettingButt() {
  var viewBett = document.getElementById("ViewerBetting");

  console.log("lol xd")
  viewBett!.classList.contains("show") ? viewBett!.classList.remove("show") : viewBett!.classList.add("show");
  viewBett!.style.visibility = "visible";
}

const ViewerBetting: FunctionComponent = () => {
  var navbar = document.querySelector<HTMLElement>(".navbar");
  var navHeight = 100;
  if (navbar !== null)
  {
    navHeight =  navbar!.offsetHeight;
  }
  const twitchBGColor = {
    backgroundColor: " #18181B",
    marginTop: navHeight
  };
  //https://getbootstrap.com/docs/5.0/components/offcanvas/ 
  return (
      <div id="ViewerBetting" className="flex-row col-lg offcanvas offcanvas-end" tabIndex={-1} aria-labelledby="ViewerBettingLabel" style={twitchBGColor}>
        <div className="offcanvas-body">
        <div id="ovelap-Box">
          <div id="test2" data-bs-toggle="offcanvas" data-bs-target="#ViewerBetting" onClick={bettingButt}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
          </div>
        </div>
          <div className="border-bottom border-secondary p-4"></div>
          <div className="d-flex justify-content-center">
            <TheBet/>
          </div>
          <div className="d-flex border-bottom border-secondary"></div>
        </div>
      </div>
  );
};
ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;
