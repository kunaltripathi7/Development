import React from "react";
export class Counter extends React.Component {
  constructor(props) {
    super(props); // just boiler to initalise parent
    this.state = { count: 5 };
    this.handleDecrement = this.handleDecrement.bind(this); // binding this to curr obj -> in js this is defined on how func is called not how it is defined.
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });
  }

  handleIncrement() {
    this.setState((curState) => {
      return { count: curState.count + 1 };
    });
  }

  // handleIncrement = () => { // automatically binds this to lexical scope
  //   this.setState((curState) => {
  //     return { count: curState.count + 1 };
  //   });
  // }

  render() {
    const date = new Date("june 21 2027"); // not much logic is allowed here
    date.setDate(date.getDate() + this.state.count);

    return (
      // can't use arrow func. cuz don't have this keyw.
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}
