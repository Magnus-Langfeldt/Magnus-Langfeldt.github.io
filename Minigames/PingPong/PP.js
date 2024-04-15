// bakgrunn kode
let background = document.getElementById('bakgrunn')
let backgroundWidth = 500;
let backgroundHeight = 500;
let context = background.getContext("2d") // Trengs for å tegne på bakgrunnen

// spillere kode
let playerWidth = 10;
let playerHeight = 50;
let playerMovementY = 0;

let player1 = {
    x : 10,
    y : backgroundHeight/2,
    width : playerWidth,
    height : playerHeight,
    MovementY : playerMovementY
}
let player2 = {
    x : backgroundWidth-playerWidth-10,
    y : backgroundHeight/2,
    width : playerWidth,
    height : playerHeight,
    MovementY : playerMovementY
}
//Ballen som spilles
let ballWidth = 15
let ballHeight = 15
let ball = {
    x : backgroundWidth/2,
    y : backgroundHeight/2,
    width : ballWidth,
    height : ballHeight,
    MovementX : 3,
    MovementY : 6
}

let player1Score = 0;
let player2Score = 0;

window.onload = function () {
    background.height = backgroundHeight
    background.width = backgroundWidth

    // tegner spiller 1
    context.fillStyle = "skyblue"
    context.fillRect(player1.x, player1.y, player1.width, player1.height)

    requestAnimationFrame(update)
    document.addEventListener('keyup', movePlayer)
}

function update() {
    requestAnimationFrame(update)
    context.clearRect(0, 0, background.width, background.height)

    // spiller 1
    context.fillStyle = "white"
    /* player1.y +=player1.MovementY */
    let nextPlayer1Y = player1.y + player1.MovementY
    if(!outsideOfBorders(nextPlayer1Y)) {
        player1.y = nextPlayer1Y
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height)

    // spiller 2
    /* player2.y += player2.MovementY */
    let nextPlayer2Y = player2.y + player2.MovementY
    if (!outsideOfBorders(nextPlayer2Y)) {
        player2.y = nextPlayer2Y
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height)

    // ballen
    context.filStyle = "white"
    ball.x += ball.MovementX
    ball.y += ball.MovementY
    context.fillRect(ball.x, ball.y, ball.width, ball.height)

    // Hvis ballen treffer toppen eller bunnen, skal den reflekteres slik at den beveger seg langs x-aksen med samme hastighet, men den skal gå like fort, men i motsatt retning langs y-aksen. Så vi ganger med -1 for å bytte fortegn. 
    if (ball.y <= 0 || ball.y + ball.height >= backgroundHeight) {
        ball.MovementY = ball.MovementY * -1
    }

    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            ball.MovementX = ball.MovementX * -1 //endrer ballen sin retning langs x-aksen, men beholder farten.
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) {
            ball.MovementX = ball.MovementX * -1
        }
    }

    // Spillet avsluttes og fordeler poeng
    if (ball.x < 0) {
        player2Score ++
        gameOver(1)
    }
    else if (ball.x + ballWidth > backgroundWidth) {
        player1Score ++
        gameOver(-1)
    }

    // Tegner opp poengene
    context.font = "45px sans-serif"
    context.fillText(player1Score, backgroundWidth/5, 45)
    context.fillText(player2Score, backgroundWidth * 4/5 - 45, 45)

    // nettet i midten (for pynt)
    for (let i=10; i<background.height; i+=25) {
        context.fillRect(background.width/2 - 10, i, 5, 5)
    }
}

function outsideOfBorders(yAxisPosition) {
return (yAxisPosition < 0 || yAxisPosition + playerHeight > backgroundHeight)
}

function movePlayer(e) {
    // Spiller 1
    if (e.code == "KeyW") {
        player1.MovementY = -3
    }
    else if (e.code == "KeyS") {
        player1.MovementY = 3
    }

    // Spiller 2
    if (e.code == "KeyK") {
        player2.MovementY = -3
    }
    else if (e.code == "KeyM") {
        player2.MovementY = 3
    }
}

function detectCollision (a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}

function gameOver (ballDirection) {
    ball = {
        x : backgroundWidth/2,
        y : backgroundHeight/2,
        width : ballWidth,
        height : ballHeight,
        MovementX : ballDirection,
        MovementY : 2
    }
}