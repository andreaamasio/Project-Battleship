function Ship(size) {
  let damage = 0
  const hit = () => damage++
  const isSunk = () => damage >= size
  const occupiedPositions = new Set()
  return { size, hit, isSunk, occupiedPositions }
}
module.exports = Ship
