import { Component } from "react";

import "./Dashboard.css";
import NavBar from "./NavBar";
import axios from "axios";
import CalorieForm from "./CalorieForm.js";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    if (!this.props.loggedInUser) {
      this.props.history.push("/");
    }
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
          <div className="remaining-cal">
            <h1>980 cal</h1>
            <p> remaining</p>
          </div>

          <div className="form-col">
            <CalorieForm />
          </div>
          {/* <h1 className="dashboard-title">
            {" "}
            Are you here to witness the fitness?{" "}
          </h1>{" "}
          <p className="dashboard-description">
            {" "}
            Be gentle. You’ve been at war with your body for so long. Peace
            takes time. Step up your diet routine with us!
          </p> */}
        </div>
      </div>
    );
  }
}

export default Dashboard;
