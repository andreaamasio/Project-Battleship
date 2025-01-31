import Player from "./player"
test("player name", () => {
  const player1 = Player("mario")

  expect(player1.name).toBe("mario")
})
