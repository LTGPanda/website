import { FunctionComponent } from "react";
import ViewerBetting from "./ViewerBetting"

const Chat: FunctionComponent = () => {
  var loc = "https://www.twitch.tv/embed/drako/chat?parent=" + window.location.hostname + "&darkpopout";
//can i move styles to here?
  return (
    <div className="flex-row col-lg d-flex flex-fill m-0 p-0">
      <ViewerBetting />
      <div id="ovelap-Box">
        <div id="test2" data-bs-toggle="offcanvas" data-bs-target="#ViewerBetting" onClick={bettingButt}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </div>
      </div>
      <iframe id="chatbox" title="Twitch Chat" src={loc} width="100%" height="100%"></iframe>
    </div>
  );
};

function bettingButt() {
  var chatboxBox = document.getElementById("chatbox");
  var viewBett = document.getElementById("ViewerBetting");

  viewBett!.classList.contains("d-none") ? viewBett!.classList.remove("d-none") : viewBett!.classList.add("d-none");
  chatboxBox!.classList.contains("d-none") ? chatboxBox!.classList.remove("d-none") : chatboxBox!.classList.add("d-none");
}



/*TODO: 
* rename shit. 
* make it so it works. 
* accessibility? 
* make do pwetty
*/
Chat.displayName = "Chat";
export default Chat;
