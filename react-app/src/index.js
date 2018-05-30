/* React et al */
import React from "react";
import ReactDOM from "react-dom";

/* CSS */
import "./index.css";

/* Infrastructure Specific*/
import registerServiceWorker from "./registerServiceWorker";


/* MaterialUI */
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import logo from "./images/nip-logo.svg"

import App from "./app"

ReactDOM.render((<MuiThemeProvider><App logo={logo}/></MuiThemeProvider>), document.getElementById("root"));

registerServiceWorker();
