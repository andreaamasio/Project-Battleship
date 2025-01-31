import Gameboard from "./gameboard.js"
function Player(name) {
  let gameboard = Gameboard(10)
  return { name, gameboard }
}
export default Player
