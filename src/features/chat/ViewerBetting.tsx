import { FunctionComponent } from "react";
//import { postPresence, fetchProfile } from "../../api/api";
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

const TheBett: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  var BettList = [];

  for (let index = 0; index < PostAPIBett.options.length; index++) 
  {
    BettList.push(<p>{PostAPIBett.options[index].description}</p>);
  }

  if (profile.isAuthenticated)//TODO: make api get function for betting 
  {
    if (PostAPIBettInLogged.status)//i can do this with less code but it works
    {
      var BettCheck = [];
      for (let index = 0; index < PostAPIBett.options.length; index++) {
        var RadioName = "Option-" + index;
        BettCheck.push(
          <div className="form-check">
            <input className="form-check-input" type="radio" name="BettOption" id={RadioName}/>
            <label className="form-check-label" htmlFor={RadioName}>
              {PostAPIBett.options[index].description}
            </label>
        </div>
        );

      }
      return(
        <div>
          <h5>{PostAPIBett.objective}</h5>
          {BettCheck}
        </div>
      );
    }
    else //set choosen bet active
    {
      var BettCheck = [];
      for (let index = 0; index < PostAPIBett.options.length; index++) {
        var RadioName = "Option-" + index;
        BettCheck.push(
          <div className="form-check">
            <input className="form-check-input" type="radio" name="BettOption" id={RadioName} disabled/>
            <label className="form-check-label" htmlFor={RadioName}>
              {PostAPIBett.options[index].description}
            </label>
        </div>
        );

      }
      return(
        <div>
          <h5>{PostAPIBett.objective}</h5>
          {BettCheck}
        </div>
      );
    }
  }
  else
  {
    return(
      <div>
        <h5>{PostAPIBett.objective}</h5>
        {BettList}
      </div>
    );
  }
}


const ViewerBetting: FunctionComponent = () => {

  //let Profil = fetchProfile();
  const twitchBGColor = {
    backgroundColor: " #18181B",
    maxWidth: 340
  };//gör snygg og //överst char desc?  style={{height:"100%"}}
  //https://getbootstrap.com/docs/4.0/utilities/flex/

  return (
      <div id="ViewerBetting" className="d-none col d-flex flex-column m-0 p-0" style={twitchBGColor}>
        <div className="d-flex p-4 border-bottom border-secondary"></div>
        <div className="d-flex justify-content-center">
          <TheBett></TheBett>
        </div>
      </div>
  );
};
ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;
