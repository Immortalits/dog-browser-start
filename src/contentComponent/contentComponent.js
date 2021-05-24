import '../css/contentComponent.css';

export default class ContentComponent {

  // ha már van kép megjelenítve, azt töröljük
  clearContent() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
  }

  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }

  // megjelenít egy hibaüzenetet a felhasználónak
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.innerHTML = message;
    // csináltunk egy h2-t error message classal
    // <h2 class="error-message"> message</h2>
    document.querySelector('.errors').appendChild(popupMessage);
  }

}