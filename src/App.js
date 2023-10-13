import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import "./App.css";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signup"></Redirect>
        </Route>
        <Route path="/signup">
          <SignUp></SignUp>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
