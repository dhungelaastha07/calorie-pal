import { Component } from "react";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      passwordInput: "",
    };

    this.userInputHandler = this.userInputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  userInputHandler(e, stateName) {
    this.setState({
      [stateName]: e.target.value,
    });
  }

  submitHandler(e) {
    e.preventDefault();
    console.log("here");
  }

  render() {
    return (
      <div className="form-parent-container">
        <form onSubmit={this.submitHandler} className="form-container">
          <h2 className="form-title"> Sign Up </h2>
          <label className="form-label" htmlFor="first-name">
            {" "}
            First Name{" "}
          </label>
          <input
            className="user-input-box"
            type="text"
            placeholder="enter your first name"
            value={this.state.firstNameInput}
            onChange={(e) => {
              this.userInputHandler(e, "firstNameInput");
            }}
          />
          <label className="form-label" htmlFor="last-name">
            {" "}
            Last Name{" "}
          </label>
          <input
            className="user-input-box"
            type="text"
            placeholder="enter your last name"
            value={this.state.lastNameInput}
            onChange={(e) => {
              this.userInputHandler(e, "lastNameInput");
            }}
          />
          <label className="form-label" htmlFor="email">
            {" "}
            Email{" "}
          </label>
          <input
            className="user-input-box"
            type="email"
            placeholder="enter your email"
            value={this.state.emailInput}
            onChange={(e) => {
              this.userInputHandler(e, "emailInput");
            }}
          />
          <label className="form-label" htmlFor="password">
            {" "}
            Password{" "}
          </label>
          <input
            className="user-input-box"
            type="password"
            placeholder="enter your password"
            value={this.state.passwordInput}
            onChange={(e) => {
              this.userInputHandler(e, "passwordInput");
            }}
          />
          <button type="submit" className="form-btn">
            {" "}
            Sign Up{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
