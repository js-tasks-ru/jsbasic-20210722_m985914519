import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.ribbonItems = '';
    this.getRibbonItems();
    this.render();
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.rightRibbonArrow = this.elem.querySelector('.ribbon__arrow_right');
    this.leftRibbonArrow = this.elem.querySelector('.ribbon__arrow_left');
    this.rightRibbonArrow.addEventListener('click', this.onRightRibbonArrow);
    this.leftRibbonArrow.addEventListener('click', this.onLeftRibbonArrow);
    this.elem.querySelectorAll('.ribbon__item').forEach(element => element.addEventListener('click', this.selectCategory));
  }

  getRibbonItems() {
    for( let i = 0; i < this.categories.length; i++) {
      this.ribbonItems = this.ribbonItems + `<a href="#" class="ribbon__item" data-id="${this.categories[i].id}">${this.categories[i].name}</a>`
    }
  }

  render() {
    this.elem = createElement(
      `<div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.ribbonItems}
        </nav> 

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`
    )
  }

  onRightRibbonArrow = () => {
    this.ribbonInner.scrollBy(350, 0);
    this.ribbonInner.addEventListener('scroll', this.scrollRibbonInner)

  }
  onLeftRibbonArrow = () => {
    this.ribbonInner.scrollBy(-350, 0);
    this.ribbonInner.addEventListener('scroll', this.scrollRibbonInner)
  }

  scrollRibbonInner = () => {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    scrollRight > 1 ? this.rightRibbonArrow.classList.add('ribbon__arrow_visible') :
      this.rightRibbonArrow.classList.remove('ribbon__arrow_visible')
    this.ribbonInner.scrollLeft > 0 ? this.leftRibbonArrow.classList.add('ribbon__arrow_visible') :
      this.leftRibbonArrow.classList.remove('ribbon__arrow_visible')
  }

  selectCategory = (event) => {
    event.preventDefault();
    let previouSelected =  this.elem.querySelector('.ribbon__item_active')
    if (previouSelected) {
      previouSelected.classList.remove('ribbon__item_active')
    }
    event.target.classList.add('ribbon__item_active')
    let id = event.target.dataset.id
    let customEvent = new CustomEvent('ribbon-select', {
      detail: id,
      bubbles: true
    })
    this.elem.dispatchEvent(customEvent);
  }
}
