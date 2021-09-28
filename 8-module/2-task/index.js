import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(
      `<div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>`
    )
    this.productsGrid = this.elem.querySelector('.products-grid__inner')
    this.renderCard(this.products);
  }

  renderCard(products) {
    let productsCard = []
    this.productsGrid.innerHTML = ``
    for (let i = 0; i < products.length; i++) {
      productsCard[i] = new ProductCard(products[i])
      this.productsGrid.append(productsCard[i].elem);
    }
  }

  updateFilter(filters) {
    this.filters = { ...this.filters, ...filters }
    let filtredProducts = []
    let isFilterApplied = false

    if (this.filters.noNuts) {
      if (filtredProducts.length || isFilterApplied) {
        filtredProducts = filtredProducts.filter(item => !item.nuts)
      } else {
        filtredProducts = this.products.filter(item => !item.nuts)
      }
      isFilterApplied = true
    }

    if (this.filters.vegeterianOnly) {
      if (filtredProducts.length || isFilterApplied) {
        filtredProducts = filtredProducts.filter(item => item.vegeterian)
      } else {
        filtredProducts = this.products.filter(item => item.vegeterian)
      }
      isFilterApplied = true
    }

    if (this.filters.category) {
      if (filtredProducts.length || isFilterApplied) {
        filtredProducts = filtredProducts.filter(item => item.category === this.filters.category)
      } else {
        filtredProducts = this.products.filter(item => item.category === this.filters.category)
      }
      isFilterApplied = true
    }

    if (this.filters.maxSpiciness && this.filters.maxSpiciness !== 4) {
      if (filtredProducts.length || isFilterApplied) {
        filtredProducts = filtredProducts.filter(item => item.spiciness <= this.filters.maxSpiciness)
      } else {
        filtredProducts = this.products.filter(item => item.spiciness <= this.filters.maxSpiciness)
      }
      isFilterApplied = true
    }
    this.renderCard(!isFilterApplied ? this.products : (filtredProducts.length ? filtredProducts : []))
  }
}
