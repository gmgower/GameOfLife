import React from 'react';
import './Cell.css';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    console.log('Cell', props)

    // this.state = {};
  }

  render = () => {
    return <div className={'Cell ' + (this.props.alive ? 'alive' : 'dead')}></div>;
  };
}

export default Cell;
