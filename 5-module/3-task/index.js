function initCarousel() {
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  let widthCarouselInner = carouselInner.offsetWidth;
  let position = 0;
  let countArrowClick = 0;
  carouselArrowLeft.style.display = 'none';
  let movingRightCarouselInner = function () {
    countArrowClick++;
    carouselArrowLeft.style.display = '';
    if(countArrowClick === 3) {
      carouselArrowRight.style.display = 'none';
    }
    position = - widthCarouselInner * countArrowClick;
    carouselInner.style.transform = `translateX(${position}px)`;
  };

  let movingLeftCarouselInner = function () {
    countArrowClick--;
    carouselArrowRight.style.display = '';
    if(countArrowClick === 0) {
      carouselArrowLeft.style.display = 'none';
    }
    position = position + widthCarouselInner;
    carouselInner.style.transform = `translateX(${position}px)`
  };
  carouselArrowRight.onclick = movingRightCarouselInner;
  carouselArrowLeft.onclick = movingLeftCarouselInner;
}
