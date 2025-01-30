const Gameboard = require("./gameboard")
const Ship = require("./ship")
//null in the array mean nothing is there
//S in the array will mean that a ship is there
//H in the array mean a hit part of ship is there
//M is a missed hit
test("gameboard place ship in gameboard", () => {
  let gameboard = Gameboard(10)
  gameboard.place(Ship(2), [0, 0])
  expect(gameboard.board[0][0]).toBe("S")
  expect(gameboard.board[0][1]).toBe("S")
})
test("ship added to array", () => {
  let gameboard = Gameboard(10)
  let newShip = Ship(2)
  gameboard.place(newShip, [0, 0])
  expect(gameboard.ships).toContain(newShip)
})

// test("gameboard receive attack", () => {
//   let gameboard = Gameboard()
//   gameboard.place(Ship(2), [0][0], "horizontal")
//   gameboard.receiveAttack([0][0])
//   expect(gameboard.board[0][0]).toBe("H")
// })
