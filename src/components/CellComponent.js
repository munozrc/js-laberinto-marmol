class CellComponent extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles () {
    return /* css */`
      :host {
        padding: 7px;
        transition: opacity 0.3s ease-out 0s;
      }

      .cell {
        width: 100%;
        height: 100%;
        display: inline-block;
        background-color: #D82148;
        border-radius: 50%;
      }
    `
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CellComponent.styles}</style>
    <span class="cell"></span>`
  }
}

window.customElements.define('cell-component', CellComponent)
