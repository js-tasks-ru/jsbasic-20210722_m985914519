import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  }

  open() {
    document.body.classList.add('is-modal-open')
    document.body.insertAdjacentHTML('afterbegin',`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
              ${this.modalTitle}
            </h3>
          </div>

          <div class="modal__body">
          </div>
        </div>
      </div>`)
    document.body.querySelector('.modal__body').appendChild(this.modalBody)

    this.closeModalButton = document.body.querySelector('.modal__close')
    this.closeModalButton.addEventListener('click', this.close)
    document.addEventListener('keydown', this.close)
  }

  setTitle(title) {
    this.modalTitle = title
  }
  setBody(node) {
    this.modalBody = node
  }
  close = (event) => {
    if (event.code === 'Escape' || !event.code) {
    document.body.classList.remove('is-modal-open')
    document.body.querySelector('.modal').remove()
    }
    this.closeModalButton.removeEventListener('click', this.close)
    document.removeEventListener('keydown', this.close)
  }
}
