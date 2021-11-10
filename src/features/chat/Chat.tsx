import { FunctionComponent } from "react";

const Chat: FunctionComponent = () => {
  var loc = "https://www.twitch.tv/embed/drako/chat?parent=" + window.location.hostname + "&darkpopout";

  return (
    <div className="col d-flex flex-row m-0 p-0" style={{ maxWidth: 340 }}>
      <iframe title="Twitch Chat" src={loc} width="100%" height="100%"></iframe>
    </div>
  );
};
//testa lägga in nåt i ifram saken inom tagserna liksom liksom där     ^
//testa göra en .js fil som ligger utanför och gör sakerna som jag är lovad
Chat.displayName = "Chat";
export default Chat;
