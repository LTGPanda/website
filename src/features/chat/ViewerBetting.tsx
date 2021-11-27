import { FunctionComponent } from "react";


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



const ViewerBetting: FunctionComponent = () => {
  var description = "this is a place holder but i am sure drako will fill this riiight upp one day";
  var proDisc = "oh yes he will";
  var conDisc = "nah he succs";
  var maxBett = 1000;//place holdy
  var proColor = "#387AFF";
  var conColor = "#F5009B";
  const twitchBGColor = {
    backgroundColor: " #18181B",
    maxWidth: 340
  };//gör snygg og //överst char desc?  style={{height:"100%"}}
  //https://getbootstrap.com/docs/4.0/utilities/flex/
  return (
      <div id="ViewerBetting" className="d-none col d-flex flex-column m-0 p-0" style={twitchBGColor}>
        <div className="d-flex p-4 border-bottom border-secondary"></div>
        <div className="d-flex justify-content-center">
          <span className="p-3">{description}</span>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-row p-3">
            <div className="p-2" style={{color:proColor}}>
              <dl><dt>{proDisc}</dt></dl>
            </div>
            <div className="p-2" style={{color:conColor}}>
              <dl><dt>{conDisc}</dt></dl>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="progress" style={{backgroundColor: conColor}}>
            <div className="progress-bar" role="progressbar" style={{width:"25%", backgroundColor: proColor}}></div>
          </div>
        </div>
        <div className="input-group mb-3 align-self-end d-flex p-3">
          <input type='number' min="0" max={maxBett} className="form-control"></input>
          <div className="input-group-append">
            <button className="btn" type="button" style={{backgroundColor: proColor}}>Bet!</button>
          </div>
          <div className="p-1"></div>
          <input type='number' min="0" max={maxBett} className="form-control"></input>
          <div className="input-group-append">
            <button className="btn" type="button" style={{backgroundColor: conColor}}>Bet!</button>
          </div>
        </div>
      </div>
  );
};
ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;

/*
  shit immana need.
  * current bet deets
    * the pot both sides
    * count down
    * who bet what (could be fun)
  * personal
    * scales
    * all current bets user have betted on and how much
  * random
    * all current bets
*/