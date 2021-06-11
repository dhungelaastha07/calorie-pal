import { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logOutUser = this.logOutUser.bind(this);
  }

  logOutUser() {
    this.props.updateLoggedInUser(null);
    localStorage.removeItem("token");
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="nav-parent-container">
        <div className="logo">
          <Link to="/" className="nav-title">
            Calorie-Pal
          </Link>
        </div>
        <div className="menu-options">
          {!this.props.loggedInUser ? (
            <div className="sign-in-up">
              <p
                className="nav-option"
                onClick={() => {
                  this.props.updateFormDisplay("signin");
                }}
              >
                {" "}
                Sign In
              </p>
              <p
                className="nav-option"
                onClick={() => {
                  this.props.updateFormDisplay("signup");
                }}
              >
                {" "}
                Sign Up{" "}
              </p>
            </div>
          ) : (
            <div className="sign-in-up">
              <Link className="nav-option set-goal" to="/dashboard/goal">
                {" "}
                Set Goal{" "}
              </Link>
              <p className="nav-option" onClick={this.logOutUser}>
                {" "}
                Log Out{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NavBar;
