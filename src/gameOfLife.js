
// Create new random world
const newRandomWorld = (width, height, density = .1) => {
    // debugger;
    let world = []
    // create row on index
    for (let row = 0; row < height; row++) {
        world[row] = [];
        // create col on row by index & random density on world
        for (let col = 0; col < width; col++) {
            world[row].push(Math.random() <= density);
        }
    }
    return world;
}

export default {
    newRandomWorld,  
}