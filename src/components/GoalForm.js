import axios from "axios";
import { Component } from "react";
import FormContainer from "./FormContainer.js";
import "./GoalForm.css";
import NavBar from "./NavBar.js";

class GoalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: [
        {
          name: "monday",
          label: "Monday",
          type: "number",
          errorMessage: "Please fix the error",
          hasError: false,
          value: "",
        },
        {
          name: "tuesday",
          label: "Tuesday",
          type: "number",
          errorMessage: "Please fix the error",
          hasError: false,
          value: "",
        },
        {
          name: "wednesday",
          label: "Wednesday",
          type: "number",
          errorMessage: "Please fix the error",
          hasError: false,
          value: "",
        },
        {
          name: "thursday",
          label: "Thursday",
          type: "number",
          errorMessage: "Please fix the error",
          hasError: false,
          value: "",
        },
        {
          name: "friday",
          label: "Friday",
          type: "number",
          errorMessage: "Please fix the error",
          hasError: false,
          value: "",
        },
        {
          name: "saturday",
          label: "Saturday",
          type: "number",
          errorMessage: "Please fix the error",
          hasError: false,
          value: "",
        },
        {
          name: "sunday",
          label: "Sunday",
          type: "number",
          errorMessage: "Please fix the error",
          hasError: false,
          value: "",
        },
      ],
    };
    this.formStateModifier = this.formStateModifier.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    if (!this.props.loggedInUser) {
      console.log("here");
      this.props.history.push("/");
    }
  }

  resetForm() {
    this.state.formFields.forEach((item) => {
      this.formStateModifier(item.name, { value: "" });
    });
  }

  submitHandler(formData) {
    axios
      .post("http://127.0.0.1:8080/set-goal", formData)
      .then((res) => {
        this.props.updateLoggedInUser({
          ...this.props.loggedInUser,
          goal: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.resetForm();
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

  render() {
    return (
      <div className="goal-page">
        <NavBar
          history={this.props.history}
          loggedInUser={this.props.loggedInUser}
          updateLoggedInUser={this.props.updateLoggedInUser}
        />

        <div className="goalform-parent-container">
          <FormContainer
            formFields={this.state.formFields}
            title="Set Your Weekly Goals"
            buttonText="Submit"
            formStateModifier={this.formStateModifier}
            submitHandler={this.submitHandler}
          />
        </div>
      </div>
    );
  }
}

export default GoalForm;
