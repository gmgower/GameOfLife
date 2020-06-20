import React from 'react';
import './Cell.css';

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render = () => {
    return <div className='Cell'></div>;
  };
}

export default Cell;
