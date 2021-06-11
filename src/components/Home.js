import { Component } from "react";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import NavBar from "./NavBar";
import "./Home.css";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formDisplay: "signin",
    };
    this.updateFormDisplay = this.updateFormDisplay.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedInUser) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate() {
    if (this.props.loggedInUser) {
      this.props.history.push("/dashboard");
    }
  }

  updateFormDisplay(newDisplay) {
    this.setState({
      formDisplay: newDisplay,
    });
  }

  render() {
    return (
      <div className="home-parent-container">
        <NavBar
          updateFormDisplay={this.updateFormDisplay}
          loggedInUser={this.props.loggedInUser}
        />
        <div className="content">
          <div className="form-col">
            {this.state.formDisplay === "signin" ? (
              <SignIn
                redirect={this.props.history.push}
                updateLoggedInUser={this.props.updateLoggedInUser}
              />
            ) : (
              <SignUp updateFormDisplay={this.updateFormDisplay} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
