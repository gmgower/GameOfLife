// s13 action creators
export const TOGGLE_CELL = 'TOGGLE_CELL';
export const toggleCell = (row, col) => ({
    type: TOGGLE_CELL,
    payload: {row, col},
})