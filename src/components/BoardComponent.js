import './CellComponent.js'

class BoardComponent extends window.HTMLElement {
  constructor () {
    super()
    this.cells = [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '']
    ]
    this.directions = { x: 0, y: 0 }
    this.x = 0
    this.y = 0

    this.attachShadow({ mode: 'open' })
    this.cells[this.x][this.y] = 'ball'
  }

  static get styles () {
    return /* css */`
      .grid {
        display: grid;
        grid-template-columns: repeat(8, 34px);
        grid-template-rows: repeat(8, 34px);
        background-color: #141414;
        border-radius: 20px;
        overflow: hidden;
        padding: 16px;
      }

      .ball {
        opacity: 1;
      }
    `
  }

  connectedCallback () {
    if (!window.DeviceOrientationEvent) return console.log('Not support')
    window.addEventListener('deviceorientation', (event) => {
      this.cells[this.x][this.y] = ''
      this.directions = { x: 0, y: 0 }

      if (event.gamma < -10) this.directions.y = -1
      else if (event.gamma > 10) this.directions.y = 1

      if (event.beta < -10) this.directions.x = -1
      else if (event.beta > 10) this.directions.x = 1

      const posX = this.x + this.directions.x
      const posY = this.y + this.directions.y

      if (posY < 8 && posY >= 0) this.y = posY
      if (posX < 8 && posX >= 0) this.x = posX

      this.cells[this.x][this.y] = 'ball'

      console.log({ direction: this.directions })
      this.render()
    }, true)
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BoardComponent.styles}</style>
    <span>${JSON.stringify(this.directions)} / x = ${this.x} - y = ${this.y}</span>
    <div class="grid">
      ${this.cells.flat(2).map((value) =>
        `<cell-component ${value === 'ball' ? 'class="ball"' : ''}></cell-component>`
      ).join('')}
      
    </div>`
  }
}

window.customElements.define('board-component', BoardComponent)
