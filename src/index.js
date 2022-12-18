import React from "react";
import ReactDOM from "react-dom";


import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";


import App from "./App";


import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);


serviceWorker.unregister();
