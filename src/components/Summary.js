import { Component } from "react";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let sum = 0;
    this.props.calorieActivity.forEach((item) => {
      sum = item.calorie + sum;
    });

    // const totalCal = this.props.calorieActivity.reduce((acc, curr) => {
    //   acc = curr.calorie + acc;
    //   return acc;
    // }, 0);

    console.log(sum);
    return (
      <div className="remaining-cal">
        <h1>980 cal</h1>
        <p> remaining</p>
      </div>
    );
  }
}

export default Summary;
