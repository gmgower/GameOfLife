import React, { useState } from 'react';
// s7 import connect
import {connect} from 'react-redux';
import './App.css';
// import Board from './components/board.js';

const numRows = 25;
const numCols = 25;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  console.log(grid);

  // Grid to display cell
  return (
    <div className='App'>
      <header>Game of Life</header>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
        >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? 'red' : undefined,
                border: 'solid 1px black'
              }}
            ></div>
          ))
        )}
        {/* <Board /> */}
      </div>
    </div>
  );
}

//s11 define mapSTP
const mapStateToProps = (state) => ({
  
})

//s12 define mapDTP
const mapDispatchToProps = (dispatch) => ({

});

// s8 wrap app component with connect inside second call from 1st call. Pass mapSTP and mapDTP
export default connect(mapStateToProps, mapDispatchToProps)(App);
