const Ship = require("./ship")

function Gameboard(size) {
  const board = Array.from({ length: size }, () => Array(size).fill(null))
  const ships = []
  const missedHits = []
  const place = (ship, coordinates, orientationPlacement = "horizontal") => {
    let row = coordinates[0]
    let col = coordinates[1]

    if (orientationPlacement === "horizontal") {
      if (ship.size + col > 10) {
        return console.log("not possible to place ship here")
      }
      for (let i = 0; i < ship.size; i++) {
        board[row][col + i] = "S"
        ship.occupiedPositions.add(`${row},${col + i}`)
      }
    } else if (orientationPlacement === "vertical") {
      if (ship.size + row > 10) {
        return console.log("not possible to place ship here")
      }
      for (let i = 0; i < ship.size; i++) {
        board[row + i][col] = "S"
        ship.occupiedPositions.add(`${row + i},${col}`)
      }
    }
    ships.push(ship)

    console.log(ship.occupiedPositions)
  }
  //null in the array mean nothing is there
  //S in the array will mean that a ship is there
  //H in the array mean a hit part of ship is there
  //M is a missed hit
  const receiveAttack = (coordinates) => {
    let row = coordinates[0]
    let col = coordinates[1]
    if (row < 0 || row >= 10 || col < 0 || col >= 10) {
      return console.log("you are firing outside the field battle, try again")
    }
    if (board[row][col] === "S") {
      let hitShip = ships.find((ship) =>
        ship.occupiedPositions.has(coordinates.toString())
      )
      console.log(`my hitShip:${hitShip}`)
      hitShip.hit()
      board[row][col] = "H"
      return
    } else if (board[row][col] === "H") {
      return console.log("a ship was already hit here")
    } else if (board[row][col] === "M") {
      return console.log("you already tried to hit here")
    } else {
      board[row][col] = "M"
      missedHits.push(coordinates)
      return console.log("you miss")
    }
  }

  return { board, ships, place, receiveAttack, missedHits }
}
module.exports = Gameboard
let gameboard = Gameboard(10)
let poorShip = Ship(2)
gameboard.place(poorShip, [0, 0])

gameboard.receiveAttack([0, 0])
gameboard.receiveAttack([5, 1])
gameboard.receiveAttack([0, 2])
gameboard.receiveAttack([0, 2])
gameboard.receiveAttack([5, 4])
gameboard.receiveAttack([7, 3])
gameboard.receiveAttack([0, 10])

console.table(gameboard.board)
console.log(gameboard.missedHits)
