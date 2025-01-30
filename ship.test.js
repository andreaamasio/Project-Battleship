const Ship = require("./ship")

let ship = Ship()

test("ship size", () => {
  const ship = Ship(2)

  expect(ship.size).toBe(2)
  ship.hit()
  ship.hit()
  expect(ship.isSunk()).toBe(true)
})
test("ship isSunk method", () => {
  const ship = Ship(4)

  ship.hit()
  ship.hit()
  ship.hit()
  ship.hit()
  expect(ship.isSunk()).toBe(true)
})
