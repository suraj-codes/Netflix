import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
function App() {
  const promise = loadStripe(
    "pk_test_51IW4FxL68S1WY1CJplCDs0lYegCwRTTTmVXHokAZqEWrcqU5rrj5d8QGxyIRRLeR3FzZ8e7xdH5wvrxRuGhwXf7300ezo8GxNM"
  );
  const user = useSelector(selectUser);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route exact path="/profile">
            <Elements stripe={promise}>
              <ProfileScreen />
              </Elements>
            </Route>
            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
