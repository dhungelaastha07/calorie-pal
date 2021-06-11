import "./App.css";
import { Component } from "react";
import Home from "./Home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import axios from "axios";
import GoalForm from "./GoalForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
    };
    this.updateLoggedInUser = this.updateLoggedInUser.bind(this);
  }

  updateLoggedInUser(userData) {
    this.setState({
      loggedInUser: userData,
    });
  }

  setAxiosAuthorization(token) {
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.post("http://127.0.0.1:8080/check-token", { token }).then((res) => {
        this.updateLoggedInUser(res.data);
        this.setAxiosAuthorization(token);
      });
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/dashboard/goal"
            render={(props) => (
              <GoalForm
                {...props}
                loggedInUser={this.state.loggedInUser}
                updateLoggedInUser={this.updateLoggedInUser}
              />
            )}
          />
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard
                {...props}
                loggedInUser={this.state.loggedInUser}
                updateLoggedInUser={this.updateLoggedInUser}
              />
            )}
          />

          <Route
            path="/"
            render={(props) => (
              <Home
                {...props}
                loggedInUser={this.state.loggedInUser}
                updateLoggedInUser={this.updateLoggedInUser}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
