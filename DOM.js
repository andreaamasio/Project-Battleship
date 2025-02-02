import Player from "./player.js"
import Gameboard from "./gameboard.js"
import Ship from "./ship.js"

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
  if (checkGameOver(opponentGameboard)) return // Stop clicks after game ends

  display.textContent = `Player attacks (${row}, ${col})`
  let message = opponentGameboard.receiveAttack([row, col])
  displayDOMplayer.textContent = message
  renderBoard(opponentGameboard.board, opponentBoardDOM, true)

  if (checkGameOver(opponentGameboard)) {
    setTimeout(() => alert("You win!"), 500)
    return
  }

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
  console.log(gameboard.ships.map((ship) => ship.isSunk())) // Debugging
  return gameboard.ships.every((ship) => ship.isSunk())
}
const buttonPlaceShip = document.querySelector("#place")
const inputCoordinatesRow = document.querySelector("#row-coordinates")
const inputCoordinatesCol = document.querySelector("#col-coordinates")
const labelOrientation = document.querySelector("#orientation")
const switchButton = document.querySelector("#switch")

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
let fleetIndex = 0
let shipCount = 0 // Tracks how many ships of current type have been placed

function placeShip() {
  if (fleetIndex >= playerGameboard.fleet.length) {
    display.textContent = "All ships placed! Click on Opponent Board"
    return
  }

  let currentShipType = playerGameboard.fleet[fleetIndex]

  // Get user input for coordinates
  let coordinates = [
    Number(inputCoordinatesRow.value) - 1,
    Number(inputCoordinatesCol.value) - 1,
  ]
  let orientation = getOrientation()

  let shipObject = Ship(currentShipType.size)
  let placed = playerGameboard.place(shipObject, coordinates, orientation)

  if (placed) {
    shipCount++ // Track how many of this type have been placed

    if (shipCount >= currentShipType.quantity) {
      fleetIndex++ // Move to next type when all of this type are placed
      shipCount = 0 // Reset ship count for new type
    }
    display.textContent = "Ship placed!"
    renderBoard(playerGameboard.board, playerBoardDOM)
  } else {
    display.textContent = "Invalid placement, try again!"
  }
}
buttonPlaceShip.addEventListener("click", placeShip)
// Render initial boards
renderBoard(playerGameboard.board, playerBoardDOM)
renderBoard(opponentGameboard.board, opponentBoardDOM, true)
