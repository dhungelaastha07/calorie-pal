import { Component } from "react";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
    };
    this.userInputHandler = this.userInputHandler.bind(this);
    this.validateFieldEmpty = this.validateFieldEmpty.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  userInputHandler(e, stateName) {
    this.props.formStateModifier(stateName, { value: e.target.value });
  }

  validateFieldEmpty(inputState) {
    if (inputState.value === "") {
      this.props.formStateModifier(inputState.name, { hasError: true });
      return false;
    } else {
      this.props.formStateModifier(inputState.name, { hasError: false });
      return true;
    }
  }

  submitHandler(e) {
    e.preventDefault();
    const validationArray = this.props.formFields.map((item) => {
      return this.validateFieldEmpty(item);
    });

    if (validationArray.every((item) => item === true)) {
      const formData = this.props.formFields.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {});

      this.props.submitHandler(formData);
      this.setState({
        errorMsg: "",
      });
    } else {
      this.setState({
        errorMsg: "Please fix all the errors before submitting",
      });
    }
  }

  render() {
    const inputJSX = this.props.formFields.map((item, i) => {
      return (
        <div key={i}>
          <label className="form-label"> {item.label} </label>
          <input
            className="user-input-box"
            name={item.name}
            type={item.type}
            placeholder={item.placeholder}
            value={item.value}
            onChange={(e) => {
              this.userInputHandler(e, item.name);
            }}
          />
          {item.hasError && (
            <p className="error-message">{item.errorMessage} </p>
          )}
          {item.name === "email" && item.existErrorMsg && (
            <p className="error-message">{item.existErrorMsg} </p>
          )}
          {(item.name === "email" || item.name === "password") &&
            item.invalidMsg && (
              <p className="error-message">{item.invalidMsg} </p>
            )}
        </div>
      );
    });
    return (
      <div className="form-parent-container">
        <form onSubmit={this.submitHandler} className="form-container">
          <h2 className="form-title"> {this.props.title} </h2>
          {inputJSX}
          <button type="submit" className="form-btn">
            {this.props.buttonText}
          </button>
          <p className="error-message">{this.state.errorMsg}</p>
        </form>
      </div>
    );
  }
}

export default FormContainer;
