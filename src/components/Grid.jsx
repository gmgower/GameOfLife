import React from 'react';
import Box from './Box'

class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14;
    console.log('Grid', this.props)
    let rowsArr = [];
    let boxClass = '';
    //for loop since we are looping through a nested array
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + '_' + j;
        //if the current box is true or false
        boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off';
        //pushing the box component that will contain all the information previously created into our rowsArr
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxid={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }
    return (
      <div className='grid' style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}


export default Grid;