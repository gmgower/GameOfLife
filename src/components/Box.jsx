import React from "react";

class Box extends React.Component {
  //we are using selectBox from our state only now we are entering the current row / current col
  //because there is nothing to pass in to this.props if its
  //inside the render method                             / |
  selectBox = () => {
    // |
    this.props.selectBox(this.props.row, this.props.col); //<-|
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

export default Box;