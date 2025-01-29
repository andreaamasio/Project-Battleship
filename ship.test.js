const Ship = require("./ship")

let ship = Ship()

test("ship size", () => {
  const ship = Ship(2)

  expect(ship.size).toBe(2)
})
