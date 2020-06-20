import React from 'react';
// s7 import connect
import {connect} from 'react-redux';
import './App.css';
import World from './components/World/World';


function App() {

  // Grid to display cell
  return (
    <div className='App'>
      <header>Game of Life</header>
        <World />
      <div className='controls'>
        <button></button>
        <label htmlFor="">
          Tick Duration:{' '}
        </label>
        <button>Tick</button>
      </div>
      <div className='controls'>
        <button>Randomize</button>
        <button>Clear</button>
      </div>
      <div className='statusbar'>
        <span>Generation: </span>
        <span>Population: </span>
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
