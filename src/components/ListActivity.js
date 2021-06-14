import { Component } from "react";

class ListActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const tableCalorieDisplay = this.props.calorieActivity
      .sort((a, b) => {
        return b.time - a.time;
      })
      .map((item) => {
        return (
          <tr>
            <td> {item.food} </td>
            <td> {item.calorie} </td>

            <td> {new Date(item.time).toDateString()} </td>
          </tr>
        );
      });
    return (
      <div className="table-container">
        <h1 className="table-title"> Track your activities </h1>
        <p className="table-para">
          {" "}
          Track your calories history and keep up to date with your intake. Feel
          free to add more calories using above form.
        </p>

        <div>
          <table className="cal-table">
            <tr>
              <th> Food </th>
              <th> Calorie </th>
              <th> Date </th>
            </tr>
            {tableCalorieDisplay}
          </table>
        </div>
      </div>
    );
  }
}

export default ListActivity;
