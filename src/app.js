import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Items from "./items";

export default function App() {
    return (
        <div className="shopping-list-container">
            <h1>My Shopping List</h1>
            <BrowserRouter>
                <Route path="/" render={() => <Items />} />
            </BrowserRouter>
        </div>
    );
}
