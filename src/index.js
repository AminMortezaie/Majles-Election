import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Candida from "./components/candida.component";
import Region from "./components/region.component";
import Gerayesh from "./components/gerayesh.component";
import Madrak from "./components/madrak.component";
import People from "./components/people.component";
import Main from "./components/main.component";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/region" component={Region} />
      <Route path="/candida" component={Candida} />
      <Route path="/gerayesh" component={Gerayesh} />
      <Route path="/madrak" component={Madrak} />
      <Route path="/people" component={People} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

