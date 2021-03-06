import confetti from 'canvas-confetti'
import boards from './boards.js'
import './styles.css'

const boardElement = document.querySelector('.board__container')
const levelElement = document.querySelector('.level')

let x = 0
let y = 0
let lastExecution = 0
let level = 0
let board = boards[level]
let statusGame = ''

window.addEventListener('devicemotion', (event) => {
  // Limit reading time
  const now = Date.now()
  if (now - lastExecution < 85 || statusGame === 'WIN') return
  lastExecution = now

  // reset previous cell
  board[x][y] = ''

  const directions = { x: 0, y: 0 }
  const { accelerationIncludingGravity: acceleration } = event

  if (acceleration.x < -1) directions.y = 1
  else if (acceleration.x > 1) directions.y = -1
  else if (acceleration.y < -1) directions.x = -1
  else if (acceleration.y > 1) directions.x = 1

  const posX = x + directions.x
  const posY = y + directions.y
  const currentCell = board[posX][posY]

  // Collide if the next cell is an obstacle
  if (currentCell === 'O') return

  // Load new level
  if (currentCell === 'T' && level < 3) loadBoard()

  // Do not change position if out of bounds
  if (posX < 8 && posX >= 0) x = posX
  if (posY < 8 && posY >= 0) y = posY

  // Set new position
  board[x][y] = 'B'

  // Render new board
  loadCellElements()
}, true)

const loadBoard = () => {
  // Check level size
  if (level >= boards.length - 1) {
    statusGame = 'WIN'
    confetti()
    return
  }

  level++
  levelElement.textContent = level
  board = boards[level]

  // Set new player position
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; i++) {
      if (board[i][j] === 'B') {
        x = i
        y = j
      }
    }
  }

  // Render new board
  loadCellElements()
}

const loadCellElements = () => {
  boardElement.innerHTML = `
    ${board.flat(2).map((value) => (
      `<li class="cell ${value === 'B' ? 'ball' : ''} ${value === 'T' ? 'target' : ''} ${value === 'O' ? 'obstacle' : ''}"></li>`
    )).join('')}
  `
}

// Start game
levelElement.textContent = level
loadCellElements()
