let bombTile;
let currMoleTile;
let number;
let score = 0;
let gameOver = false;
let btnEl = document.getElementById('btn')
btnEl.addEventListener('click', refresh)
showHighscore()
if (!localStorage.highscore) {
    localStorage.highscore = 0
}


setGame()
function setGame() {
    // set up the grid for the game board in html
    for (let i=0; i<9; i++) {
        //<div></div>
        console.log("Lager diver")
        let tile = document.createElement("div")
        tile.id = String(i)
        tile.addEventListener('click', selectTile)
        document.getElementById('board').appendChild(tile)
    }

    setInterval(setMole, 1000) // 1 sekunde
    setInterval(setBomb, 2000) // 2 sekunder
}

function setMole() {
    if (gameOver) {
        return
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = ""
    }
    let mole = document.createElement('img');
    mole.src = "../../Media/Minigames/Whack-a-Mole/Mario-jumping1.png"

    number = getRandomTile()
    currMoleTile = document.getElementById(number)
    currMoleTile.appendChild(mole)

    if (bombTile && bombTile.id == number) {
        return
    }
}

function getRandomTile() {
    number = Math.floor(Math.random() * 9)
    return String(number)
}

function setBomb() {
    if(gameOver) {
        return
    }
    if(bombTile) {
        bombTile.innerHTML = ""
    }

    let bombEl = document.createElement('img')
    bombEl.src = "../../Media/Minigames/Whack-a-Mole/bomb.png"

    
    let number = getRandomTile()
    bombTile = document.getElementById(number)
    bombTile.appendChild(bombEl)

    if (currMoleTile && currMoleTile.id == number) {
        return
    }
}

function selectTile() {
    if (gameOver) {
        return
    }
    if (this == currMoleTile) {
        score+=1
        document.getElementById('score').innerHTML = `Dine poeng: ${score}`
    }
    else if (this == bombTile) {
        document.getElementById('score').innerHTML = `Du Tapte: ${score} poeng`
        gameOver = true
    }
    
    if (score>Number(localStorage.highscore)) {
        localStorage.highscore = score
        showHighscore()
    }
}

function showHighscore() {
    document.getElementById('highscore').innerHTML = `Din highscore: ${localStorage.highscore}`
}

function refresh() {
    location.reload()
}