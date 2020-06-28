import React from 'react';
import Buttons from './components/Buttons';
import Grid from './components/Grid';
import './App.css';

// check neighbors
const neighbors = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

class App extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    //Setup state, generation initialValue is zero and the gridFull key is assigned to the value of both rows and cols
    this.state = {
      generation: 0,
      /* 
      Setup arrays by first filling the rows with all the elements inside of the array this.cols which will first begin with nothing. T
      This will fill grid creating an array that is as big as the rows variable and we are going to fill that with a map where we are gonna create another array which is as big as the cols variable and each element in that array is false
      This is creating a 30 x 50 grid which is a two dimensional array and every element is set to false every grid cell is turned off to begin with
      */
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }
  // Every box in the original 2D array is set to false
  // Use selectBox to change each box to true add the row and col
  // as variables
  // Make a copy of the array using the helper method arrayClone. So as to not update the state directly.
  // Find the box that was clicked and change it to the opposite of what it was then use set state command to update the state
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  };

  // seed button: Creating a copy of 2d array , then being iterating & changing random boxes to true
  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };

  playButton = () => {
    // stop start over
    clearInterval(this.intervalId);
    // setInterval call play func at this speed
    this.intervalId = setInterval(this.play, this.speed);
  };
  pauseButton = () => {
    clearInterval(this.intervalId);
  };
  slow = () => {
    this.speed = 1000;
    this.playButton();
  };

  medium = () => {
    this.speed = 400;
    this.playButton();
  };
  fast = () => {
    this.speed = 100;
    this.playButton();
  };

  clear = () => {
    let grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0,
    });
  };
  gridSize = (size) => {
    switch (size) {
      case '1':
        this.cols = 20;
        this.rows = 10;
        break;
      case '2':
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
    }
    this.clear();
  };

  // declare play func: the game logic .
  play = () => {
    // Use two variables the original state of the grid and then the second variable be a clone of the grid.
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);
    // loop through the entire grid using a nested for loop.
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Calculate the number of neighbors a cell has by setting a variable to 0 to keep track of how many neighbors a cell has and what to do with those results.
        let count = 0;
        // Use the array of neighbors to use as new indexes
        neighbors.forEach(([x, y]) => {
          // Create two new variables as new index counters that will be used to update the number of neighbors each cell has.
          const newI = i + x;
          const newK = j + y;
          //write an if statement to make sure we are not out of bounds when checking the number of neighbor a cell has then updating our count variable to show how many neighbors a cell has
          if (newI >= 0 && newI < this.rows && newK >= 0 && newK < this.cols) {
            count += g[newI][newK];
          }
        });
        //Setup a condition to check if cells are alive then change the next state of the grid depending on how many neighbors the cell has
        // less than 2 or more than 3 dies
        //  if it's dead & three neighbors it's a live cell
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }

    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1,
    });
  };

  // Grid runs when component is loaded(mounted)
  componentDidMount() {
    this.seed();
    this.playButton();
  }

  render() {
    return (
      <div>
        <h1>The Game of Life </h1>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          medium={this.medium}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <div>
          <h2>Rules of Game</h2>
          <div className='info-container'>
            <p>This is a no player game (NPC). The rules are as follows:</p>
            <p>
              <li>Any live cell with two or three live neighbors survives.</li>
              <li>
                Any dead cell with three live neighbors becomes a live cell.
              </li>
              <li>
                All other live cells die in the next generation. <br></br>
              </li>
              <li>Similarly, all other dead cells stay dead..</li>
            </p>
            <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>
              Conway's Game of Life (Wikipedia)
            </a>
          </div>
        </div>
          <h2>About the Game</h2>        
        <div className='info-container'>
            <p>
              <li className='li-info'>
                "The game is a zero-player game, meaning that its It is
                evolution is determined by its initial state, requiring no
                further input. One interacts with the Game of Life by creating
                creating an initial configuration and observing how it evolves.
                It isTuring complete and can simulate a universal constructor or
                any other Turing machine. Simply click on the grid to set
                initial state and click play!"
              </li>
            </p>
     
        </div>
      </div>
    );
  }
}

//creating a clone of the arrays inside of the arrays , Deep clone
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;

