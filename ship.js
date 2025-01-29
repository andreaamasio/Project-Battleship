function Ship(size) {
  let damage = 0
  const hit = () => damage++
  const isSunk = () => (damage >= size ? true : false)

  return { size, hit, isSunk }
}
module.exports = Ship
