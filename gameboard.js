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
      }
    } else if (orientationPlacement === "vertical") {
      if (ship.size + row > 10) {
        return console.log("not possible to place ship here")
      }
      for (let i = 0; i < ship.size; i++) {
        board[row + i][col] = "S"
      }
    }
  }

  const receiveAttack = () => {
    return null
  }

  return { board, place, receiveAttack }
}
module.exports = Gameboard
let gameboard = Gameboard(10)
gameboard.place(Ship(2), [9, 9])

console.table(gameboard.board)
