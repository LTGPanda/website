import { FunctionComponent } from "react";

const ViewerBetting: FunctionComponent = () => {
  var description = "this is a place holder but i am sure drako will fill this riiight upp one day";
  var maxBett = 1000;//place holdy
  const twitchBGColor = {
    backgroundColor: " #18181B",
    maxWidth: 340
  };//gör snygg og
  //https://getbootstrap.com/docs/4.0/utilities/flex/
  return (
      <div id="ViewerBetting" className="d-none col d-flex flex-column m-0 p-0" style={twitchBGColor}>
        <div className="d-flex justify-content-center">
          <span className="p-3">{description}</span>
        </div>
        <div className="d-flex flex-row">
          <div className="p-2">pro info</div>
          <div className="p-2">con info</div>
        </div>
        <div className="input-group mb-3 align-self-end d-flex p-3">
          <input type='number' min="0" max={maxBett} className="form-control"></input>
          <div className="input-group-append">
            <button className="btn" type="button" style={{backgroundColor: "#387AFF"}}>Bet!</button>
          </div>
          <input type='number' min="0" max={maxBett} className="form-control"></input>
          <div className="input-group-append">
            <button className="btn" type="button" style={{backgroundColor: "#F5009B"}}>Bet!</button>
          </div>
        </div>
      </div>
  );
};
ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;