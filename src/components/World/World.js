import React from 'react';
import { connect } from 'react-redux';
import Row from '../Row/Row';
import './World.css';

class World extends React.Component {
  render = () => {
    return (
      <div className='World'>
        {this.props.world.map((row, index) => (
          <Row key={index} row={index} cells={row}></Row>
        ))}
        {/* <Row /> */}
      </div>
    );
  };
}

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(World);

// export default World;
