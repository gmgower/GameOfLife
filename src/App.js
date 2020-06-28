import React from 'react';
import Buttons from './components/Buttons';
import Grid from './components/Grid';
import './App.css';

const operations = [
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
    //Setting the state which is the inital data it holds , with the first generation begining at zero and the gridFull key is assigned to the value of both
    // Arrays by first filling the rows with all the elements inside of the array this.cols which will first begin with nothing
    this.state = {
      generation: 0,
      // this is what the full grid is gonna be like we are creating an array that is as big as the rows variable and we are going to fill that with a map where
      // we are gonna create another array which is as big as the cols variable and each element in that array is false this is ceating a 30 x 50 grid which is
      // a two dimentional array and every element is set to false every grid cell is turned off to begin with
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }
  // when we originally create the 2D array every box is set to false when we use
  // selectBox we want to change it to true
  // add the row and col as variables
  // we begin by making a copy of the array using a helper method arrayClone so as to not update the state directly
  // find the box that was clicked and change it to the opposite of what it was
  // then use set state command to update the state
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  };

  // creating a copy of 2d array , then being iterated  and changing random boxes to true
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
    clearInterval(this.intervalId);
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
    this.speed= 400;
    this.playButton();
  }
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

  //create a play function that will be the game logic .
  // use two variables the original state of the grid and then the second variable be a clone of the grid.
  // loop through the entire grid using a double for loop.
  // compute the number of neighbors a cell has by setting a variable to 0 to keep track of how many neighbors a cell has and what to do with those
  //results.
  //Use the array of operations to use as new indexs to write less repetative code
  // Create two new variables as new index counters that will be used to update the number of neighbors each cell has.
  //write an if statement to make sure we are not out of bounds when checking the number of neighbor a cell has then updating our count variable
  // to show how many neighbors a cell has
  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        operations.forEach(([x, y]) => {
          const newI = i + x;
          const newK = j + y;
          if (newI >= 0 && newI < this.rows && newK >= 0 && newK < this.cols) {
            count += g[newI][newK];
          }
        }); //create a condition to check if cells are alive then change the next state of the grid depending on how many neighbors
        //the cell has
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }

    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1,
    });
  };

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
        <div className='info-container'>
          <details className='info-details'>
            <summary>Rules of Game</summary>
            <div>
              
                <p>This is a no player game (NPC). The rules are as follows:</p>
                <p>
                  <li>
                    Any live cell with two or three live neighbors survives.
                  </li>
                  <li>
                    Any dead cell with three live neighbors becomes a live cell.
                  </li>
                  <li>
                    All other live cells die in the next generation. Similarly,
                    all other dead cells stay dead..
                  </li>
                </p>
                <a
                  href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
                 
                >
                  Conway's Game of Life (Wikipedia)
                </a>
              
            </div>
          </details>
        </div>
        <div className='info-container'>
          <details>
            <summary>About the Game</summary>
            <p>
              <li className="li-info">
                "The game is a zero-player game, meaning that its evolution is
                determined by its initial state, requiring no further input. One
                interacts with the Game of Life by creating an initial
                configuration and observing how it evolves. It is Turing
                complete and can simulate a universal constructor or any other
                Turing machine. Simply click on the grid to set initial state
                and click play!"
              </li>
            </p>
          </details>
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
