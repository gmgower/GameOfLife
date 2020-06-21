import {
    RANDOMIZE,
} from '../actions/index'

import Game from '../gameOfLife';

// World Grid
const WORLD_WIDTH = 64;
const WORLD_HEIGHT = 40;



// s3 build initialState
const initialState = {
    world: Game.newRandomWorld(WORLD_WIDTH, WORLD_HEIGHT),
}

// s4 build rootReducer
const rootReducer = (state = initialState, action) => {
    if (action.type === RANDOMIZE)
        return {
            ...state,
            world: Game.newRandomWorld(WORLD_WIDTH, WORLD_HEIGHT),
        }

    return state
}

export default rootReducer;