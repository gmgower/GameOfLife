import {
  RANDOMIZE,
  CLEAR,
  TOGGLE_PAUSED,
  SET_TICK_DURATION,
  TICK,
  TOGGLE_CELL,
} from '../actions/index';

import Game from '../gameOfLife';
import store from '../store/index';
import { tick } from '../actions/index';

// World Grid
const WORLD_WIDTH = 25;
const WORLD_HEIGHT = 25;

// s3 build initialState
const initialState = {
  world: Game.newRandomWorld(WORLD_WIDTH, WORLD_HEIGHT),
  paused: false,
  tickDuration: 500,
  generation: 0,
};

initialState.tickInterval = setInterval(
  () => store.dispatch(tick()),
  initialState.tickDuration
);

// s4 build rootReducer
const rootReducer = (state = initialState, action) => {
  if (action.type === RANDOMIZE)
    return {
      ...state,
      world: Game.newRandomWorld(WORLD_WIDTH, WORLD_HEIGHT),
      generation: 0
    };

  if (action.type === CLEAR)
    return {
      ...state,
      world: Game.newEmptyWorld(WORLD_WIDTH, WORLD_HEIGHT),
      generation: 0,
      paused: true
    };

  if (action.type === TOGGLE_PAUSED)
    return {
      ...state,
      paused: !state.paused,
    };

  if (action.type === SET_TICK_DURATION) {
    clearInterval(state.tickInterval);
    return {
      ...state,
      tickDuration: action.payload,
      tickInterval: setInterval(() => store.dispatch(tick()), action.payload),
    };
  }

  if (action.type === TICK) {
    if (!state.paused || action.payload.manual) {
      return {
        ...state,
        world: Game.tick(state.world),
        generation: state.generation + 1,
      };
    } else {
      return state;
    }
  }

  if (action.type === TOGGLE_CELL)
    return {
      ...state,
      world: Game.toggleCell(
        state.world,
        action.payload.row,
        action.payload.col
      ),
    };
  return state;
};

export default rootReducer;
