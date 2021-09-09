import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.closeModalButton = this.elem.querySelector('.modal__close')
    this.closeModalButton.addEventListener('click', this.closeByButton)
    document.addEventListener('keydown', this.closeByButton)
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
            </h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(text) {
    this.elem.querySelector('.modal__title').textContent = text;
  }
  setBody(node) {
    this.elem.querySelector('.modal__body').textContent = '';
    this.elem.querySelector('.modal__body').append(node);
  }

  closeByButton = (event) => {
    if (event.code === 'Escape' || !event.code) {
      document.body.classList.remove('is-modal-open')
      document.body.querySelector('.modal').remove()
    }
    document.removeEventListener('keydown', this.closeByButton)
  }

  close() {
    if (document.querySelector('.modal')) {
      document.body.querySelector('.modal').remove();
      document.body.classList.remove('is-modal-open');
      document.removeEventListener('keydown', this.closeByButton)
    }
  }
}