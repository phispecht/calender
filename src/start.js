import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(composeWithDevTools(applyMiddleware(reduxPromise)));

let elem;
if (location.pathname === "/welcome") {
    /* elem = <Welcome />; */
} else {
    /*  init(store); */
    elem = (
        <Provider store={store}>
            <App />;
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
