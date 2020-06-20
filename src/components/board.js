import React, {useState} from 'react';

const numRows = 25;
const numCols = 25;

const Board = (props) => {
    
        const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }
        return rows;
    });

    console.log(grid)
    
    }

export default Board;



/*
const numRows = 25;
// const numCols = 25;

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
        {/* <Board /> */
      {/* </div> */}
    {/* </div> */}
//   );
// }

// */