import { Component } from "react";
import FormContainer from "./FormContainer.js";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formFields: [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          errorMsg: "Please fix the error",
          hasError: false,
          placeholder: "enter your first name",
          value: "",
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          errorMsg: "Please fix the error",
          hasError: false,
          placeholder: "enter your last name",
          value: "",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          errorMsg: "Please fix the error",
          existErrorMsg: "",
          hasError: false,
          placeholder: "enter your email",
          value: "",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          errorMsg: "Please fix the error",
          hasError: false,
          placeholder: "enter your password",
          value: "",
        },
      ],
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.formStateModifier = this.formStateModifier.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  formStateModifier(name, update) {
    const foundIndex = this.state.formFields.findIndex((item) => {
      return item.name === name;
    });

    if (foundIndex >= 0) {
      this.setState((state) => {
        const formFieldsCopy = [...state.formFields];
        formFieldsCopy[foundIndex] = {
          ...formFieldsCopy[foundIndex],
          ...update,
        };
        return {
          formFields: formFieldsCopy,
        };
      });
    }
  }

  resetForm() {
    this.state.formFields.forEach((item) => {
      this.formStateModifier(item.name, { value: "" });
    });
  }

  submitHandler(formData) {
    axios
      .post("http://127.0.0.1:8080/create-user", formData)
      .then((res) => {
        this.resetForm();
        this.props.updateFormDisplay("signin");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response && err.response.data.message === "EXISTING_USER") {
          this.formStateModifier("email", {
            existErrorMsg: "Account already exist for the email",
          });
        } else {
          console.log(err);
          this.formStateModifier("email", {
            existErrorMsg: "",
          });
        }
      });
  }

  render() {
    return (
      <FormContainer
        formFields={this.state.formFields}
        title="Sign Up"
        buttonText="Sign Up"
        formStateModifier={this.formStateModifier}
        submitHandler={this.submitHandler}
      />
    );
  }
}

export default SignUp;
