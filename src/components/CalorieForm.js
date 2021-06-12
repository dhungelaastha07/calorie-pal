import axios from "axios";
import { Component } from "react";
import FormContainer from "./FormContainer.js";

class CalorieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: [
        {
          name: "food",
          label: "Food",
          type: "text",
          errorMessage: "Please fix the error",
          hasError: false,
          placeholder: "enter the names of the food",
          value: "",
        },
        {
          name: "calorie",
          label: "Calorie",
          type: "number",
          errorMessage: "Please fix the error",
          hasError: false,
          placeholder: "enter your calorie intake",
          value: "",
        },
      ],
    };

    this.formStateModifier = this.formStateModifier.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.state.formFields.forEach((item) => {
      this.formStateModifier(item.name, { value: "" });
    });
  }

  submitHandler(formData) {
    axios
      .post("http://127.0.0.1:8080/add-cal", formData)
      .then((res) => {
        this.props.updateCalorieActivity(res.data);
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
      <div className="goalform-parent-container">
        <FormContainer
          formFields={this.state.formFields}
          title="Add Calories"
          buttonText="Submit"
          formStateModifier={this.formStateModifier}
          submitHandler={this.submitHandler}
        />
      </div>
    );
  }
}

export default CalorieForm;
