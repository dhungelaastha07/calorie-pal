import { Component } from "react";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          <h2 className="form-title"> Sign In </h2>
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
            Sign In{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
