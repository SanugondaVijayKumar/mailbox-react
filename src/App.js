import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signup"></Redirect>
        </Route>
        <Route path="/signup" exact>
          <SignUp></SignUp>
        </Route>
        <Route path="/login" exact>
          <Login></Login>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
