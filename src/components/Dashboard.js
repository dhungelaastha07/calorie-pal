import { Component } from "react";

import "./Dashboard.css";
import NavBar from "./NavBar";
import axios from "axios";
import CalorieForm from "./CalorieForm.js";
import Summary from "./Summary";
import ListActivity from "./ListActivity.js";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getGoalData = this.getGoalData.bind(this);
    this.getCalorieActivity = this.getCalorieActivity.bind(this);
  }

  componentDidMount() {
    if (!this.props.loggedInUser) {
      this.props.history.push("/");
    }

    if (this.props.loggedInUser) {
      this.getGoalData();
      this.getCalorieActivity();
    }
  }

  getGoalData() {
    axios
      .get("http://127.0.0.1:8080/get-goal")
      .then((res) => {
        if (res.data.goal) {
          this.props.updateUserGoal(res.data.goal);
        } else {
          this.props.history.push("/dashboard/goal");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCalorieActivity() {
    axios
      .get("http://127.0.0.1:8080/get-cal")
      .then((res) => {
        this.props.updateCalorieActivity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="dashboard-parent-container">
        <NavBar
          history={this.props.history}
          loggedInUser={this.props.loggedInUser}
          updateLoggedInUser={this.props.updateLoggedInUser}
        />
        <div className="dashboard-content">
          <Summary
            calorieActivity={this.props.calorieActivity}
            userGoal={this.props.userGoal}
          />
          <div>
            <CalorieForm
              updateCalorieActivity={this.props.updateCalorieActivity}
            />
          </div>
        </div>

        <ListActivity calorieActivity={this.props.calorieActivity} />
      </div>
    );
  }
}

export default Dashboard;
