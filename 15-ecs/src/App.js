const App = () => {
  const svg = document.querySelector('#svg-canvas')
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('cx', '250')
  circle.setAttribute('cy', '400')
  circle.setAttribute('r', '100')
  circle.setAttribute('stroke', 'black')
  circle.setAttribute('stroke-width', '3')
  circle.setAttribute('fill', 'red')
  console.log(circle)
  svg.appendChild(circle)
}

export default App
