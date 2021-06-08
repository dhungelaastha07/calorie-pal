import { Component } from "react";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import NavBar from "./NavBar";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formDisplay: "signin",
    };
    this.updateFormDisplay = this.updateFormDisplay.bind(this);
  }

  updateFormDisplay(newDisplay) {
    this.setState({
      formDisplay: newDisplay,
    });
  }

  render() {
    return (
      <div className="home-parent-container">
        <NavBar updateFormDisplay={this.updateFormDisplay} />
        <div className="content">
          <div className="sign-in">
            {this.state.formDisplay === "signin" ? <SignIn /> : <SignUp />}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
