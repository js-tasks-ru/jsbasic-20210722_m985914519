export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if(!product) { return }
    let idx = this.cartItems.findIndex(elem => elem.product.id === product.id)
    idx === -1 ? this.cartItems.push({product, count : 1}) :  this.cartItems[idx].count = this.cartItems[idx].count + 1
    this.onProductUpdate(this.cartItems[idx]);
  }

  updateProductCount(productId, amount) {
    let idx = this.cartItems.findIndex(elem => elem.product.id === productId)
    this.cartItems[idx].count = amount > 0 ? ++this.cartItems[idx].count : --this.cartItems[idx].count
    if (this.cartItems[idx].count === 0) {
      this.cartItems.splice(idx,1)
    }
    this.onProductUpdate(this.cartItems[idx]);    
  }

  isEmpty() {
    return !this.cartItems.length
  }

  getTotalCount() {
    let totalCount = 0
    this.cartItems.forEach( item => totalCount = totalCount + item.count)
    return totalCount
  }

  getTotalPrice() {
    let totalPrice = 0
    this.cartItems.forEach( item => totalPrice = totalPrice + item.count * item.product.price)
    return totalPrice
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

