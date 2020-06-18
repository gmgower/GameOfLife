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