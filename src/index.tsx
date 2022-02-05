import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Grommet } from "grommet";
import splitbee from "@splitbee/web";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Grommet full>
        <App />
      </Grommet>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// Splitbee Analytics
splitbee.init();
splitbee.enableCookie(false);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
