import { Component } from "react";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  getProperTime(time) {
    const dateObj = time ? new Date(time) : new Date();
    return `${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`;
  }

  render() {
    const daysArray = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const today = new Date();
    const textDay = daysArray[today.getDay()]; //gices me sunday..momday
    const todaysCal = this.props.userGoal
      ? parseInt(this.props.userGoal[textDay])
      : 0;

    const todaysProperTime = this.getProperTime();

    const filteredCalActivity = this.props.calorieActivity.filter((item) => {
      const calActtivityProperTime = this.getProperTime(item.time);
      return calActtivityProperTime === todaysProperTime;
    });
    const todaysTotalCal = filteredCalActivity.reduce((acc, curr) => {
      acc = acc + curr.calorie;
      return acc;
    }, 0);
    const remainingCal = todaysCal - todaysTotalCal;

    return (
      <div className="remaining-cal">
        <p class="curr-date"> {new Date().toDateString()}</p>
        <h1
          class="cal-count"
          style={{ color: remainingCal > 0 ? "green" : "red" }}
        >
          {remainingCal}{" "}
          <span> calorie {remainingCal > 0 ? "remaining" : "excess"}</span>
        </h1>
        <p className="goal"> Goal : {todaysCal} calorie</p>
      </div>
    );
  }
}

export default Summary;
