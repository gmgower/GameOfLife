// s13 action creators
export const RANDOMIZE = 'RANDOMIZE';
export const randomize = () => ({ type: RANDOMIZE });

export const CLEAR = 'CLEAR';
export const clear = () => ({ type: CLEAR });

export const TOGGLE_PAUSED = 'TOGGLE_PAUSED';
export const togglePaused = () => ({ type: TOGGLE_PAUSED });

export const SET_TICK_DURATION = 'SET_TICK_DURATION';
export const setTickDuration = (tickDuration) => ({
  type: SET_TICK_DURATION,
  payload: tickDuration,
});

export const TICK = 'TICK';
export const tick = (manual = false) => ({ type: TICK, payload: { manual } });
