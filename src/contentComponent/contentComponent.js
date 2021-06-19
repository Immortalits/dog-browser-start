import '../css/contentComponent.css';
import yall from 'yall-js';
import preloading from '../img/preloading.gif';

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

  async getImages(dogbreed) {

    if (!dogbreed) {
      this.displayError('Nem lett beírva semmi a keresőbe, nem tudunk keresni!');
      // megállítjuk a getImages függvény futását a returnnel
      return;
    }

    let urlString = '';
    dogbreed = dogbreed.split(' ');
    // a dogbreed változó innentől egy tömb
    if (dogbreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[0].toLowerCase()}/images`;
    } else if (dogbreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[1].toLowerCase()}/${dogbreed[0].toLowerCase()}/images`;
    }
    const response = await fetch(urlString);
    const data = await response.json();
    return data;
  }

  displayImage(data) {
    this.clearErrors();
    // this.clearContent();
    const image = document.createElement('img');
    image.classList.add('lazy');
    // a data.message tömbből egy véletlenszerű elemet kiválasztunk
    image.src = preloading;
    image.dataset.src = data.message[Math.floor(Math.random() * data.message.length)];
    document.querySelector('#content').appendChild(image);
    yall({
      events: {
        load: event => {
          if (event.target.nodeName == 'IMG' && !event.target.classList.contains('lazy')) {
            event.target.classList.add('yall-loaded');
          }
        }
      }
    });
    console.log(data);
  }

  handleContentDisplay(searchTerm) {

    let count = parseInt(document.querySelector('#imageNumberInput').value);
    if (isNaN(count)) {
      count = 1;
    }

    this.clearContent();
    this.getImages(searchTerm).then((result) => {
      if (result)
        // ha csak egy dolgot csinálunk az 'if'-ben, akkor a kódblokk ('{}') elhagyható
        for (let i = 0; i < count; i++) {
          this.displayImage(result);
        }
    });
  }

}