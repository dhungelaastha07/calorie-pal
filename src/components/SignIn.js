import { Component } from "react";
import FormContainer from "./FormContainer";
import axios from "axios";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: [
        {
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "enter your email here",
          hasError: false,
          errorMessage: "Please fix the error",
          invalidMsg: "",
          value: "",
        },
        {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "enter your password here",
          hasError: false,
          errorMessage: "Please fix the error",
          invalidMsg: "",
          value: "",
        },
      ],
    };

    this.formStateModifier = this.formStateModifier.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  formStateModifier(name, update) {
    const foundIndex = this.state.formFields.findIndex((item) => {
      return item.name === name;
    });
    if (foundIndex >= 0) {
      this.setState((state) => {
        const formfieldsCopy = [...state.formFields];
        formfieldsCopy[foundIndex] = {
          ...formfieldsCopy[foundIndex],
          ...update,
        };
        return {
          formFields: formfieldsCopy,
        };
      });
    }
  }

  setAxiosAuthorization(token) {
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  submitHandler(formData) {
    axios
      .post("http://127.0.0.1:8080/login", formData)
      .then((res) => {
        if (res.data.message === "AUTHENTICATED") {
          this.setAxiosAuthorization(res.data.token);
          localStorage.setItem("token", res.data.token);
          this.props.updateLoggedInUser(res.data.userData);
          this.props.redirect("/dashboard");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.message === "INVALID_EMAIL") {
          this.formStateModifier("email", {
            invalidMsg: "Invalid Email",
          });
        } else if (
          err.response &&
          err.response.data.message === "INVALID_PASSWORD"
        ) {
          this.formStateModifier("password", {
            invalidMsg: "Invalid Password",
          });
        } else {
          console.log(err);
          this.formStateModifier("email", {
            invalidMsg: "",
          });
          this.formStateModifier("password", {
            invalidMsg: "",
          });
        }
      });
  }

  render() {
    return (
      <FormContainer
        formFields={this.state.formFields}
        title="Sign In"
        buttonText="Sign In"
        formStateModifier={this.formStateModifier}
        submitHandler={this.submitHandler}
      />
    );
  }
}

export default SignIn;
