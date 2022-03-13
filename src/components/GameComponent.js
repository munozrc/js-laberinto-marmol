import './BoardComponent.js'

class GameComponent extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles () {
    return /* css */`
      :host {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: #EFEFEF;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    `
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
    <style>${GameComponent.styles}</style>
    <main class="container">
      <board-component></board-component>
    </main>`
  }
}

window.customElements.define('game-component', GameComponent)
