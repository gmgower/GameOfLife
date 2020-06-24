import React from 'react';
// s7 import connect
import { connect } from 'react-redux';
import './App.css';
import World from './components/World/World';
import Game from './gameOfLife';
import { randomize, clear, togglePaused, setTickDuration, tick } from './actions/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleTickDurationInputChange = this.handleTickDurationInputChange.bind(
      this
    );    
  }

  handleTickDurationInputChange = (event) => {
    let newTickDuration = Number(event.target.value);
    this.props.setTickDuration(newTickDuration);
  };

  render = () => {
    // Grid to display cell
    return (
      <div className='App'>
        <header>Game of Life</header>
        <div className='controls'>
          <button onClick={this.props.togglePaused}>
            {this.props.paused ? 'Resume' : 'Pause'}
          </button>
          <label>Tick Duration: {' '}
            <input
              type='number'
              step='100'
              min='100'
              value={this.props.tickDuration}
              onChange={this.handleTickDurationInputChange}
            >
            </input>

          </label>
          <button onClick={this.props.tick(true)}>Tick</button>
        </div>
        <div className='controls'>
          <button onClick={this.props.randomize}>Randomize</button>
          <button onClick={this.props.clear}>Clear</button>
        </div>
        <World></World>
        <div className='statusbar'>
          <span>Generation: {this.props.generation}</span>
          <span>Population: {Game.getPopulation(this.props.world)}</span>
        </div>
      </div>
    );
  };
}

//s11 define mapSTP
const mapStateToProps = (state) => ({
  world: state.world,
  paused: state.paused,
  tickDuration: state.tickDuration,
  generation: state.generation
});

//s12 define mapDTP
const mapDispatchToProps = (dispatch) => ({
  randomize: () => dispatch(randomize()),
  clear: () => dispatch(clear()),
  togglePaused: () => dispatch(togglePaused()),
  setTickDuration: (tickDuration) => dispatch(setTickDuration(tickDuration)),
  tick: (manual) => () => dispatch(tick(manual))
});

// s8 wrap app component with connect inside second call from 1st call. Pass mapSTP and mapDTP
export default connect(mapStateToProps, mapDispatchToProps)(App);
