const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start-btn")
const score = document.querySelector("score")

let gridWidth = 10;
let tiles = []
let currentSnake = [2,1,0]

let direction = 1;

function createGrid() {
    for (let i = 0; i < 100; i++) {
        const tile = document.createElement("div")
        //add class ".tile" to individual tile
        tile.classList.add("tile")
        // add "tile" div inside "grid" div
        grid.appendChild(tile)
        //push tile to "tiles" array
        tiles.push(tile)
    }
}

createGrid()

// add "snake" class style to each index of the "tiles" array
currentSnake.forEach(i => tiles[i].classList.add("snake"))

function move() {
    const tail = currentSnake.pop()
    //pass "tail" through "tiles" array, remove the "snake" class styling
    tiles[tail].classList.remove("snake")

    const head = currentSnake.unshift(currentSnake[0] + direction)
    tiles[currentSnake[0]].classList.add("snake")

    console.log(currentSnake)
}

document.addEventListener("keyup", control)

function control(e) {
    switch (event.key) {
        case "Down" :
        case "ArrowDown" : 
            console.log("down arrow pressed")
            direction =+gridWidth;
            break;
        case "Up" :
        case "ArrowUp" : 
            console.log("up arrow pressed")
            direction =-gridWidth
            break;
        case "Left" :
        case "ArrowLeft" : 
            console.log("left arrow pressed");
            direction = -1; 
            break;
        case "Right" :
        case "ArrowRight" : 
            console.log("right arrow pressed")
            direction = 1;
            break;
        default:
            return
    }
}



startBtn.addEventListener("click", function() {
    console.log("button is clicked")
})


// let timerId = setInterval(move, 1000)

// startBtn.addEventListener("click", clearInterval(timerId))
