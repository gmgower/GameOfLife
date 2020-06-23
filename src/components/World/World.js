import React from 'react';
import { connect } from 'react-redux';
import Row from '../Row/Row';
import './World.css';
import {tick} from '../../actions/index'

class World extends React.Component {
  render = () => {
    return (
      <div className='World'>
        {this.props.world.map((row, index) => (
          <Row key={index} row={index} cells={row}></Row>
        ))}    
      </div>
    );
  };
}

const mapStateToProps = (state) => ({...state });

const mapDispatchToProps = (dispatch) => ({
  tick: () => dispatch(
    tick()
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(World);


