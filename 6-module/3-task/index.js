import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.carouselSlide = '';
    this.getCarouselSlide();
    this.elem = createElement(`
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        ${this.carouselSlide}
        </div>
      </div>
    `)
    this.position = 0;
    this.countArrowClick = 0;
    this.carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.carouselArrowLeft.style.display = 'none';
    this.carouselArrowRight.onclick = this.movingRightCarouselInner;
    this.carouselArrowLeft.onclick = this.movingLeftCarouselInner;
    this.elem.querySelectorAll('.carousel__button').forEach( item => item.addEventListener('click', this.onAddToCart));
  }

  getCarouselSlide() {
    for(let i = 0; i < this.slides.length; i++) {
      this.carouselSlide = this.carouselSlide + `
        <div class="carousel__slide" data-id="${this.slides[i].id}">
        <img src="/assets/images/carousel/${this.slides[i].image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${this.slides[i].price.toFixed(2)}</span>
          <div class="carousel__title">${this.slides[i].name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
        </div>
      `
    }
  }
  movingRightCarouselInner = () => {
    this.countArrowClick++;
    this.carouselArrowLeft.style.display = '';
    if(this.countArrowClick === this.slides.length - 1) {
      this.carouselArrowRight.style.display = 'none';
    }
    this.position = - this.elem.querySelector('.carousel__inner').offsetWidth * this.countArrowClick;
    this.carouselInner.style.transform = `translateX(${this.position}px)`;
  };

   movingLeftCarouselInner = () => {
    this.countArrowClick--;
    this.carouselArrowRight.style.display = '';
    if(this.countArrowClick === 0) {
      this.carouselArrowLeft.style.display = 'none';
    }
    this.position = this.position + this.elem.querySelector('.carousel__inner').offsetWidth;
    this.carouselInner.style.transform = `translateX(${this.position}px)`
  };

  onAddToCart = (event) => {
    let id = event.target.closest('.carousel__slide').dataset.id
    let customEvent = new CustomEvent('product-add', { bubbles: true, detail: id });
    this.elem.dispatchEvent(customEvent);
  } 
}
