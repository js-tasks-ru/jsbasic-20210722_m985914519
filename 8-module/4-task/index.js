import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal()
    this.productCards = createElement(`<div>`)
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) { return }
    let idx = this.cartItems.findIndex(elem => elem.product.id === product.id)
    idx === -1 ? this.cartItems.push({ product, count: 1 }) : this.cartItems[idx].count = this.cartItems[idx].count + 1
    this.onProductUpdate(this.cartItems[idx]);
  }

  updateProductCount(productId, amount) {
    let idx = this.cartItems.findIndex(elem => elem.product.id === productId)
    this.cartItems[idx].count = amount > 0 ? ++this.cartItems[idx].count : --this.cartItems[idx].count
    if (this.cartItems[idx].count === 0) {
      if (document.body.classList.contains("is-modal-open")) {
        document.querySelector(`[data-product-id=${this.cartItems[idx].product.id}]`).remove();
      }
      this.cartItems.splice(idx, 1)
    }
    this.onProductUpdate(this.cartItems[idx]);
  }

  isEmpty() {
    return !this.cartItems.length
  }

  getTotalCount() {
    let totalCount = 0
    this.cartItems.forEach(item => totalCount = totalCount + item.count)
    return totalCount
  }

  getTotalPrice() {
    let totalPrice = 0
    this.cartItems.forEach(item => totalPrice = totalPrice + item.count * item.product.price)
    return totalPrice
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal.setTitle('Your order')
    this.cartItems.forEach(item => this.productCards.append(this.renderProduct(item.product, item.count)))
    this.productCards.append(this.renderOrderForm())
    this.modal.setBody(this.productCards)
    this.modal.open()

    let minusButtons = this.productCards.querySelectorAll('.cart-counter__button_minus')
    let plusButtons = this.productCards.querySelectorAll('.cart-counter__button_plus')
    let plusMinusButton = (event, amount) => {
      let productId = event.target.closest('.cart-product').getAttribute('data-product-id')
      this.updateProductCount(productId, amount);
    }
    for (let i = 0; i < minusButtons.length; i++) {
      minusButtons[i].onclick = (e) => plusMinusButton(e, -1)
      plusButtons[i].onclick = (e) => plusMinusButton(e, 1)
    }
    const cartForm = this.modal.elem.querySelector('.cart-form');
    cartForm.addEventListener('submit', (e) => {
      this.onSubmit(e);
    });

  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (this.isEmpty()) {
      this.modal.close()
      return
    }
    let isModalOpen = document.body.classList.contains('is-modal-open')
    if (isModalOpen && cartItem) {
      let modalBody = document.querySelector('.modal')
      let productCount = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      productCount.innerHTML = cartItem.count
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${(this.getTotalPrice()).toFixed(2)}`;
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const btnSubmit = this.modal.elem.querySelector('button[type="submit"]');
    btnSubmit.classList.add('is-loading');
    let buyerFormData = new FormData(this.modal.elem.querySelector('.cart-form'));
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: buyerFormData,
    })
      .then((response) => {
        if (!!response) {
          this.modal.setTitle('Success!')
          this.cartItems = []
          let newModalBody = createElement(`<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`)
          this.modal.setBody(newModalBody)
          this.cartIcon.update(this);
        }
      })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

