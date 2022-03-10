export const getRandomColor = () => {
  let color = '#'
  for (let i = 0; i < 6; i += 1) {
    color += Math.floor(Math.random() * 10)
  }
  return color
}
