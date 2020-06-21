import React from 'react';
import Cell from '../Cell/Cell';
import './Row.css';

class Row extends React.Component {
    render = () => {
        return (
          <div className='Row'>
            {this.props.cells.map((alive, index) => (
              <Cell
                key={this.props.row + 'x' + index}
                alive={alive} // true || false
                row={this.props.row}
                col={index}
              ></Cell>
            ))}
          </div>
        );
    }
}

export default Row;