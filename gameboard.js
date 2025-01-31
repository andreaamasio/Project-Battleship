import Ship from "./ship.js"

function Gameboard(size) {
  const board = Array.from({ length: size }, () => Array(size).fill(null))
  const ships = []
  const missedHits = []

  const place = (ship, coordinates, orientationPlacement = "horizontal") => {
    let row = coordinates[0]
    let col = coordinates[1]

    // Check if the ship goes out of bounds
    if (
      (orientationPlacement === "horizontal" && col + ship.size > size) ||
      (orientationPlacement === "vertical" && row + ship.size > size)
    ) {
      return false // Out of bounds
    }

    // Check if the area is already occupied
    for (let i = 0; i < ship.size; i++) {
      let checkRow = orientationPlacement === "horizontal" ? row : row + i
      let checkCol = orientationPlacement === "horizontal" ? col + i : col
      if (board[checkRow][checkCol] !== null) {
        return false // Space is occupied, can't place here
      }
    }

    // Place the ship
    for (let i = 0; i < ship.size; i++) {
      let shipRow = orientationPlacement === "horizontal" ? row : row + i
      let shipCol = orientationPlacement === "horizontal" ? col + i : col
      board[shipRow][shipCol] = "S"
      ship.occupiedPositions.add(`${shipRow},${shipCol}`)
    }

    ships.push(ship)
    return true
  }

  const receiveAttack = (coordinates) => {
    let row = coordinates[0]
    let col = coordinates[1]

    if (row < 0 || row >= size || col < 0 || col >= size) {
      return console.log("You are firing outside the battlefield, try again.")
    }

    if (board[row][col] === "S") {
      let hitShip = ships.find((ship) =>
        ship.occupiedPositions.has(`${row},${col}`)
      )
      if (hitShip) {
        hitShip.hit()
        board[row][col] = "H"
        console.log("Hit!")
      }
    } else if (board[row][col] === "H") {
      console.log("A ship was already hit here.")
    } else if (board[row][col] === "M") {
      console.log("You already tried to hit here.")
    } else {
      board[row][col] = "M"
      missedHits.push(coordinates)
      console.log("You miss.")
    }
  }

  const generateRandomCoordinates = () => [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ]

  const generateShipsAndPlace = () => {
    let fleet = [
      { name: "carrier", quantity: 1, size: 5 },
      { name: "battleship", quantity: 2, size: 4 },
      { name: "destroyer", quantity: 3, size: 3 },
      { name: "submarine", quantity: 4, size: 3 },
      { name: "patrolBoat", quantity: 5, size: 2 },
    ]

    fleet.forEach((shipType) => {
      for (let i = 0; i < shipType.quantity; i++) {
        let placed = false
        let newShip = Ship(shipType.size)
        while (!placed) {
          let coordinates = generateRandomCoordinates()
          let orientationPlacement =
            Math.random() > 0.5 ? "horizontal" : "vertical"
          placed = place(newShip, coordinates, orientationPlacement)
        }
      }
    })
  }

  return {
    board,
    ships,
    place,
    receiveAttack,
    missedHits,
    generateShipsAndPlace,
  }
}

export default Gameboard
