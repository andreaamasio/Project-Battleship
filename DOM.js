import Player from "./player.js"
import Gameboard from "./gameboard.js"

const playerGameboard = Gameboard(10)
const opponentGameboard = Gameboard(10)

//playerGameboard.generateShipsAndPlace()
opponentGameboard.generateShipsAndPlace()

const playerBoardDOM = document.querySelector("#playerBoard")
const opponentBoardDOM = document.querySelector("#opponentBoard")
const display = document.querySelector("#display")
const displayDOMplayer = document.querySelector(".player")
const displayDOMopponent = document.querySelector(".opponent")

function renderBoard(board, element, isOpponent = false) {
  element.innerHTML = ""
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("div")
      cell.classList.add("cell")

      if (board[row][col] === "S" && !isOpponent) {
        cell.classList.add("ship")
      } else if (board[row][col] === "H") {
        cell.classList.add("hit")
      } else if (board[row][col] === "M") {
        cell.classList.add("miss")
      }

      if (isOpponent) {
        cell.addEventListener("click", () => handleAttack(row, col))
      }

      element.appendChild(cell)
    }
  }
}
function handleAttack(row, col) {
  display.textContent = `Player attacks (${row}, ${col})`
  let message = opponentGameboard.receiveAttack([row, col])
  displayDOMplayer.textContent = message
  renderBoard(opponentGameboard.board, opponentBoardDOM, true)

  // Check for game over condition
  if (checkGameOver(opponentGameboard)) {
    alert("You win!")
    return
  }

  // Let opponent attack after player
  setTimeout(receiveAttackFromOpponent, 1000)
}

// Handle opponent attacking player
function receiveAttackFromOpponent() {
  let validMove = false
  while (!validMove) {
    let [row, col] = playerGameboard.generateRandomCoordinates()
    if (
      playerGameboard.board[row][col] !== "H" &&
      playerGameboard.board[row][col] !== "M"
    ) {
      display.textContent = `Opponent attacks (${row}, ${col})`
      let message = playerGameboard.receiveAttack([row, col])
      displayDOMopponent.textContent = message
      validMove = true
    }
  }
  renderBoard(playerGameboard.board, playerBoardDOM)

  // Check for game over condition
  if (checkGameOver(playerGameboard)) {
    alert("Computer wins!")
  }
}

// Check if all ships are sunk
function checkGameOver(gameboard) {
  return gameboard.ships.every((ship) => ship.isSunk())
}
const buttonPlaceShip = document.querySelector("#place")
const inputCoordinates = document.querySelector("#coordinates")
const labelOrientation = document.querySelector("#orientation")
const switchButton = document.querySelector("#switch")
function getCoordinates() {
  let coordinates = inputCoordinates.value
  return coordinates
}

function getOrientation() {
  let orientation = labelOrientation.textContent
  return orientation
}
function switchOrientation() {
  if (labelOrientation.textContent === "horizontal") {
    labelOrientation.textContent = "vertical"
  } else {
    labelOrientation.textContent = "horizontal"
  }
}
switchButton.addEventListener("click", switchOrientation)
function placeShip(playerGameboard) {
  let fleet = [...playerGameboard.fleet]
  let newShip = fleet.pop()
  for (let i = 0; i < newShip.quantity; i++) {
    let placed = false
    while (!placed) {
      placed = playerGameboard.place(newShip.size, getCoordinates())
    }
  }
}
// Render initial boards
renderBoard(playerGameboard.board, playerBoardDOM)
renderBoard(opponentGameboard.board, opponentBoardDOM, true)
