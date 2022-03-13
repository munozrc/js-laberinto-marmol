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
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        this.values = `alpha: ${e.alpha}, beta: ${e.beta}, gamma: ${e.gamma}`
        this.render()
      }, false)
    } else {
      console.log('Not supported')
    }
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
    <style>${GameComponent.styles}</style>
    <span>${this.values}</span>
    <main class="container">
      <board-component></board-component>
    </main>`
  }
}

window.customElements.define('game-component', GameComponent)
