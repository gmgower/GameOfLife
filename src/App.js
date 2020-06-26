import React from 'react';
// s7 import connect
import { connect } from 'react-redux';
import './App.css';

// Size of board
const totalWorldRows = 25;
const totalWorldColumns = 25;

// The function's parameter defaults to less than 40% chance of being alive
const newWorldStatus = (cellStatus = () => Math.random() < 0.4) => {
  const grid = [];
  // The number of arrays within the main array will match the number of rows
  for (let row = 0; row < totalWorldRows; row++) {
    grid[row] = [];
    // the number of values within each of these arrays will match the number of columns
    for (let column = 0; column < totalWorldColumns; column++) {
      // Each boolean value will represent that state of each cell: 'alive' or 'dead'
      grid[row][column] = cellStatus();
    }
  }
  return grid;
};

// Func that receives that state of the whole board status and toggle method
const WorldGrid = ({ worldStatus, onToggleCellStatus }) => {
  // Method that allows users to toggle the status of individual cells as props
  const handleClick = (row, column) => onToggleCellStatus(row, column);

  // Each cell is represented by a table's <td> tag
  const tr = [];
  for (let row = 0; row < totalWorldRows; row++) {
    const td = [];
    for (let column = 0; column < totalWorldColumns; column++) {
      // Clicking on cell call method being called with the cell's row and column location as arguments
      td.push(
        <td
          key={`${row}, ${column}`}
          // className attr whose value is dependent on the boolean value of the corresponding board cell
          className={worldStatus[row][column] ? 'alive' : 'dead'}
          onClick={() => handleClick(row, column)}
        />
      );
    }
    tr.push(<tr key={row}>{td}</tr>);
  }
  return (
    <table>
      <tbody>{tr}</tbody>
    </table>
  );
};

class App extends React.Component {
  state = {
    // When game starts, the world's cells status will be return by the func that generates a new board status
    worldStatus: newWorldStatus(),

  };

  handleClearWorld = () => {
    this.setState({
      worldStatus: newWorldStatus(() => false)
    })
  }

  render = () => {
    const { worldStatus } = this.state;

    return (
      <div className='App'>
        <h1>Game of Life</h1>
        <div>
          <span className='speedometer'>
            <h3>Game Speed</h3>
          </span>
        </div>
        <div className='container'>
          <div>
            <div>
              <button type='button'>Start</button>
              <button type='button'>Stop</button>
              <button>Next</button>
              <button type='button' onClick={this.handleClearWorld}>Clear</button>
              <button type='button'>Reset</button>
            </div>
            <div className='World'>
              <h3>Generation: 0</h3>
              <WorldGrid  worldStatus={worldStatus}/>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

// //s11 define mapSTP
// const mapStateToProps = (state) => ({
//   world: state.world,
//   paused: state.paused,
//   tickDuration: state.tickDuration,
//   generation: state.generation,
// });

// //s12 define mapDTP
// const mapDispatchToProps = (dispatch) => ({
//   randomize: () => dispatch(randomize()),
//   clear: () => dispatch(clear()),
//   togglePaused: () => dispatch(togglePaused()),
//   setTickDuration: (tickDuration) => dispatch(setTickDuration(tickDuration)),
//   tick: (manual) => () => dispatch(tick(manual)),
// });

// // s8 wrap app component with connect inside second call from 1st call. Pass mapSTP and mapDTP
// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
