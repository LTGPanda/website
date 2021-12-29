import { FunctionComponent, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { viewerBet } from "../betting/bettingSlice";

/*
LEARN: 
  * https://getbootstrap.com/docs/5.0/components/offcanvas/
  * 
TEST:
  * normal run and every case auth/noauth open,closed, canceled and Done

FIX:
  * transaction id if statment thing
  * page loads get bet from api
  * flip flop state, store
  * when bet is won make winning option pwetty collor
DO: 
  * animanations
  * make pwety
    * button group
      * Butt color etc
      * Butt look 
    * text
    * viewer tab
    * flip flop Butt
    *  
  
betting 
amount o user

*/

//TODO: animate
const TheBet: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const betting = useSelector((state: RootState) => state.betting);//when do i get this info with the whole auth or no auth
  const [state, setState] = useState({ OptionId: "", amount: ""});
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  console.log(betting);
  console.log(betting.game.status);
  var BetCheck = [];
  var BetButt = [];
  /*
  man får till backa en betting.bet med amount och betopt id jag behöver:
  fixa disabled så att det är samma som när det är open.
  checka den som är vald
  först kolla om .bet finns på något vetigt sätt
  */

  //TODO: change the look of radio BUTTS

  if (profile.isAuthenticated)
  {
    if (betting.game.status === "Open" && !betting.game.alreadyBet)//i can do this with less code but it works
    {//dis look good?
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
  //FIXME: fix for more than one bet later.
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

//Not the best way but sure is a way
function DisForm(OptId:string, Amount:string, Id:string, dispatch:AppDispatch) {
  var intAmount = Number(Amount);
  isNaN(intAmount)
  if (!isNaN(intAmount) && OptId !== "") {
    dispatch(viewerBet(OptId, intAmount, Id));
  }
}

const ViewerBetting: FunctionComponent = () => {
  const twitchBGColor = {
    backgroundColor: " #18181B"
  };
  return (
      <div id="ViewerBetting" className="d-none flex-row col-lg offcanvas offcanvas-end" tabIndex={-1} style={twitchBGColor}>
        <div className="border-bottom border-secondary p-4"></div>
        <div className="d-flex justify-content-center">
          <TheBet/>
        </div>
        <div className="d-flex border-bottom border-secondary"></div>
      </div>
  );
};
ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;
