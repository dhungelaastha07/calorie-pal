import "./App.css";
import { Component } from "react";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
