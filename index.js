////////// QUERY SELECTORS //////////
const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start-btn")
const endBtn = document.querySelector("#end-btn")
const score = document.querySelector("score")


////////// INITIALISE GRID //////////
const gridWidth = 10;
let tiles = []
createGrid()


////////// SNAKE STARTING CONDITION //////////
let currentSnake = [2,1,0] // starts snake in top-left
let direction = 1; // starts snake moving right
let interval = 800 // timer in ms


////////// BUTTONS //////////
startBtn.addEventListener("click", function() {
    eraseGrid()
    renderSnake()
    gameStart()
})

endBtn.addEventListener("click", function() {
    gameEnd()
    eraseGrid()
})


////////// GRID FUNCTIONS //////////
function createGrid() {
    for (let i = 0; i < gridWidth*gridWidth; i++) {
        const tile = document.createElement("div")
        //add class ".tile" to individual tile
        tile.classList.add("tile")
        // add "tile" div inside "grid" div
        grid.appendChild(tile)
        //push tile to "tiles" array
        tiles.push(tile)
    }
}

function eraseGrid() {
    Array.from(document.querySelectorAll(".tile")).forEach((el) => el.classList.remove("snake")) 
}


////////// SNAKE FUNCTIONS AND CONTROLS //////////
document.addEventListener("keyup", control)

function renderSnake() {
    currentSnake = [2,1,0]
    // add "snake" class style to each index of the "tiles" array
    currentSnake.forEach(i => tiles[i].classList.add("snake"))
    direction = 1;
}

function move() {
    if ( // check if snake will hit walls or itself
        (currentSnake[0] + gridWidth >= 100 && direction === gridWidth)  // snake hits bottom wall
        || (currentSnake[0] % 10 === 9 && direction === 1) // snake hits right wall
        || (currentSnake[0] % 10 === 0 && direction === -1) // snake hits left wall
        || (currentSnake[0] - gridWidth <=0 && direction === -gridWidth) // snake hits top wall
        || (tiles[currentSnake[0] + direction].classList.contains("snake")) // snake eats itself
        ) {
            // if hit, game over
            console.log(currentSnake)
            gameOver()
        } 

        else { 
            const tail = currentSnake.pop()
            //pass "tail" through "tiles" array, remove the "snake" class styling
            tiles[tail].classList.remove("snake")

            const head = currentSnake.unshift(currentSnake[0] + direction)
            tiles[currentSnake[0]].classList.add("snake")
        }
}

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


////////// GAME STATES //////////
function gameStart() {
    timerId = setInterval(move, interval)
    startBtn.style.display = "none";
    endBtn.style.display = "inline";
}

function gameEnd() {
    clearInterval(timerId);
    endBtn.style.display = "none";
    startBtn.style.display = "inline";
}

function gameOver() {
    console.log("game over")
    gameEnd()
}