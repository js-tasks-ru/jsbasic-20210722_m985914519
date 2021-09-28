import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    this.firstLoad = true;
    
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;
        if(this.firstLoad){
          this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
          this.firstLoad = false
        }
      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.classList.contains('cart-icon_visible')) {
      return
    }

    if (window.pageYOffset > this.initialTopCoord  && document.body.clientWidth > 767) {
      this.elem.style.position = 'fixed';
      this.elem.style.zIndex = '1000';
      let container = document.querySelector('.container')
      let offsetFromContainer = container.getBoundingClientRect().right + 20;
      let offsetFromDocument = document.documentElement.clientWidth - this.elem.offsetWidth - 10;
      let leftIndent = Math.min(offsetFromContainer, offsetFromDocument);
      this.elem.style.left = `${leftIndent}px`
      this.elem.style.right = '10px';
    } else {
      this.elem.style.position = 'absolute';
      this.elem.style.zIndex = '';
      this.elem.style.left = ''
      this.elem.style.right = '';
    }
  }
}
