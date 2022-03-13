class BoardComponent extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles () {
    return /* css */`
      .grid {
        display: grid;
        grid-template-columns: repeat(8, 46px);
        grid-template-rows: repeat(8, 46px);
        gap: 20px;
        margin: 30px;
        background-color: #141414;
        border-radius: 20px;
        overflow: hidden;
      }
      
      .cell {
        background-color: red;
      }

    `
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BoardComponent.styles}</style>
    <div class="grid">
      <cell-component class="cell"></cell-component>
    </div>`
  }
}

window.customElements.define('board-component', BoardComponent)
