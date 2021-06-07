import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

// async-await, a javascript megvárja, amíg az await utáni rész lefut/betölt
class SearchImage extends ContentComponent {

  constructor() {
    super();
    // példányosításkor megjelenítjük a keresőt automatikusan
    this.render();
  }

  // ez a metódus letölti az adatot az API-ról
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
  // a data változó objecteket tartalmazó tömb
  displayImage(data) {
    this.clearErrors();


    // this.clearContent();


    const image = document.createElement('img');
    // a data.message tömbből egy véletlenszerű elemet kiválasztunk
    image.src = data.message[Math.floor(Math.random() * data.message.length)];
    document.querySelector('#content').appendChild(image);
    console.log(data);
  }

  // megjeleníti a keresőt:
  render() {
    const markup = `
    <form class="dog-search">
      <span class="search-icon"></span>
      <input type="text" id="dogSearchInput">



      
      
      <button>Search</button>
    </form>
    `;


    // <input type="text" id="imageNumberInput" placeholder="1">


    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    // az arrow functionnek nincs saját 'this' kulcsszava, tehát az arrow function-ön belül a 'this' ugyan azt fogja jelenteni, mint azon kívül (a classt, amiben vagyunk)
    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      event.preventDefault();
      const searchTerm = document.querySelector('#dogSearchInput').value;
      // mivel a getImages egy async MediaStreamAudioDestinationNode, ezért ez is promissal tér vissza
      // emiatt a promise object-en elérhető a 'then()' metódus
      // a then metódus bemeneti paramétere egy callback function, ami akkor fut length, amikor a promise beteljesül


      // this.clearContent();

      // if (count.render === isNaN) {
      //   count.render = 1;
      // } else {
      //   for (let i = 0; i < count.render.length; i++) {
      //     this.displayImage(data);
      //   }
      // }


      this.getImages(searchTerm).then((result) => {
        if (result)
          // ha csak egy dolgot csinálunk az 'if'-BeforeUnloadEvent, akkor a kódblokk ('{}') elhagyható
          this.displayImage(result);
      });
    });
  }
}

export default SearchImage;