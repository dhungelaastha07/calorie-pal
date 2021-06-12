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
      userGoal: null,
      calorieActivity: [],
    };
    this.updateLoggedInUser = this.updateLoggedInUser.bind(this);
    this.updateUserGoal = this.updateUserGoal.bind(this);
    this.updateCalorieActivity = this.updateCalorieActivity.bind(this);
  }

  updateLoggedInUser(userData) {
    this.setState({
      loggedInUser: userData,
    });
  }

  updateUserGoal(goal) {
    this.setState({
      userGoal: goal,
    });
  }

  updateCalorieActivity(activity) {
    this.setState({
      calorieActivity: activity,
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
        this.setAxiosAuthorization(token);
        this.updateLoggedInUser(res.data);
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
                userGoal={this.state.userGoal}
                updateLoggedInUser={this.updateLoggedInUser}
                updateUserGoal={this.updateUserGoal}
              />
            )}
          />
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard
                {...props}
                loggedInUser={this.state.loggedInUser}
                userGoal={this.state.userGoal}
                calorieActivity={this.state.calorieActivity}
                updateLoggedInUser={this.updateLoggedInUser}
                updateUserGoal={this.updateUserGoal}
                updateCalorieActivity={this.updateCalorieActivity}
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
