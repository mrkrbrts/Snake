////////// QUERY SELECTORS //////////
const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start-btn")
const endBtn = document.querySelector("#end-btn")
const scoreDisplay = document.querySelector("#score")
let score = 0;


////////// INITIALISE GRID //////////
const gridWidth = 10;
let tiles = []
createGrid()


////////// SNAKE STARTING CONDITION //////////
let currentSnake = [2,1,0] // starts snake in top-left
let direction = 1; // starts snake moving right
let interval = 800 // timer in ms
let pelletIndex = 0 // set pellets


////////// BUTTONS //////////
startBtn.addEventListener("click", function() {
    eraseGrid()
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
    Array.from(document.querySelectorAll(".tile")).forEach((el) => el.classList.remove("snake","pellet")) 
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
        currentSnake.shift()
        console.log(currentSnake)
        gameOver()
    }
     
  
    // move the snake
    const tail = currentSnake.pop() // remove last element from currentSnake array
    tiles[tail].classList.remove("snake") // remove the "snake" class styling from tail
    const head = currentSnake.unshift(currentSnake[0] + direction) // add tile to currentSnake array in direction it's heading
    tiles[currentSnake[0]].classList.add("snake") // add styling to new tile where head will be


        

    if (tiles[currentSnake[0]].classList.contains("pellet")) {
        tiles[currentSnake[0]].classList.remove("pellet") //remove the class of apple       
        tiles[tail].classList.add("snake") //grow our snake by adding class of snake to it
        currentSnake.push(tail) //grow our snake array
        generatePellet() //generate a new apple      
        addScore(1) //add one to the score    
        //speed up our snake

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

////////// SCORING //////////
function randomNumber() {
    return Math.floor((Math.random() * (gridWidth*gridWidth)))
}

function generatePellet() {
    do {
        pelletIndex = randomNumber()
    } while (tiles[pelletIndex].classList.contains("snake"))
    tiles[pelletIndex].classList.add("pellet")
}

function checkStartPellet() {
    if (tiles[0].classList.contains("pellet") || tiles[1].classList.contains("pellet") || tiles[2].classList.contains("pellet") || tiles[3].classList.contains("pellet")) {
        document.querySelector(".pellet").classList.remove("pellet")
        generatePellet()
        checkStartPellet()
    }
}

function addScore(num) {
    score += num;
    scoreDisplay.innerHTML = score;
}

function resetScore() {
    score = 0;
    scoreDisplay.innerHTML = score
}


////////// GAME STATES //////////
function gameStart() {
    resetScore()
    generatePellet()
    checkStartPellet()
    renderSnake()
    interval = 800;
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