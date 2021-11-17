import { FunctionComponent } from "react";

const ViewerBetting: FunctionComponent = () => {
  var description = "this is a place holder but i am sure drako will fill this riiight upp one day";
  var maxBett = 1000;//place holdy
  const twitchBGColor = {
    backgroundColor: " #18181B",
    maxWidth: 340
  };//gör snygg og
  return (
      <div id="ViewerBetting" className="d-none col d-flex flex-row m-0 p-0" style={twitchBGColor}>
        <span>{description} test</span>
        <div className='form-group'>
          <div>
            <input type='number' min="0" max={maxBett} aria-describedby="ProBett"></input>
            <button className="btn">Bet</button>
          </div>
          <div>
            <input type='number' min="0" max={maxBett} aria-describedby="ConBett"></input>
            <button className="btn">Bet</button>
          </div>
        </div>
        
      </div>
  );
};
ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;
