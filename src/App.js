import React from 'react';
import './App.css';

// Size of world
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

// Func that receives that state of the whole world status and toggle method
const WorldGrid = ({ worldStatus, onToggleCell }) => {
  // Method that allows users to toggle the status of individual cells as props
  const handleClick = (row, column) => onToggleCell(row, column);

  // Each cell is represented by a table's <td> tag
  const tr = [];
  for (let row = 0; row < totalWorldRows; row++) {
    const td = [];
    for (let column = 0; column < totalWorldColumns; column++) {
      // Clicking on cell call method being called with the cell's row and column location as arguments
      td.push(
        <td
          key={`${row}, ${column}`}
          // className attr whose value is dependent on the boolean value of the corresponding world cell
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

// Function component that creates a slider to change the speed of iterations
const Slider = ({ speed, onSpeedChange }) => {
  const handleChange = (e) => onSpeedChange(e.target.value);

  return (
    <input
      type='range'
      min='0'
      max='1000'
      step='50'
      // current speed state
      value={speed}
      // method to handle the speed change as props
      onChange={handleChange}
    />
  );
};

class App extends React.Component {
  state = {
    // When game starts, the world's cells status will be return by the func that generates a new world status
    worldStatus: newWorldStatus(),
    // World runs
    isWorldRunning: false,
    // Default Speed
    speed: 300,
  };

  // Clears the world, sets the state for all cells to false
  handleClearWorld = () => {
    this.setState({
      worldStatus: newWorldStatus(() => false),
    });
  };

  // clears the world and the status of each cell to a random boolean value by default
  handleNewWorld = () => {
    this.setState({
      worldStatus: newWorldStatus(),
    });
  };

  // Handles world's speed
  handleSpeedChange = (newSpeed) => {
    this.setState({ speed: newSpeed });
  };

  // Handles starting the game
  handleStart = () => {
    this.setState({ isWorldRunning: true });
  };

  // Handles stopping the game
  handleStop = () => {
    this.setState({ isWorldRunning: false });
  };

  // Handles the games progress, gets called on when making the next move
  handleStep = () => {
    const nextStep = (prevState) => {
      const worldStatus = prevState.worldStatus;
      const clonedWorldStatus = JSON.parse(JSON.stringify(worldStatus));

      // eight possible neighbors
      const amountTrueNeighbors = (row, column) => {
        const neighbors = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
          [1, 0],
          [1, -1],
          [0, -1],
        ];
        // reduce neighbors, return new array of neighbors
        return neighbors.reduce((trueNeighbors, neighbor) => {
          const x = row + neighbor[0];
          const y = column + neighbor[1];
          // Calculates the amount of neighbors within the world with value true for an individual cell
          const isNeighborOnWorld =
            x >= 0 && x < totalWorldRows && y >= 0 && y < totalWorldColumns;
          // No need to count more than 4 alive neighbors
          if (trueNeighbors < 4 && isNeighborOnWorld && worldStatus[x][y]) {
            return trueNeighbors + 1;
          } else {
            return trueNeighbors;
          }
        }, 0);
      };

      // Updates the cloned world’s individual cell status and returns the cloned world status
      for (let row = 0; row < totalWorldRows; row++) {
        for (let column = 0; column < totalWorldColumns; column++) {
          const totalTrueNeighbors = amountTrueNeighbors(row, column);
          if (!worldStatus[row][column]) {
            if (totalTrueNeighbors === 3) clonedWorldStatus[row][column] = true;
          } else {
            if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3)
              clonedWorldStatus[row][column] = false;
          }
        }
      }

      return clonedWorldStatus;
    };

    // Sets the updated cloned world status to state
    this.setState((prevState) => ({
      worldStatus: nextStep(prevState),
    }));
  };

  // Method to handle player requests to toggle individual cell status
  handleToggleCell = (row, column) => {
    // Sets the states of the world status by calling a function and passing it the previous state as argument
    const toggleWorld = (prevState) => {
      // Deep clones the previous world’s status to avoid modifying it by reference when updating an individual cell
      const clonedWorldStatus = JSON.parse(
        JSON.stringify(prevState.worldStatus)
      );
      // Updates an individual cell
      clonedWorldStatus[row][column] = !clonedWorldStatus[row][column];
      // returns the updated cloned world status, effectively updating the status of the world
      return clonedWorldStatus;
    };

    // Calls toggleWorld
    this.setState((prevState) => ({
      worldStatus: toggleWorld(prevState),
    }));
  };

  // Stop or set a timer depending on different combinations of values
  componentDidUpdate(prevProps, prevState) {
    const { isWorldRunning, speed } = this.state;
    const speedChanged = prevState.speed !== speed;
    const gameStarted = !prevState.isWorldRunning && isWorldRunning;
    const gameStopped = prevState.isWorldRunning && !isWorldRunning;

    // Stops or starts timer
    if ((isWorldRunning && speedChanged) || gameStopped) {
      clearInterval(this.timerID);
    }

    // The timer schedules a call to the handleStep method at the specified speed intervals
    if ((isWorldRunning && speedChanged) || gameStarted) {
      this.timerID = setInterval(() => {
        this.handleStep();
      }, speed);
    }
  }

  render() {
    const { worldStatus, isWorldRunning, speed } = this.state;

    return (
      <div className='App'>
        <h1>Game of Life</h1>
        <div>
          <span className='speedometer'>
            <h3>Game Speed</h3>
            {'Max '}
            <Slider speed={speed} onSpeedChange={this.handleSpeedChange} />
            {'Min '}
          </span>
        </div>
        <div className='container'>
          <div>
            <div>
              <button type='button' onClick={this.handleStart}>
                Start
              </button>
              <button type='button' onClick={this.handleStop}>
                Stop
              </button>
              <button
                type='button'
                disabled={isWorldRunning}
                onClick={this.handleStep}
              >
                Next
              </button>
              <button type='button' onClick={this.handleClearWorld}>
                Clear
              </button>
              <button type='button' onClick={this.handleNewWorld}>
                Reset
              </button>
            </div>
            <div className='World'>
              <h3>Generation: 0</h3>
              <WorldGrid 
              worldStatus={worldStatus}
              onToggleCell={this.handleToggleCell} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
