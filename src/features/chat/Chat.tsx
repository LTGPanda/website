import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import ViewerBetting from "./ViewerBetting"

const Chat: FunctionComponent = () => {
  var loc = "https://www.twitch.tv/embed/drako/chat?parent=" + window.location.hostname + "&darkpopout";
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

  console.log("lol xd")
  viewBett!.classList.contains("show") ? viewBett!.classList.remove("show") : viewBett!.classList.add("show");
  viewBett!.style.visibility = "visible";
}
Chat.displayName = "Chat";
export default Chat;
