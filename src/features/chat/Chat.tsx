import { FunctionComponent } from "react";
import ViewerBetting from "./ViewerBetting"

const Chat: FunctionComponent = () => {
  var loc = "https://www.twitch.tv/embed/drako/chat?parent=" + window.location.hostname + "&darkpopout";
//can i move styles to here?
  return (
    <div className="col d-flex flex-row m-0 p-0" style={{ maxWidth: 340 }}>
      <ViewerBetting />
      <div id="ovelap-Box">
        <div id="test2" onClick={bettingButt}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </div>
      </div>
      <iframe id="chatbox" title="Twitch Chat" src={loc} width="100%" height="100%"></iframe>
    </div>
  );
};

function bettingButt() {//implement flip flop system
  var chatboxBox = document.getElementById("chatbox");
  chatboxBox!.classList.add("d-none");
  var viewBett = document.getElementById("ViewerBetting");
  viewBett!.classList.remove("d-none");
}



//TODO: make bettingpage class. rename shit. make it so it works. accessibility? make do pwetty

//hitta ett sett att få något över en annan object
//kan ha en bar över chaten
//testa lägga in nåt i ifram saken inom tagserna liksom liksom där     ^
//testa göra en .js fil som ligger utanför och gör sakerna som jag är lovad//
Chat.displayName = "Chat";
export default Chat;
