import React from "react";
import "./App.css";
//router
import Route from "react-router-dom/Route";
import Router from "react-router-dom/BrowserRouter";
import Switch from "react-router-dom/Switch";
import Redirect from "react-router-dom/Redirect";
//scenes
import LiveResults from "./scenes/LiveResults";
import Results from "./scenes/Results";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect from="/" to="/sonuclar" />
        </Route>
        <Route path="/sonuclar" exact>
          <Results />
        </Route>
        <Route path="/sonuclar/canliSonuclar" exact>
          <LiveResults />
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
