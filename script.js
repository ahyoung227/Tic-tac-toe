//Creating a gameboard
let Board = function() {
    const board = document.querySelectorAll(".area")
        return {
            allArea: board
        }
    }

//save gameboard
let nodeBoard = Board().allArea;
let gameBoard = Array.from(nodeBoard);

//create each player
let players = (name, marker) => {
    return {name, marker}
}

const player1 = players("player1", "o");
const player2 = players("player2", "x");

let winStates= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let info= document.querySelector('.game-info');

//place marker on the board
let player1turn = true;
let playerdiv= document.querySelector(".player")

for (let i = 0; i < gameBoard.length; i++) {
gameBoard[i].addEventListener('click', chooseArea, { once: true }) }

playerdiv.innerHTML = "It's player1's turn"
function chooseArea(event) {

    let currentMarker= player1turn ? player1.marker : player2.marker;
    if (player1turn) {
        event.target.innerHTML = currentMarker;
        playerdiv.innerHTML = "It's player2's turn"
        if (checkWin(currentMarker)) {
            endGame(player1)
        }
    } else {
        event.target.innerHTML = currentMarker;
        playerdiv.innerHTML = "It's player1's turn"
        if (checkWin(currentMarker)) {
            endGame(player2)

        }
    }
    
    if (checkDraw()) {
        info.classList.add('end-game')
        info.textContent = "It's draw!"
        document.getElementById('restart').style.display = "block"
        playerdiv.innerHTML = ""
    }
    takeTurn()
};

function takeTurn() {
    player1turn = !player1turn
}

function checkWin(marker) { 
    return winStates.some( winState => {
        return winState.every(index => {
            return gameBoard[index].textContent.includes(marker)
        })
    })
}

function checkDraw() {
    let boardContents= [];
    gameBoard.forEach( element => boardContents.push(element.textContent))
    return boardContents.every( boardContent => {
        return boardContent.includes(player1.marker) || boardContent.includes(player2.marker)
    })
}

function endGame(player) {
    info.classList.add('end-game')
    info.textContent = player.name + " wins!"
    document.getElementById('restart').style.display = "block"
    for (let i = 0; i < gameBoard.length; i++) { 
        gameBoard[i].removeEventListener('click', chooseArea)
    }
    playerdiv.innerHTML = ""
}

function restart() {
    document.getElementById('restart').style.display = "none"
    info.classList.remove('end-game')
    info.textContent = ""

    for (i= 0; i< gameBoard.length; i++) {
        gameBoard[i].textContent =""; }

    player1turn = true;

    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i].addEventListener('click', chooseArea, { once: true })
    }

    playerdiv.innerHTML = "It's player1's turn"
}

//Challenge
    // computer-random move
    // minimax algorithm
    // learn event target