import React from 'react';
import Cell from '../Cell/Cell';
import './Row.css';

class Row extends React.Component {
    render = () => {
        return <div className='Row'>
            <Cell />
        </div>
    }
}

export default Row;