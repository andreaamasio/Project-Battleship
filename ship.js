function Ship(size) {
  let damage = 0
  const hit = () => damage++
  const isSunk = () => (damage >= size ? true : false)
  const occupiedPositions = new Set()
  return { size, hit, isSunk, occupiedPositions }
}
module.exports = Ship
