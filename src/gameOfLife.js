// Create new random world
const newRandomWorld = (width, height, density = 0.2) => {
  // debugger;
  let world = [];
  // create row on index
  for (let row = 0; row < height; row++) {
    world[row] = [];
    // create col on row by index & random density on world
    for (let col = 0; col < width; col++) {
      world[row].push(Math.random() <= density);
    }
  }
  return world;
};

const newEmptyWorld = (width, height) => {
  let world = [];
  for (let row = 0; row < height; row++) {
    world[row] = [];
    for (let col = 0; col < width; col++) {
      world[row].push(false);
    }
  }
  return world;
};

const getCell = (world, row, col) => {
  if (row < 0 || col < 0 || row >= world.length || col >= world[row].length)
    return undefined;
  else return world[row][col];
};

const setCell = (world, row, col, alive = true) => {
  let newWorld = world.map((row) => row.slice());
  newWorld[row][col] = alive;
  return newWorld;
};

const toggleCell = (world, row, col) => {
  return setCell(world, row, col, !getCell(world, row, col));
};

const getNeighbors = (world, row, col) => {
  return [
    getCell(world, row - 1, col),
    getCell(world, row - 1, col + 1),
    getCell(world, row, col + 1),
    getCell(world, row + 1, col + 1),
    getCell(world, row + 1, col),
    getCell(world, row + 1, col - 1),
    getCell(world, row, col - 1),
    getCell(world, row - 1, col - 1),
  ];
};

const countAliveNeighbors = (world, row, col) => {
  return getNeighbors(world, row, col).filter((cell) => cell === true).length;
};

const tickCell = (world, row, col) => {
  let alive = getCell(world, row, col);
  let aliveNeighbors = countAliveNeighbors(world, row, col);

  // Death by underpopulation
  if (alive && aliveNeighbors < 2) return false;
  // Live On
  if (alive && (aliveNeighbors === 2 || aliveNeighbors === 3)) return true;
  // Death by overpopulation
  if (alive && aliveNeighbors > 3) return false;
  // Reproduciton
  if (!alive && aliveNeighbors === 3) return true;

  return alive; // Remain dead
};

const tick = (world) => {
  let nextGeneration = [];
  for (let row = 0; row < world.length; row++) {
    nextGeneration[row] = [];
    for (let col = 0; col < world[row].length; col++) {
      let nextGen = tickCell(world, row, col);
      nextGeneration[row].push(nextGen);
    }
  }
  return nextGeneration;
};

const getPopulation = (world) => {
  return world
    .map((row) => Number(row.filter((alive) => alive).length))
    .reduce((aliveOverall, aliveInRow) => aliveOverall + aliveInRow, 0);
};

export default {
  newRandomWorld,
  newEmptyWorld,
  tick,
  tickCell,
  countAliveNeighbors,
  getNeighbors,
  getCell,
  setCell,
  toggleCell,
  getPopulation,
};
