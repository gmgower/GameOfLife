import React from 'react';
import './Cell.css';
import {connect} from 'react-redux';
import { toggleCell } from '../../actions/index';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    console.log('Cell', props)

    // this.state = {};
    this.handleClickCell = this.handleClickCell.bind(this);
  }

  handleClickCell = () =>{
    this.props.toggleCell(this.props.row, this.props.col);
  }

  render = () => {
    return <div className={'Cell ' + (this.props.alive ? 'alive' : 'dead')} onClick={this.handleClickCell}></div>;
  };
}

const mapDispatchToProps = dispatch => ({
  toggleCell: (row, col) => dispatch(toggleCell(row, col))
})


export default connect(null, mapDispatchToProps)(Cell);
