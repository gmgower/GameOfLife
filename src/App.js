import React from 'react';
// s7 import connect
import { connect } from 'react-redux';
import './App.css';

class App extends React.Component {


  render = () => {
    // Grid to display cell
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
              <button type='button'>
                Start
              </button>
              <button type='button'>
                Stop
              </button>
              <button>
                Next
              </button>
              <button type='button'>
                Clear
              </button>
              <button type='button'>
                Reset
              </button>
            </div>
            <div className='World'>
              <h3>Generation: 0</h3>
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
