import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

//temp shtuff
const PostAPIBett = {
  "objective": "Will Catmando become a dog?",
  "options": [
      {
          "description": "He will become a dog"
      },
      {
          "description": "He will not become a dog and live"
      },
      {
          "description": "He will die"
      }
  ]
};

const PostAPIBettInLogged = {
  "id": "101",
  "objective": "Will Catmando become a dog?",
  "options": [
    {
      "description": "He will become a dog",
      "id": "512",
      "total": "0"
    },
    {
      "description": "He will not become a dog and live",
      "id": "513",
      "total": "0"
    },
    {
      "description": "He will die",
      "id": "514",
      "total": "0"
    }
  ],
  "status": "Open",
  "winningOption": null,
  "total": "0",
  "alreadyBet": false
};

/*
docker fuckery
react state
axtio dispatch


betting 
amount o user


POST /api/betting/{id}/bet
        
{
  "amount": "200",
  "optionId": "23"
}

response
{
  "id": -1,
  "objective": "This is a test bet.",
  "options": [
    {
      "description": "She will live",
      "id": -1,
      "total": 0
    },
    {
      "description": "She will die",
      "id": -1,
      "total": 0
    }
  ],
  "status": "Open",
  "winningOption": null,
  "total": 100,
  "alreadyBet": true
}
*/

const TheBet: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  var BetCheck = [];
  var BetButt = [];
  var RadioName;
  
  if (profile.isAuthenticated)//TODO: make api get function for betting 
  {
    if (PostAPIBettInLogged.status)//i can do this with less code but it works
    {
      for (let index = 0; index < PostAPIBett.options.length; index++) {
        RadioName = "Option-" + index;
        BetCheck.push(
          <div className="form-check">
            <input className="form-check-input" type="radio" name="BettOption" id={RadioName}/>
            <label className="form-check-label" htmlFor={RadioName}>
              {PostAPIBett.options[index].description}
            </label>
        </div>
        );
      }
      BetButt.push(
        <div className="input-group mb-3 align-self-end d-flex p-3">
          <input type='number' min="0" max={profile.balance} className="form-control"></input>
          <div className="input-group-append">
            <button className="btn" type="button" style={{backgroundColor: "#00db84"}}>Bet!</button>
          </div>
        </div>
      );
    }
    else //set choosen bet active
    {
      for (let index = 0; index < PostAPIBett.options.length; index++) {
        RadioName = "Option-" + index;

        //need to make sure this is correct
        if (profile.lastTransactionId.toString() === PostAPIBettInLogged.options[index].id) 
        {
          BetCheck.push(
            <div className="form-check">
              <input className="form-check-input" type="radio" name="BettOption" id={RadioName} disabled checked/>
              <label className="form-check-label" htmlFor={RadioName}>
                {PostAPIBett.options[index].description}
              </label>
          </div>
          );
        }
        else
        {
          BetCheck.push(
            <div className="form-check">
              <input className="form-check-input" type="radio" name="BettOption" id={RadioName} disabled/>
              <label className="form-check-label" htmlFor={RadioName}>
                {PostAPIBett.options[index].description}
              </label>
          </div>
          );
        }
      }
    }
  }
  else
  {
    for (let index = 0; index < PostAPIBett.options.length; index++) 
    {
      BetCheck.push(<p>{PostAPIBett.options[index].description}</p>);
    }
  }
  return(
    <div>
      <div className="p-3">
        <h5>{PostAPIBett.objective}</h5>
        {BetCheck}
      </div>
      {BetButt}
    </div>
  );
}


const ViewerBetting: FunctionComponent = () => {

  //let Profil = fetchProfile();
  const twitchBGColor = {
    backgroundColor: " #18181B",
    maxWidth: 340
  };
  //gör snygg og //överst char desc?  style={{height:"100%"}}
  //https://getbootstrap.com/docs/4.0/utilities/flex/

  return (
      <div id="ViewerBetting" className="d-none col d-flex flex-column m-0 p-0" style={twitchBGColor}>
        <div className="d-flex p-4 border-bottom border-secondary"></div>
        <div className="d-flex justify-content-center">
          <TheBet/>
        </div>
        <div className="d-flex border-bottom border-secondary"></div>
      </div>
  );
};
ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;
