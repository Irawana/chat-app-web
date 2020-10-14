import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";

import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";

export default ({ currentUser }) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => currentUser ? <Chat /> : <Home />}
                />
                <Route
                    exact
                    path="/chat"
                    render={() => (currentUser ? <Chat /> : <Home />)}
                />
            </Switch>
        </BrowserRouter>
    );
};
