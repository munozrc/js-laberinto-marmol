import './styles.css'

const boardElement = document.querySelector('.board__container')

let x = 0
let y = 0
let lastExecution = 0
const velocity = 55

const board = [
  ['B', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', 'T', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', 'T', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', 'T', '', '', '', '', '', 'T']
]

window.addEventListener('deviceorientation', (event) => {
  // Limit reading time
  const now = Date.now()
  if (now - lastExecution < velocity) return true
  lastExecution = now

  // reset previous cell
  board[x][y] = ''

  const directions = { x: 0, y: 0 }

  if (event.gamma < -5) directions.y = -1
  else if (event.gamma > 5) directions.y = 1
  else if (event.beta < -5) directions.x = -1
  else if (event.beta > 5) directions.x = 1

  const posX = x + directions.x
  const posY = y + directions.y
  const currentCell = board[posX][posY]

  // Collide if the next cell is an obstacle
  if (currentCell === 'O') return

  // Do not change position if out of bounds
  if (posX < 8 && posX >= 0) x = posX
  if (posY < 8 && posY >= 0) y = posY

  // Set new position
  board[x][y] = 'B'

  // Render new board
  loadCellElements()
}, true)

const loadCellElements = () => {
  boardElement.innerHTML = `
    ${board.flat(2).map((value) => (
      `<li class="cell ${value === 'B' ? 'ball' : ''} ${value === 'T' ? 'target' : ''} ${value === 'O' ? 'obstacle' : ''}"></li>`
    )).join('')}
  `
}

loadCellElements()
