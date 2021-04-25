import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "../src/Pages/Dashboard";
import CurrencyPage from "../src/Pages/CurrencyPage";
let routes = [
  {
    path: "/currency/:currency_id",
    exact: true,
    component: CurrencyPage,
  },
  {
    path: "/",
    component: Dashboard,
  },
];
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
