import React from "react";
import ReactDOM from "react-dom";
import "./custom.scss";
import App from "./app/App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { loadProfile } from "./features/profile/profileSlice";
import { postPresence } from "./api/api";
import * as serviceWorker from "./serviceWorker";

store.dispatch(loadProfile());

postPresence();
setInterval(() => {
  postPresence();
}, 60000);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

//kolla documentation för content window som måste vara nånsort poggnes

//console.log(chatBox.contentWindow.document.getElementById("root"));
//https://github.com/SirRippovMaple/drako-meteor-public

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
