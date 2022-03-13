import './CellComponent.js'

const cells = new Array(64).fill('')

cells[0] = 'ball'

class BoardComponent extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles () {
    return /* css */`
      .grid {
        display: grid;
        grid-template-columns: repeat(8, 36px);
        grid-template-rows: repeat(8, 36px);
        gap: 4px;
        background-color: #141414;
        border-radius: 20px;
        overflow: hidden;
        padding: 16px;
      }

      .disable {
        opacity: 0.2;
      }
    `
  }

  connectedCallback () {
    this.render()
    console.log(cells)
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BoardComponent.styles}</style>
    <div class="grid">
      ${cells.map((value) => (
        `<cell-component ${value !== 'ball' ? 'class="disable"' : ''}></cell-component>`
      )).join('')}
      
    </div>`
  }
}

window.customElements.define('board-component', BoardComponent)
