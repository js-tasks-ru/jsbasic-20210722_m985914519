export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = { steps : steps, value : 0 }
    this.render();
    this.elem.addEventListener('click', this.changeSlider)
  }

  render() {
    this.sliderSteps = `<span class="slider__step-active"></span>`;
    for(let i = 1; i < this.config.steps; i++) {
      this.sliderSteps = this.sliderSteps + `<span></span>`
    }
    this.elem = document.createElement('div')
    this.elem.classList.add('slider');
    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>

      <div class="slider__progress" style="width: 0%;"></div>

      <div class="slider__steps">
        ${this.sliderSteps}
      </div>
    `
  }

  changeSlider = (event) => {
    let sliderСoordinateX = event.clientX - this.elem.getBoundingClientRect().left
    let oneStep = this.elem.offsetWidth/ (this.config.steps - 1)
    let numberStep = Math.round(sliderСoordinateX/ oneStep)
    let spans = this.elem.querySelector('.slider__steps').querySelectorAll('span')
    spans[this.config.value].classList.remove('slider__step-active')
    this.config.value = numberStep
    spans[this.config.value].classList.add('slider__step-active')
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let leftPercents = 100/(this.config.steps-1) * numberStep;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    this.elem.querySelector('.slider__value').textContent = `${numberStep}`

    let customEvent = new CustomEvent('slider-change', {
      detail: this.config.value,
      bubbles: true
    })
    this.elem.dispatchEvent(customEvent);
  }
}
