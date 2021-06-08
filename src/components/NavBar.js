import { Component } from "react";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="nav-parent-container">
        <div className="logo">
          <p className="nav-title">Calorie-Pal</p>
        </div>
        <div className="menu-options">
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
      </div>
    );
  }
}

export default NavBar;
